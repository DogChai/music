<template>
  <div class="music-wave">

  </div>
</template>

<script>
export default {
  mounted() {
      document.getElementsByClassName('music-wave')[0].style.height = window.innerHeight - 85 - 61 + 'px';
      window.addEventListener('resize',function() {
        if(document.getElementsByClassName('music-wave')[0]) {
          document.getElementsByClassName('music-wave')[0].style.height = window.innerHeight - 85 - 61 + 'px';
        }else {
          //
        }
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
  display: none;
  background: rgba(157, 179, 233, 0.8);
  box-shadow: 2px 0 2px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.2);
}

.wave-center {
  width: 150px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left:  -75px;
  margin-top: -30px;
  font-size: 22px;
}
</style>
