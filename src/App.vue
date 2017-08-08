<template>
  <div id="app">
    <router-view></router-view>
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
    /*background: url('http://lesses.me/music/src/assets/2.jpg') no-repeat;*/
    background: url('http://ogm5at7ve.bkt.clouddn.com/1712309.jpg') no-repeat;
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
