// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'


/*使用路由*/
Vue.use(router);


new Vue({
  router,
  template: `
    <div>
      <transition name='fade' mode='out-in'>
        <router-view></router-view>
      </transition>
    </div>
  `
}).$mount('#app')
