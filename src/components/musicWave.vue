<template>
  <div class="music-wave">
    波形
  </div>
</template>

<script>
export default {
  mounted() {
      document.getElementsByClassName('music-wave')[0].style.height = window.innerHeight - 85 - 61 + 'px';
      window.addEventListener('resize',function() {
        document.getElementsByClassName('music-wave')[0].style.height = window.innerHeight - 85 - 61 + 'px';
      })
  },
}
</script>

<style lang="css">
.music-wave {
  position: absolute;
  width: 100%;
  top: 65px;
  left:0;
  background: rgba(157, 179, 233, 0.8);
}
</style>
