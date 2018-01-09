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
    }
  },
  methods: {
  },
  mounted() {
    let Bodys = document.getElementsByTagName('body')[0];
    let Musics = document.getElementsByClassName('music')[0];
    let MusicPlayLists = document.getElementsByClassName('music-play-list')[0];

    function changeSize() {
      Bodys.style.height = window.innerHeight + 'px';
      Bodys.style.width = window.innerWidth + 'px';
      Musics.style.width = window.innerWidth + 'px';
      MusicPlayLists.style.height = window.innerHeight - 75 + 'px';
    }
    changeSize();
    window.addEventListener('resize',function() {
      changeSize();
    })
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
    background-image: url('http://oht4at73h.bkt.clouddn.com/4k3.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
    transition: background-image 1.1s;
  }

  @font-face {
    font-family: 'lesses';
    src: url('./assets/font/lesses.ttf');
  }
</style>
