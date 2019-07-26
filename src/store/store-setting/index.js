const state = {
  settings: {
    show12: false
  }
}

const mutations = {
  updateSettings(state, val) {
    state.settings.show12 = val
  }
}

const actions = {
  updateSettings({ commit }, val) {
    commit('updateSettings', val)
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