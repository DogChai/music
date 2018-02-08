<template id='music-control'>
    <div class="music-control">
        <div class="music-control-wrap">
            <!-- 左侧控制 -->
            <div class="music-control-left">
                <span class="music-control-left-prevBtn music-control-btn">
                    <i class="ion-ios-skipbackward-outline"></i> 
                </span>
                <span class="music-control-left-playBtn music-control-btn">
                    <i class="ion-ios-play-outline"></i>
                </span>
                <span class="music-control-left-nextBtn music-control-btn">
                    <i class="ion-ios-skipforward-outline"></i>
                </span>
            </div>
            <!-- 中间名称+进度条  -->
            <div class="music-control-center">
                <div class="music-control-center-top">
                    <div class="music-control-text"></div>
                    <div class="music-control-time"></div>
                </div>
                <div class="music-control-center-bottom">
                    <div class="music-control-rate"></div>
                </div>
            </div>
            <!-- 右侧音量切换+list切换数量显示 -->
            <div class="music-control-right">
                <div class="music-control-order"></div>
                <div class="music-control-volume"></div>
                <div class="music-control-tabList"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "music-control",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style>
@import "../styles/control.css";
</style>
<style>
.music-control {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: rgba(0, 0, 0, 0.3);
}

.music-control-wrap {
    width: 1060px;
    height: 75px;
    margin: 7px auto;
    background-color: white;
}

.music-control-left {
    width: 170px;
    height: 100%;
    float: left;
    line-height: 75px;
}

.music-control-btn {
    display: inline-block;
    width: 35px;
    height: 100%;
    text-align: center;
}

.music-control-btn i {
   font-size: 30px;
}

.music-control-btn:nth-of-type(2) i {
    font-size: 32px;
}
</style>



