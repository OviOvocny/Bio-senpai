import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ErrorPage from '@/pages/ErrorPage'

Vue.use(Router)

let rt = new Router({
  routes: [
    {
      path: '*',
      component: ErrorPage,
      meta: {
        title: 'Něco je špatně...'
      }
    },
    ...routes
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

rt.beforeEach((to, from, next) => {
  if (to.hash && from.path === '/') {
    rt.replace('/projekty/' + to.hash.substring(1).replace('+', '-'))
  }
  document.title = to.meta.title
  next()
})

export default rt
