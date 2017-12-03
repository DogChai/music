<template>
	<div id="index">
		index
		
		<transition>
			<router-view></router-view>
		</transition>
		<bottombar></bottombar>	
	</div>
</template>

<script>
	import bottombar from './bottombar.vue'
	export default {
		name: 'index',
		components: {
			bottombar
		}
	}
</script>

<style scoped>
	
</style>