import Vue from 'vue'
import { uid } from 'quasar'
const state = {
  tasks: {
    'id1': {
      name: 'hello world',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '17:30'
    },
    'id2': {
      name: 'boy',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id3': {
      name: 'dpple',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '19:30'
    },
    'id4': {
      name: 'hello world',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '17:30'
    },
    'id5': {
      name: 'boy',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id6': {
      name: 'dpple',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '19:30'
    },
    'id': {
      name: 'hello world',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '17:30'
    },
    'id7': {
      name: 'boy',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id8': {
      name: 'dpple',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '19:30'
    },
    'id88': {
      name: 'hello world',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '17:30'
    },
    'id9': {
      name: 'boy',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id99': {
      name: 'dpple',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '19:30'
    }
  },
  search: '',
  sort: 'name'
}

const mutations = {
  updateTask(state, { id, updates }) {
    // state.tasks[id]['completed'] = updates.completed
    // * use Object.assign() instead
    Object.assign(state.tasks[id], updates)
  },
  deleteTask(state, id) {
    // delete state.tasks[id]
    // * make it reactive
    Vue.delete(state.tasks, id)
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
  updateTask({ commit }, { id, updates }) {
    commit('updateTask', { id, updates })
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    commit('addTask', { taskId, task })
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
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
    console.log(taskSorted)
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