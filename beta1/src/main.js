// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
// import Router from 'vue-router'
import Music from './components/music'
import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.use(Vueaxios,axios)

Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'number',
      detectResize: true
    },
    scrollPanel: {
      scrollingX: true,
      scrollingY: true,
    },
    rail: {
      background: '#01a99a',
      opacity: 0,
      size: '6px',
      specifyBorderRadius: false,
      gutterOfEnds: null,
      gutterOfSide: '0',
      keepShow: false
    },
    bar: {
      showDelay: 1000,
      onlyShowBarOnScroll: false,
      keepShow: true,
      background: 'rgb(204,203,203)',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false,
    }
  }, // 在这里设置全局默认配置
  name: 'v-scroll' // 在这里自定义组件名字，默认是vueScroll
});

// Vue.use(Router)

// let router = new Router({
//   hashbang: true,
//   history: false,
//   routes: [
//     {
//       path: '/',
//       redirect: '/music'
//     },{
//       path: '/music',
//       component: Music,
//     }
//   ]
// })

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
