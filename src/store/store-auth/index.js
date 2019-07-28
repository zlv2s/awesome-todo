import { firebaseAuth } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/show-err-msg'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({ commit }, { email, password }) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => { })
      .catch(error => {
        // * Handle Errors here.
        Loading.hide()
        showErrorMessage(error.message)
      })
  },
  loginUser({ commit }, { email, password }) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {

      })
      .catch(error => {
        Loading.hide()
        showErrorMessage(error.message)
      })
  },
  logoutUser({ commit }) {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        // User is signed in.
        console.log('sign-in')
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/')
        dispatch('taskModule/fbReadData', null, { root: true })
      } else {
        console.log('log-out')
        commit('setLoggedIn', false)
        LocalStorage.remove('loggedIn')
        this.$router.replace('/auth')
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}