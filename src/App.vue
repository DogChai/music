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
      bodyWidth: window.innerWidths + 'px',
    }
  },
  mounted() {
   const that = this;
   window.onresize = function temp1() {
       that.bodyHeight = window.innerHeight;
       that.bodyWidth = window.innerWidth;
       document.getElementsByTagName('body')[0].style.height = that.bodyHeight + 'px';
       document.getElementsByTagName('body')[0].style.width = that.bodyWidth + 'px';
   }
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
    background: url('http://lesses.me/music/src/assets/1.jpg');
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
