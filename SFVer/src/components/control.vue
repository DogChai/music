<template id='music-control'>
    <div class="music-control">
        <div class="music-control-wrap">
            <!-- 左侧控制 -->
            <div class="music-control-left">
                <span class="music-control-left-prevBtn music-control-btn">
                    <i class="ion-ios-skipbackward"></i> 
                </span>
                <span class="music-control-left-playBtn music-control-btn">
                    <i class="ion-ios-play"></i>
                </span>
                <span class="music-control-left-nextBtn music-control-btn">
                    <i class="ion-ios-skipforward"></i>
                </span>
            </div>
            <!-- 中间名称+进度条  -->
            <div class="music-control-center">
                <div class="music-control-center-top">
                    <div class="music-control-text"></div>
                    <div class="music-control-time">
                        <span class="music-control-time-all">00:00</span>
                        <span> / </span> 
                        <span class="time-control-time-this">00:00</span> 
                    </div>
                </div>
                <div class="music-control-center-bottom">
                    <div class="music-control-rate">
                        <span class="music-control-rate-circle"></span>
                        <span class="music-control-rate-strip"></span>
                    </div>
                </div>
            </div>
            <!-- 右侧音量切换+list切换数量显示 -->
            <div class="music-control-right">
                <div class="music-control-order"></div>
                <div class="music-control-volImg"></div>
                <div class="music-control-volume">
                    <span class="music-control-volume-circle"></span>
                    <span class="music-control-volume-strip"></span>
                </div>
                <div class="music-control-tabList">
                    <i class="ion-ios-musical-notes"></i>
                    <span>99</span>
                </div>
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
    background-color: black;
}

.music-control-left {
    width: 180px;
    height: 100%;
    float: left;
    line-height: 75px;
    box-sizing: border-box;
}

.music-control-btn {
    display: inline-block;
    width: 35px;
    height: 100%;
    text-align: center;
    color: white;
}

.music-control-btn i {
   font-size: 30px;
}

.music-control-btn:nth-of-type(2) i {
    font-size: 32px;
}

.music-control-left .music-control-btn:nth-of-type(2) {
    margin-left: 3px;
}

.music-control-center {
    width:590px;
    height: 100%;
    float: left;
    box-sizing: border-box;
}

.music-control-center-top {
    width: 99%;
    height: 50%;
    background-color: lightblue;
    padding-left: 10px;
    box-sizing: border-box;
}


.music-control-center-bottom {
    width: 99%;
    height: 50%;
    background-color: lightgreen;
    box-sizing: border-box;
    padding-top: 18px;
    padding-left: 10px;
}

.music-control-text {
    height: 86%;
    float: left;
    width: 75%;
    background-color: red;
    margin-top: 3px;
    box-sizing: border-box;
}

.music-control-time {
    height: 100%;
    float: left;
    width: 25%;
    text-align: center;
    color: white;  
}

.music-control-time span {
    display: inline-block;
    height: 100%;
    line-height: 37px;
    font-size: 17px;
    
}

.music-control-time-all {

}

.music-control-time-this {
    
}


.music-control-rate {
    height: 4px;
    width: 96%;
    position: relative;
    background-color: gray;
}

.music-control-rate-circle {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: aqua;
    border-radius: 50%;
    left: -3px;
    top: -4px;
    z-index: 99;
}

.music-control-rate-strip {
    position: absolute;
    height: 100%;
    width: 100px;
    background-color: white;
    left: 0;
    top: 0;
    z-index: 98;
}

.music-control-right {
    width: 290px;
    height: 100%;
    float: left;
    box-sizing: border-box;
    position: relative;
}

.music-control-order {
    width: 40px;
    height: 30px;
    background-color: white;
    position: absolute;
    top: 22px;
    left: 2px;
}

.music-control-volImg {

}

.music-control-volume {
    height: 4px;
    width: 110px;
    position: relative;
    background-color: gray;
    position: absolute;
    top: 35px;
    left: 90px;
}

.music-control-volume-circle {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: aqua;
    border-radius: 50%;
    left: -3px;
    top: -4px;
    z-index: 99;
}

.music-control-volume-strip {
    position: absolute;
    height: 100%;
    width: 20%;
    background-color: white;
    left: 0;
    top: 0;
    z-index: 98;
}

.music-control-toList {
    position: absolute;
}
</style>



