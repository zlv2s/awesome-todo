import Vue from 'vue'
import { uid } from 'quasar'
const state = {
  tasks: {
    'id1': {
      name: 'hello world',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id2': {
      name: 'hi there',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id3': {
      name: 'oh my god',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    }
  },
  search: ''
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
  tasksFiltered: state => {
    const taskFiltered = {}
    if (state.search) {
      Object.keys(state.tasks).forEach(key => {
        if (state.tasks[key]['name'].toLowerCase().includes(state.search.toLowerCase())) {
          taskFiltered[key] = state.tasks[key]
        }
      })
      return taskFiltered
    }
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}