
const routes = [
  {
    path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageTodo.vue')
      }, {
        path: '/setting',
        component: () => import('pages/PageSetting.vue')
      }, {
        path: '/setting/help',
        component: () => import('pages/PageHelp.vue')
      }, {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
