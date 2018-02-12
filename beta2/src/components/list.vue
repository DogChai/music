<template>
  <div class="music-play-list" ref='playlist' ifshow=0>
    <div class="play-list-header" v-on:click.stop='headerClick()'>Play List
    </div>
    <div class="list-bar-wrap">
      <div class="list-bar" id="list-bar" v-on:mousedown='listBar'></div>
    </div>
    <ul class='list-header-ul' ref='headerul'>
      <li class="choose" v-on:click='showList1()'>推荐音乐</li>
      <li v-on:click='showList2()'>我的音乐</li>
    </ul>
    <ul class="play-list-ul list-ul" ref='listul'>
      <li v-for='(item,index) in musicData' v-on:click='listClick()' :num="index" :musicName='item.name'>
        <span>{{index + 1}}.</span>{{item.name}} - {{item.singer}}
      </li>
    </ul>
    <ul class="list-ul list-ul2" ref='listul2' myplay='false'>
      <li v-for='(item,index) in dragData' :num='index' :musicName='item.name' :datasrc='item.url' v-on:click.stop='listClick2()'>
        <span>{{index + 1}}.</span>{{item.name}} - {{item.singer}}
        <div class="ul2-close" v-on:click.stop='removeLi()'>
          ×
        </div>
      </li>
      <li class="addmy">
        <!-- 点击添加 -->
        <input type="file" accept='audio/mp3' id='input-file' class='file' v-on:change='getInput()'>
        <span class='myline b-topleft add-tranition'></span>
        <span class='myline b-bottomleft add-tranition'></span>
        <span class='myline b-topright add-tranition'></span>
        <span class='myline b-bottomright add-tranition'></span>
        <span class='shu add-tranition'></span>
        <span class='hen add-tranition'></span>
      </li>
    </ul>
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
