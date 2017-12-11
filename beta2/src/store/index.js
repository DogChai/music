import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 变量
const state = {
	count: 66
}

// 计算方法
const mutations = {
	jia(state,n) {
		state.count += n.a;
	},
	jian(state,n) {
		state.count -= n.b;
	}
}

// 在显示之前进行计算
const getters = {
	count: function(state) {
		return state.count += 1
	}
}

const actions = {
	jiaplus(context) {
		context.commit('jia',{a:5})
	},
	jianplus({commit}) {
		commit('jian',{b:2})
	}
}

const moduleA = {
	state,
	mutations,
	getters,
	actions
}

export default new Vuex.Store({
	modules: {
		a: moduleA
	}
})