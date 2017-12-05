<template>
	<div id="bottombar">
		<div class="showmore"></div>
	</div>
</template>

<script>
	export default {
		name: 'bottombar'
	}
</script>

<style scoped>
	#bottombar {
		height: 50px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		line-height: 50px;
		background-color: skyblue;
	}

	.showmore {
		position: absolute;
		width: 50px;
		height: 25px;
		border: 1px solid gray;
		left: 50%;
		margin-left: -25px;
		top: -25px;
		border-radius: 20px;
	}
</style>