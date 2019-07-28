// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCd_cAx5bhHCXhMzspF8jIGFSf0nRirFss',
  authDomain: 'awesome-todo-19b4d.firebaseapp.com',
  databaseURL: 'https://awesome-todo-19b4d.firebaseio.com',
  projectId: 'awesome-todo-19b4d',
  storageBucket: '',
  messagingSenderId: '1067926049981',
  appId: '1:1067926049981:web:ef8522033cb39eef'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDataBase = firebaseApp.database()

export {
  firebaseAuth,
  firebaseDataBase
}