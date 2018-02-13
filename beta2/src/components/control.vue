<template>
  <div class="music">
    <audio id="audio" ref='audio' crossOrigin="anonymous" dataNum=0></audio>
    <input type="file" accept='audio/mp3' id='input-file' class='hidden file'>
    <div class="show-title show-title-hide" id="show-title">
      顺序播放
    </div>
    <div class="music-wrap">
      <div class="music-btn">
        <a class="c-btn prev" id="prev" title="上一首" v-on:click='whatKind2()'></a>
        <a class="c-btn" title="播放/暂停" :class="ifPlay?'play':'pause'" v-on:click='playMusic()'></a>
        <a class="c-btn next" id="next" title="下一首" v-on:click='whatKind()'></a>
      </div>
      <div class="music-show">
        <div class="music-name">
          <div class="music-show-name" ref='showname'>
          </div>
          <div class="music-time">
            <span class="time-second" ref='curtime'>00:00</span>
            <span> / </span>
            <span class="time-all" ref='alltime'>00:00</span>
          </div>
        </div>
        <div class="music-bar" v-on:click='planClick'>
          <div class="music-plan">
          </div>
          <div class="music-drag" title="进度控制" v-on:mousedown.stop='planDrag'></div>
        </div>
      </div>
      <div class="music-order">
        <a class="c-btn order-play" v-on:click='cutOrder()' :class='this.orderClass'></a>
      </div>
      <div class="music-vol">
        <a class="c-btn vol-btn" v-on:click='closeVol' :class="ifVol ? 'vol-close' : 'vol-btn'"></a>
        <div class="vol-bar" v-on:click='volClick'>
          <div class="vol-plan"></div>
          <div class="vol-bar-btn" v-on:mousedown.stop='volDrag'>
          </div>
        </div>
      </div>
      <div class="music-list">
        <a class="music-list-img" v-on:click='showList()'></a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    }
  }

</script>

<style>
    
</style>