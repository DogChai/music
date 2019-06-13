<template>
  <div id="app">
    <div class='blur' data-attr='http://data.wuyayu.com/201908.png'></div>
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
    background-image: url('http://data.wuyayu.com/201908.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: hidden;
    overflow-x: hidden;
    transition: background-image 1.1s;
    /* -webkit-filter: blur(10px); 
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);    
    filter: blur(10px); */
  }

  .blur {
    /* position: absolute; */
    background-position: center top;
    background-size: cover;
    overflow: hidden;
    z-index: 1;
  }

  .blur {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255,255,255,0.8);
      z-index: -1;
  }

  .blur {
    background-image: url('http://data.wuyayu.com/201908.png');
    background-position: center center;
    background-size: cover;
    /* background-attachment: fixed; */
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    -o-filter: blur(10px);
    filter: blur(10px);
    margin: -30px;
  }

/*  @font-face {
    font-family: 'lesses';
    src: url('./assets/font/lesses.ttf');
  }*/
</style>
