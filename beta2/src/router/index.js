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
import sm6 from '../pages/sm6.vue'
import sm7 from '../pages/sm7.vue'

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
				},
				{
					path: '/index/sm2',
					name: 'sm2',
					component: sm2,
				},
				{
					path: '/index/sm3',
					name: 'sm3',
					component: sm3,
				},
				{
					path: '/index/sm4',
					name: 'sm4',
					component: sm4,
				},
				{
					path: '/index/sm5',
					name: 'sm5',
					component: sm5,
				},
				{
					path: '/index/sm6',
					name: 'sm6',
					component: sm6,
				},
				{
					path: '/index/sm7',
					name: 'sm7',
					component: sm7,
				}
			]
		}
	]
});
