<template>
	<div id="sm1">
		<div class="music-one-wrap">
			<div class="music-one">

			</div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<div class="music-one"></div>
			<span class="clear"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'sm1',
	}
</script>

<style scoped>
	#sm1 {
		width: 950px;
		height: 620px;
		border: 1px solid gray;
		margin: 0px auto 0 auto;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		border-top-left-radius: 5px;
  		border-top-right-radius: 5px;
		overflow: hidden;
		overflow-y: auto;
		margin-bottom: 10px;
	}

	.music-one-wrap {
		width: 100%;
		height: auto;
		/* display: flex;
		justify-content:center; */
	}

	.clear {
		clear: both;
	}

	.music-one {
		width: 23%;
		height: 150px;
		background: white;
		float: left;
		margin: 10px 0.75% 5px 0.75%;
	}

	.music-one:nth-of-type(1) {
		margin: 10px 0.75% 5px 1.5%;
	}

	.music-one:nth-of-type(4n) {
		margin: 10px 1.5% 5px 0.75%;
	}

	.music-one:nth-of-type(4n+1) {
		margin: 10px 0.75% 5px 1.5%;
	}
</style>