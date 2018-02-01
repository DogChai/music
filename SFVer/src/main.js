import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
// import Router from 'vue-router'
import Music from './components/music'

Vue.config.productionTip = false

Vue.use(Vueaxios,axios)

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
