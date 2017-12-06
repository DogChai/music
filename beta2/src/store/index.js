import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	count: 66
}

const mutations = {
	jia(state) {
		state.count++;
	},
	jian(state) {
		state.count--;
	}
}

export default new Vuex.Store({
	state,
	mutations
})