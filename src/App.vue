<template>
  <div id="app">
    <vuemusic></vuemusic>
  </div>
</template>

<script>
import vuemusic from './components/music.vue'
export default {
  components: {
    vuemusic,
  },
  data() {
    return {
      bodyHeight: window.innerHeight + 'px',
      bodyWidth: window.innerWidth + 'px',
    }
  },
  methods: {
  },
  mounted() {
 },
}
</script>

<style>
  @import './style/reset.css';
</style>

<style>
  body {
    height: 100%;
    width: 100%;
    background: url('http://lesses.me/music/src/assets/2.jpg') no-repeat;
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
