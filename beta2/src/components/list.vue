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
  import axios from 'axios';
  export default {
    data() {
      return {
        musicData: [] //音乐数组
      }
    },
    methods: {
      //得到音乐数组
      getMusicData() {
        axios.get('http://www.wuyayu.cn/music/beta2/dist/static/music.json').then((response) => {
          this.musicData = response.data;
          console.log(this.musicData)
        }, (response) => {
          console.log('music.json获取失败')
        })
      },
      //列表点击
      listClick() {
        let audioUrls = document.getElementById('audio').src;
        let audio = document.getElementById('audio');
        let this_ = event.currentTarget;
        audio.setAttribute('dataNum', this_.getAttribute('num'));
        this.playNum = this_.getAttribute('num') - 0;
        this.audioUrl = this.musicData[this.playNum].url;
        this.$refs.listul2.setAttribute('myplay', 'false');
        for (var i = 0; i < this.$refs.listul2.children.length; i++) {
          if (this.$refs.listul2.children[i].getAttribute('class') == 'addmy') {
            //null
          } else {
            this.$refs.listul2.children[i].setAttribute('class', '');
          }
        }
        if (audioUrls == this.audioUrl) {
          this_.setAttribute('class', 'playing');
          this.playMusic();
        } else {
          for (var i = 0; i < this.musicData.length; i++) {
            this.$refs.listul.children[i].setAttribute('class', '');
          }
          audio.src = this.audioUrl;
          this.ifPlay = true;
          this.$refs.showname.innerHTML = this.musicData[this.playNum].name + ' - ' + this.musicData[this.playNum].singer;
          this_.setAttribute('class', 'playing');
          this.playMusic();
        }
        this.getLrcFile(this.musicData[this.playNum].name)
      },
      //通过input得到歌曲
      getInput() {
        let thisFiles = event.currentTarget.files;
        let thisIndex = thisFiles[0].name.lastIndexOf('.');
        let ext = thisFiles[0].name.substr(thisIndex + 1);
        if (ext == 'mp3') {
          let dragName = thisFiles[0].name.substring(0, thisFiles[0].name.lastIndexOf('.'));
          let dragUrl = window.URL.createObjectURL(thisFiles[0]);
          this.dragData.push({
            name: dragName.split('-')[1].trim(),
            singer: dragName.split('-')[0].trim(),
            url: dragUrl
          });
          // console.log(this.dragData);
        }
        this.clearRepeat(this.dragData, 'name');
        this.showList2();
      },
      //列表滚动  显示滚动条
      listWell() {
        let that = this;
        let bar = document.getElementById('list-bar');
        let thisLBW = document.getElementsByClassName('list-bar-wrap')[0];
        let playList1 = document.getElementsByClassName('play-list-ul')[0];
        let timer2 = null;
        that.$refs.playlist.onmouseover = function () {
          bar.style.opacity = 1;
        }
        that.$refs.playlist.onmouseout = function () {
          clearTimeout(timer2);
          timer2 = setTimeout(function () {
            bar.style.opacity = 0;
          }, 3000)
        }
        that.$refs.listul.onmousewheel = function (e) {
          let PH = thisLBW.offsetHeight + 7;
          let PH1 = playList1.offsetHeight - 200;
          // console.log(that.listScroll * (thisLBW.offsetHeight / PH1))
          if (e.wheelDelta < 0) {
            //向上滚动
            that.listScroll += 60;
          } else if (e.wheelDelta > 0) {
            //向下滚动
            that.listScroll -= 60;
          }
          if (that.listScroll <= -60) {
            that.listScroll = -60;
          }
          if (that.listScroll >= that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60) {
            that.listScroll = that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60;
          }
          let B = parseInt(that.listScroll * (PH / PH1));
          bar.style.transform = 'translateY(' + B + 'px)';
          if (parseInt(bar.style.transform.substring(11)) <= 0) {
            bar.style.transform = 'translateY(0px)';
            that.barScroll = 0;
          }
          if (parseInt(bar.style.transform.substring(11)) >= (PH - 7 - 66)) {
            let PHB = PH - 7 - 66;
            bar.style.transform = 'translateY(' + PHB + 'px)';
            that.barScroll = PHB;
          } else {
            that.barScroll = parseInt(bar.style.transform.substring(11));
          }

          that.$refs.listul.style.transform = 'translateY(-' + that.listScroll + 'px)';
        }
      },
      //滚动条
      listBar(e) {
        let that = this;
        let bar = document.getElementById('list-bar');
        let playList1 = document.getElementsByClassName('play-list-ul')[0];
        let playList2 = document.getElementsByClassName('list-ul2')[0];
        let thisLBW = document.getElementsByClassName('list-bar-wrap')[0];
        let top = e.clientY;
        that.barTop = parseInt(bar.style.transform.substring(11));
        let PH = 0;
        for (var i = 0; i < playList1.children.length - 1; i++) {
          PH += playList1.children[i].offsetHeight;
        }
        PH = PH - 20;
        document.onmousemove = function (e) {
          let _top = e.clientY;
          that.barScroll = _top - top + that.barTop;
          if (that.barScroll > thisLBW.offsetHeight - 66) {
            that.barScroll = thisLBW.offsetHeight - 66;
          }
          if (that.barScroll <= 0) {
            that.barScroll = 0;
          }
          bar.style.transform = 'translateY(' + that.barScroll + 'px)';
          let Y = -that.barScroll * (PH / thisLBW.offsetHeight);
          playList1.style.transform = 'translateY(' + Y + 'px)';
          that.listScroll = -parseInt(playList1.style.transform.substring(11));
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmousedown = null;
          document.onmouseup = null;
        }
      },
      //列表2滚动
      listWell2() {
        let that = this;
        that.$refs.listul2.onmousewheel = function (e) {
          let lisHeight = 0;
          for (var i = 0; i < that.$refs.listul2.children.length; i++) {
            lisHeight += that.$refs.listul2.children[i].offsetHeight;
          }
          if (lisHeight < that.$refs.playlist.offsetHeight - 61) {
            // console.log('111');
          } else {
            if (e.wheelDelta < 0) {
              //向上滚动
              that.listScroll2 += 60;
            } else if (e.wheelDelta > 0) {
              //向下滚动
              that.listScroll2 -= 60;
            }
            if (that.listScroll2 <= -60) {
              that.listScroll2 = -60;
            }
            if (that.listScroll2 >= that.$refs.listul2.offsetHeight - that.$refs.playlist.offsetHeight + 60) {
              that.listScroll2 = that.$refs.listul2.offsetHeight - that.$refs.playlist.offsetHeight + 60;
            }
            that.$refs.listul2.style.top = -that.listScroll2 + 'px';
          }
        }
      },
      //playlist点击
      headerClick() {
        if (this.ifHeader == 0) {
          this.$refs.headerul.style.display = 'block';
          this.ifHeader = 1;
        } else {
          this.$refs.headerul.style.display = 'none';
          this.ifHeader = 0;
        }
      },
      //切换推荐音乐列表
      showList1() {
        this.ifMy = 0;
        this.$refs.headerul.children[1].setAttribute('class', '');
        this.$refs.headerul.children[0].setAttribute('class', 'choose');
        this.$refs.listul.style.left = '0';
        this.$refs.listul2.style.left = '-230px';
        this.$refs.listul2.setAttribute('myplay', 'false');
        this.listNum();
      },
      //切换我的音乐列表
      showList2() {
        this.ifMy = 1;
        this.$refs.headerul.children[0].setAttribute('class', '');
        this.$refs.headerul.children[1].setAttribute('class', 'choose');
        this.$refs.listul2.style.left = '0';
        this.$refs.listul.style.left = '-230px';
        this.$refs.listul2.setAttribute('myplay', 'true');
        this.listNum();
      },
      //第二列表点击
      listClick2() {
        let audioUrls = document.getElementById('audio').src;
        let audio = document.getElementById('audio');
        let this_ = event.currentTarget;
        let thisNum = this_.getAttribute('num') - 0;
        this.audioUrl = this.dragData[thisNum].url;
        this.$refs.listul2.setAttribute('myplay', 'true');
        this.dragNum = thisNum;
        for (var i = 0; i < this.musicData.length; i++) {
          this.$refs.listul.children[i].setAttribute('class', '');
        }
        if (audioUrls == this.audioUrl) {
          this_.setAttribute('class', 'playing');
          this.playMusic();
        } else {
          for (var i = 0; i < this.$refs.listul2.children.length; i++) {
            if (this.$refs.listul2.children[i].getAttribute('class') == 'addmy') {

            } else {
              this.$refs.listul2.children[i].setAttribute('class', '');
            }
          }
          audio.src = this.audioUrl;
          this.ifPlay = true;
          this.$refs.showname.innerHTML = this.dragData[thisNum].name + ' - ' + this.dragData[thisNum].singer;
          this_.setAttribute('class', 'playing');
          this.playMusic();
        }
        this.getLrcFile(this.dragData[this.dragNum].name)
      },
      //切换列表音乐数量
      listNum() {
        let musiclist = document.getElementsByClassName('music-list-img')[0];
        if (this.ifMy == 0) {
          musiclist.innerHTML = this.musicData.length;
        } else {
          musiclist.innerHTML = this.dragData.length;
        };
      },
      //移除我的音乐
      removeLi() {
        let thisClose = event.currentTarget;
        let thisLi = thisClose.parentNode;
        let thisNum = thisLi.getAttribute('num');
        this.dragData.splice(thisNum, 1);
        window.localStorage.clear();
        this.saveMusic();
        // thisLi.parentNode.removeChild(thisLi);
      },
    },
    mounted() {
      this.getMusicData();

    },
    computed: {

    }
  }

</script>

<style>


</style>
