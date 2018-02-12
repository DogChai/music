<template>
    <div class="music-top" ref='musictop'>
        <!-- <canvas id="canvas1" width="100%" height="100px"></canvas> -->
        <ul>
          <li class="top-one" v-on:click='showLrcDiv()'>
            <a>lyric</a>
          </li>
          <li class="top-two" v-on:click='showWaveDiv()'>
            <a>waveform</a>
          </li>
        </ul>
  
        <div class="choose-img">
          <span class="imgurl choose1" imgurl='http://oht4at73h.bkt.clouddn.com/4k3.jpg'></span>
          <span class="img-line"></span>
          <span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/4k2.jpg'></span>
          <span class="img-line"></span>
          <span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new6.png'></span>
          <span class="img-line"></span>
          <span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new2.png'></span>
          <span class="img-line"></span>
          <span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new1.png'></span>
        </div>
        <div class="music-lrc" ref='musiclrc'>
          <ul class='lrc-ul' ref='lrcul'>
            <li>请选择歌曲</li>
          </ul>
        </div>
        <div class="music-wave" ref='musicwave'>
          <canvas id="canvas" :width='this.waveWidth+120' :height='this.waveHeight'></canvas>
        </div>
      </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted () {
            
        },
        methods: {
            
        },
        computed: {
            
        }
    }
</script>

<style>

</style>