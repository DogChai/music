<template>
	<div id="index" ref="index" @click='hideMusic'>
    <img id="index-img" src="http://p06lhz3o9.bkt.clouddn.com/201801.jpg" alt="">
		<div class="showMusic" ref="showmusic" @click='noup'>
			<music></music>
			<button class="showBtn" @click="showMusic" v-show='!ifShow'></button>
		</div>
		<div class="sm-wrap">
        <div class="music-tab">
          <ul ref='uls' class="uls">
            <li @click='tosm1' style="margin-left: 1px">1</li>
            <li @click='tosm2' >2</li>
            <li @click='tosm3' >3</li>
            <li @click='tosm4' >4</li>
            <li @click='tosm5' >5</li>
            <li @click='tosm6' >6</li>
            <li @click='tosm7' >7</li>
            <!-- <li>敬请期待</li> -->
          </ul>
			  </div>
        <transition mode='out-in'>
          <router-view class="center-main"></router-view>
        </transition>
			<!-- <leftbar></leftbar> -->
			<!-- <rightbar></rightbar> -->
		</div>
		<!-- <bottombar></bottombar>	 -->
	</div>
</template>

<script>
import bottombar from "./bottombar.vue";
import leftbar from "./leftbar.vue";
import rightbar from "./rightbar.vue";
import music from "./music.vue";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "index",
  components: {
    bottombar,
    leftbar,
    rightbar,
    music
  },
  data() {
    return {
      ifShow: false
    };
  },
  methods: {
    changeBtnColor: function(index) {
      var uls = document.getElementsByClassName("uls")[0];
      for (var i = 0; i < uls.children.length; i++) {
        uls.children[i].style.backgroundColor = "skyblue";
      }
      uls.children[index].style.backgroundColor = "orange";
    },
    tosm1: function() {
      this.changeBtnColor(0);
      this.$router.push("/index/sm1");
    },
    tosm2: function() {
      this.changeBtnColor(1);
      this.$router.push("/index/sm2");
    },
    tosm3: function() {
      this.changeBtnColor(2);
      this.$router.push("/index/sm3");
    },
    tosm4: function() {
      this.changeBtnColor(3);
      this.$router.push("/index/sm4");
    },
    tosm5: function() {
      this.changeBtnColor(4);
      this.$router.push("/index/sm5");
    },
    tosm6: function() {
      this.changeBtnColor(5);
      this.$router.push("/index/sm6");
    },
    tosm7: function() {
      this.changeBtnColor(6);
      this.$router.push("/index/sm7");
    },
    showMusic: function(e) {
      e.stopPropagation();
      if (this.ifShow) {
        this.$refs.showmusic.style.top = "-750px";
        this.ifShow = false;
      } else {
        this.$refs.showmusic.style.top = "50px";
        this.ifShow = true;
      }
    },
    hideMusic: function(e) {
      e.stopPropagation();
      if (this.ifShow) {
        this.$refs.showmusic.style.top = "-750px";
        this.ifShow = false;
      }
    },
    noup: function(e) {
      e.stopPropagation();
      console.log(1);
    }
  },
  mouthed() {},
  computed: {},
  watch: {
    $route(to, from) {
      if (to.path == "") {
        this.tabAnimation = "slide-right";
      } else {
        this.tabAnimation = "slide-left";
      }
    }
  }
};
</script>

<style scoped>
#index {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.3); */
}

.music-tab {
  width: 950px;
  height: 40px;
  /* border: 1px solid gray; */
  margin: 60px auto 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  margin-bottom: 2px;
  overflow: hidden;
}

.music-tab ul {
  width: 100%;
  height: 100%;
}

.music-tab ul li {
  width: 130.5px;
  background-color: skyblue;
  float: left;
  height: 100%;
  border: 1px solid gray;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  margin-left: 3px;
}

.music-tab ul li:hover {
  background-color: lightblue;
}

.sm-wrap {
  width: 1600px;
  height: 800px;
  margin: 80px auto 0 auto;
  /* border: 1px solid gray; */
  position: relative;
  border-radius: 5px;
}

.showMusic {
  position: fixed;
  width: 1100px;
  height: 750px;
  background-color: rgba(0, 0, 0, 0.3);
  top: -750px;
  left: 50%;
  margin-left: -550px;
  border-radius: 1px;
  text-align: center;
  transition: all 0.5s;
  z-index: 999;
}

.showMusic .showBtn {
  position: absolute;
  width: 46px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: -25px;
  left: 50%;
  margin-left: -23px;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  outline: none;
  transition: all 0.3s;
}

.active {
  background: orange;
}

.center-main {
  overflow: hidden;
  transition: all 0.5s;
}

</style>