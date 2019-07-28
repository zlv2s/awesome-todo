import { firebaseAuth } from 'boot/firebase'

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
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => { })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })
  },
  loginUser({ commit }, { email, password }) {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => { })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })
  },
  logoutUser({ commit }) {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('sign-in')
        commit('setLoggedIn', true)
        this.$router.push('/')
      } else {
        console.log('log-out')
        commit('setLoggedIn', false)
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