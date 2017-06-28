// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Plugins
import submenuPlugin from './scripts/submenu-plugin'
Vue.use(submenuPlugin)

import clearErrorPlugin from './scripts/clear-error-plugin'
Vue.use(clearErrorPlugin)

// Components
import btn from './components/btn'
Vue.component('btn', btn)

import icon from './components/icon'
Vue.component('icon', icon)

import clImage from './components/cl-image'
Vue.component('cl-image', clImage)

import anime from './components/anime'
Vue.component('anime', anime)

import memberCard from './components/member-card'
Vue.component('member-card', memberCard)

import submenu from './components/submenu'
Vue.component('submenu', submenu)

import error from './components/error-message'
Vue.component('error', error)

import ticker from './components/ticker-message'
Vue.component('ticker', ticker)

import bubble from './components/bubble'
Vue.component('bubble', bubble)

// Animations
import transitionSpring from './animations/transition-spring'
Vue.component('transition-spring', transitionSpring)

import transitionGroupSpring from './animations/transition-group-spring'
Vue.component('transition-group-spring', transitionGroupSpring)

Vue.config.productionTip = false

import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
