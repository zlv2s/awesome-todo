const state = {
  settings: {
    show12: false,
    showTasksInOneList: false
  }
}

const mutations = {
  setShow12(state, val) {
    state.settings.show12 = val
  },
  setShowTasksInOneList(state, val) {
    state.settings.showTasksInOneList = val
  }
}

const actions = {
  setShow12({ commit }, val) {
    commit('setShow12', val)
  },
  setShowTasksInOneList({ commit }, val) {
    commit('setShowTasksInOneList', val)
  }
}

const getters = {
  settings: state => state.settings
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}