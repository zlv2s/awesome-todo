import Vue from 'vue'
import { uid } from 'quasar'
const state = {
  tasks: {
    'id1': {
      name: 'cavsvsdasdvsda',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id2': {
      name: 'cavsvsdasdvsda',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'id3': {
      name: 'cavsvsdasdvsda',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    }
  }
  // tasks: [
  //   {
  //     id: '1',
  //     name: 'cavsvsdasdvsda',
  //     completed: false,
  //     dueDate: '2019/05/12',
  //     dueTime: '18:30'
  //   },
  //   {
  //     id: '2',
  //     name: 'vasvsdsv',
  //     completed: false,
  //     dueDate: '2019/05/12',
  //     dueTime: '18:30'
  //   },
  //   {
  //     id: '3',
  //     name: 'acasvsas',
  //     completed: false,
  //     dueDate: '2019/05/12',
  //     dueTime: '18:30'
  //   }
  // ]
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
  }
}

const getters = {
  tasks: state => state.tasks
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}