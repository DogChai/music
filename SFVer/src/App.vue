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
  }
}
</script>

<style>
  @import './styles/reset.css';
  @import './styles/ionicons.css';
</style>
<style>
  #app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,1);
  }
</style>
