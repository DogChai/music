<template>
	<div id="sm1">
		sm1
		{{vuexcount}}
	</div>
</template>

<script>
	export default {
		name: 'sm1',
		props: ["vuexcount"]
	}
</script>

<style scoped>
	#sm1 {
		width: 850px;
		height: 620px;
		border: 1px solid gray;
		margin: 0px auto 0 auto;
	}
</style>