import Vue from 'vue'
import Router from 'vue-router'


/*页面加载*/
import index from '../pages/index.vue'
import bottomBar from '../pages/bottombar.vue'
import sm1 from '../pages/sm1.vue'
import sm2 from '../pages/sm2.vue'
import sm3 from '../pages/sm3.vue'
import sm4 from '../pages/sm4.vue'
import sm5 from '../pages/sm5.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/index/sm1'
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			children: [
				{
					path: '/index/sm1',
					name: 'sm1',
					component: sm1,
				}
			]
		}
	]
});
