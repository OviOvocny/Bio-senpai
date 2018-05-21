import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ErrorPage from '@/pages/ErrorPage'
import nano from '@/scripts/nano-scroll'

Vue.use(Router)

let rt = new Router({
  routes: [
    {
      path: '*',
      component: ErrorPage,
      meta: {
        title: 'Nani!?'
      }
    },
    ...routes
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      nano(savedPosition.y, 0.2, () => savedPosition)
    } else if (to.meta.categorized && to.params.category) {
      return false
    } else {
      nano(0, 0.2, () => ({ x: 0, y: 0 }))
    }
  }
})

rt.beforeEach((to, from, next) => {
  if (to.hash && to.path === '/') {
    rt.replace('/projekty/' + to.hash.substring(1)
      .replace(/\+|%20/g, '-')
      .toLowerCase()
    )
  }
  document.title = to.meta.title
  next()
})

export default rt
