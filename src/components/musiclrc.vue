<template>
  <div class="music-lrc">
    <ul class='lrc-ul'>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
      <li>1111111111111111111111111111111</li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    document.getElementsByClassName('music-lrc')[0].style.height = window.innerHeight - 85 - 61 + 'px';
    window.addEventListener('resize',function() {
      if(document.getElementsByClassName('music-lrc')[0]) {
        document.getElementsByClassName('music-lrc')[0].style.height = window.innerHeight - 85 - 61 + 'px';
      }else {
        //
      }
    });
  },
}
</script>

<style lang="css">
  .music-lrc {
    position: absolute;
    width: 100%;
    top: 65px;
    left:0;
    bottom: 75px;
    background: rgba(157, 179, 233, 0.8);
  }

  .lrc-ul {
    width: 370px;
    height: auto;
  }

  .lrc-ul li {
    padding: 5px 10px;
    font-size: 16px;
  }
</style>
