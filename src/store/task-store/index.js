const state = {
  tasks: {
    'ID1': {
      name: 'cavsvsdasdvsda',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'ID2': {
      name: 'cavsvsdasdvsda',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'ID3': {
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

}

const actions = {}

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