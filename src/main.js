// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import Router from 'vue-router'
import Music from './components/music'

Vue.config.productionTip = false

Vue.use(Vueaxios,axios)
Vue.use(Router)

let router = new Router({
  hashbang: true,
  history: false,
  routes: [
    {
      path: '/',
      redirect: '/music'
    },{
      path: '/music',
      component: Music,
    }
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
