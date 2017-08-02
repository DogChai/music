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
   document.getElementsByTagName('body')[0].style.height = this.bodyHeight ;
   document.getElementsByTagName('body')[0].style.width = this.bodyWidth ;
   const that_ = this;
   window.onresize = function temp1() {
       that_.bodyHeight = window.innerHeight;
       that_.bodyWidth = window.innerWidth;
      //  console.log(that_.bodyHeight,that_.bodyWidth);
       document.getElementsByTagName('body')[0].style.height = that_.bodyHeight + 'px';
       document.getElementsByTagName('body')[0].style.width = that_.bodyWidth + 'px';
       console.log(document.getElementsByClassName('music-play-list')[0]);
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
    background: url('http://lesses.me/music/src/assets/1.jpg') no-repeat;
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
