import { LocalStorage } from 'quasar'
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (!LocalStorage.getItem('loggedIn') && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
