import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDataBase, firebaseAuth } from 'boot/firebase'
const state = {
  tasks: {
    // 'id1': {
    //   name: 'hello world',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '17:30'
    // },
    // 'id2': {
    //   name: 'boy',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'id3': {
    //   name: 'dpple',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '19:30'
    // }
  },
  search: '',
  sort: 'name'
}

const mutations = {
  updateTask(state, { taskId, updates }) {
    // state.tasks[taskId]['completed'] = updates.completed
    // * use Object.assign() instead
    Object.assign(state.tasks[taskId], updates)
  },
  deleteTask(state, taskId) {
    // delete state.tasks[taskId]
    // * make it reactive
    Vue.delete(state.tasks, taskId)
  },
  addTask(state, { taskId, task }) {
    // Object.assign(state.tasks, { [taskId]: task })
    Vue.set(state.tasks, taskId, task)
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  }
}

const actions = {
  updateTask({ commit, dispatch }, { taskId, updates }) {
    // commit('updateTask', { taskId, updates })
    dispatch('fbUpdateTask', { taskId, updates })
  },
  deleteTask({ commit, dispatch }, taskId) {
    // commit('deleteTask', taskId)
    dispatch('fbDeleteTask', taskId)
  },
  addTask({ commit, dispatch }, task) {
    let taskId = uid()
    // commit('addTask', { taskId, task })
    dispatch('fbAddTask', { taskId, task })
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  },

  // * read data from firebase
  fbReadData({ commit }) {
    const uid = firebaseAuth.currentUser.uid
    const taskRef = firebaseDataBase.ref(`tasks/${uid}`)

    // * child added
    taskRef.on('child_added', snapshot => {
      commit('addTask', { taskId: snapshot.key, task: snapshot.val() })
    })

    // * child changed
    taskRef.on('child_changed', snapshot => {
      commit('updateTask', { taskId: snapshot.key, updates: snapshot.val() })
    })

    // * child_delete
    taskRef.on('child_removed', snapshot => {
      commit('deleteTask', snapshot.key)
    })
  },

  // * write data to firebase
  fbAddTask({ commit }, { taskId, task }) {
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).set(task)
  },
  fbDeleteTask({ commit }, taskId) {
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).remove()
  },
  fbUpdateTask({ commit }, { taskId, updates }) {
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).update(updates)
  }
}

const getters = {
  // * mark uncompleted
  tasksTodo: (state, getters) => {
    const tasksFiltered = getters.tasksFiltered
    const task = {}
    Object.keys(tasksFiltered).forEach(key => {
      if (!tasksFiltered[key]['completed']) {
        task[key] = tasksFiltered[key]
      }
    })
    return task
  },
  // * mark completed
  tasksCompleted: (state, getters) => {
    const tasksFiltered = getters.tasksFiltered
    const task = {}
    Object.keys(tasksFiltered).forEach(key => {
      if (tasksFiltered[key]['completed']) {
        task[key] = tasksFiltered[key]
      }
    })
    return task
  },

  //  * filter tasks by input value
  tasksFiltered: (state, getters) => {
    const taskFiltered = {}
    if (state.search) {
      Object.keys(getters.tasksSorted).forEach(key => {
        // * be careful with the case sensitive
        if (getters.tasksSorted[key]['name'].toLowerCase().includes(state.search.toLowerCase())) {
          taskFiltered[key] = getters.tasksSorted[key]
        }
      })
      return taskFiltered
    }
    return getters.tasksSorted
  },

  // * sort tasks by name
  tasksSorted: state => {
    const taskSorted = {}
    const sortedKeys = Object.keys(state.tasks).sort((a, b) => {
      const aName = state.tasks[a][state.sort].toLowerCase(),
        bName = state.tasks[b][state.sort].toLowerCase()
      if (aName > bName) return 1
      else if (aName === bName) return 0
      else return -1
    })
    sortedKeys.forEach(key => {
      taskSorted[key] = state.tasks[key]
    })
    return taskSorted
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}