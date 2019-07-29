import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDataBase, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/show-err-msg'
const state = {
  tasks: {},
  search: '',
  sort: 'name',
  tasksLoaded: false
}

const mutations = {
  clearTasks(state) {
    state.tasks = {}
  },
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
  },
  setTasksLoaded(state, value) {
    state.tasksLoaded = value
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
    // * get reference
    let uid = firebaseAuth.currentUser.uid
    // uid = 't2NtCHGr0ceTcVpqtZETEyjN9zp2'
    const taskRef = firebaseDataBase.ref(`tasks/${uid}`)

    // * initial check for data
    taskRef.once('value')
      .then(dataSnapshot => {
        console.log(dataSnapshot.val())
        commit('setTasksLoaded', true)
      }).catch(err => {
        showErrorMessage(err.message)
        this.$router.replace('/auth')
      })

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
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).set(task, err => {
      if (err) {
        showErrorMessage(err.message)
      } else {
        Notify.create('New task added!')
      }
    })
  },
  fbDeleteTask({ commit }, taskId) {
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).remove(err => {
      if (err) {
        showErrorMessage(err.message)
      } else {
        Notify.create('Task deleted!')
      }
    })
  },
  fbUpdateTask({ commit }, { taskId, updates }) {
    firebaseDataBase.ref(`tasks/${firebaseAuth.currentUser.uid}/${taskId}`).update(updates, err => {
      if (err) {
        showErrorMessage(err.message)
      } else {
        const updateKeys = Object.keys(updates)
        if (!(updateKeys.includes('completed') && updateKeys.length === 1)) {
          Notify.create({
            message: 'Task updated!',
            position: 'bottom',
            timeout: 1000
          })
        }
      }
    })
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