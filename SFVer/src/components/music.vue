<template>
  <div id="music-container">
    <musicWrap></musicWrap>
    <musicList></musicList>
    <musicControl></musicControl>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
import musicWrap from "../components/main.vue";
import musicList from "../components/list.vue";
import musicControl from '../components/control.vue';
export default {
  components: {
    musicWrap,
    musicList,
    musicControl
  },
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  },
  watch: {

  }
};
</script>

<style>
@import '../../src/styles/music.css';

</style>
