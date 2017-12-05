<template>
	<div id="index">
		<div class="sm-wrap">
			<div class="music-tab">
				<ul>
					<li @click='tosm1' style="margin-left: 1px">1</li>
					<li @click='tosm2' >2</li>
					<li @click='tosm3' >3</li>
					<li @click='tosm4' >4</li>
					<li @click='tosm5' >5</li>
					<li @click='tosm6' >6</li>
					<li @click='tosm7' >7</li>
					<li>敬请期待</li>
				</ul>
			</div>
			<transition>
				<router-view></router-view>
			</transition>
			<leftbar></leftbar>
			<rightbar></rightbar>
		</div>
		<bottombar></bottombar>	
	</div>
</template>

<script>
	import bottombar from './bottombar.vue'
	import leftbar from './leftbar.vue'
	import rightbar from './rightbar.vue'
	export default {
		name: 'index',
		components: {
			bottombar,
			leftbar,
			rightbar
		},
		methods: {
			tosm1: function() {
				this.$router.push('/index/sm1')
			},
			tosm2: function() {
				this.$router.push('/index/sm2')
			},
			tosm3: function() {
				this.$router.push('/index/sm3')
			},
			tosm4: function() {
				this.$router.push('/index/sm4')
			},
			tosm5: function() {
				this.$router.push('/index/sm5')
			},
			tosm6: function() {
				this.$router.push('/index/sm6')
			},
			tosm7: function() {
				this.$router.push('/index/sm7')
			}
		}
	}
</script>

<style scoped>
	#index {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,0.3);
	}

	.music-tab {
		width: 850px;
		height: 40px;
		border: 1px solid gray;
		margin: 60px auto 0 auto;
	}

	.music-tab ul {
		width: 100%;
		height: 100%;
	}

	.music-tab ul li {
		width: 104px;
		background-color: lightblue;
		float: left;
		height: 100%;
		border: 1px solid gray;
	}

	.sm-wrap {
		width: 1460px;
		height: 800px;
		margin: 50px auto 0 auto;
		border: 1px solid gray;
		position: relative;
	}
</style>