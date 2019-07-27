import { LocalStorage } from 'quasar'
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
  },
  setSettings(state, val) {
    Object.assign(state.settings, val)
  }
}

const actions = {
  setShow12({ commit, dispatch }, val) {
    commit('setShow12', val)
    dispatch('saveSettings')
  },
  setShowTasksInOneList({ commit, dispatch }, val) {
    commit('setShowTasksInOneList', val)
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({ commit }) {
    if (LocalStorage.getItem('settings')) commit('setSettings', LocalStorage.getItem('settings'))
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