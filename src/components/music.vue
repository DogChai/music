<template>
	<div class="music">
		<audio id="audios" ref='audio' dataNum=0 >
		</audio>
    <input type="file" accept='audio/mp3' id='input-file' class='hidden file' v-on:change='inputfile'>
		<div class="music-wrap">
			<div class="music-btn">
				<a class="c-btn prev" id="prev" title="上一首" v-on:click='musicclick'></a>
				<a class="c-btn" title="播放/暂停" v-on:click.stop='playmusic' :class="ifplay?'play':'pause'" ></a>
				<a class="c-btn next" id="next" title="下一首" v-on:click='musicclick'></a>
			</div>
			<div class="music-show">
				<div class="music-name">
					<div class="music-show-name">
						<!-- {{musicData[0].name +' - '+ musicData[0].singer}} -->
					</div>
					<div class="music-time"><span class="time-second">00:00</span>/<span class="time-all">00:00</span></div>
				</div>
				<div class="music-bar" v-on:click='getDrag'>
					<div class="music-plan">
					</div>
					<div class="music-drag" v-on:mousedown.stop='dragplan'></div>
				</div>
			</div>
			<div class="music-order">
				<a class="c-btn order-play" v-on:click='cutorder' v-bind:class='this.orderclass'></a>
			</div>
			<div class="music-vol">
				<a class="c-btn" v-on:click='closevol' :class="ifvol ? 'vol-close' : 'vol-btn'"></a>
				<div class="vol-bar" v-on:click='getVol'>
					<div class="vol-plan"></div>
					<div class="vol-bar-btn" v-on:mousedown.stop='voldrag'>
					</div>
				</div>
			</div>
			<div class="music-list">
				<a class="music-list-img" v-on:click='showmy'>{{musicData.length}}</a>
			</div>
		</div>
		<div class="music-play-list">
			<div class="play-list-header" v-on:click.stop='headerlist()'>Play List

			</div>
			<ul class='list-header-ul'>
				<li class="choose" v-on:click='showheader1()'>推荐音乐</li>
				<li v-on:click='showheader2()'>我的音乐</li>
			</ul>
			<ul class="play-list-ul list-ul">
				<li v-for='(item,index) in musicData' :num="index" :musicName='item.name' v-on:click='listClick(),getLrc()'>
					<span>{{index + 1}}.</span>{{item.name}} - {{item.singer}}
				</li>
			</ul>
			<ul class="list-ul list-ul2">
				<li v-for='(item,index) in dragObj' :num='index' :musicName='item.name' :datasrc='item.url' v-on:click='li2click()'>
					<span>{{index + 1}}</span>{{item.name}} - {{item.singer}}
				</li>
			</ul>
		</div>
		<div class="music-top">
			<ul>
				<li class="top-one" v-on:click="showlrc()"><a>歌词显示</a></li>
				<li class="top-two" v-on:click="showwave()"><a>歌曲波形</a></li>
			</ul>
				<div class="music-lrc">
			    <ul class='lrc-ul'>
						<li>请选择歌曲</li>
			    </ul>
			  </div>
				<div class="music-wave">
					<div class="wave-center">
						敬请期待
					</div>
				</div>
		</div>
	</div>

</template>

<script type="text/javascript">
	import axios from 'axios'
	export default {
		components: {
		},
		data() {
			return {
				dragObj: [],
				headerul: 0,
				ulTop: 0,
				curtime: 0,
				lrcsecond: 0,
				lrctime: {},
				lrcObj: {},
				lrcName: null,
				lrcData: [],
				tabAnimation:'slide-left',
				ifplay:true,
				ifcut:0,
				ifvol:0,
				orderclass:'order-play',
				musicleft:0,
				volleft:0,
				scales:1,
				scales1:0,
				ifshow:0,
				musicData:[],
				newData:[],
				randomNum:0,
				oneNum:0,
				listNum:0,
				orderNum:0,
				ends:false,
				scrollPageY:0,
				scrollProp:0,
				playNum:0,
				appHeight: window.innerHeight,
				appWidth: window.innerWidth,
				audioUrl: null,
			}
		},
		methods: {
			//json获取
			getMusicData() {
				// music/
				this.$http.get('http://lesses.me/music/static/music.json').then((response) => {
					this.musicData = response.data;
				},(response) => {
					console.log('失败');
				})
			},
			// 播放/暂停
			playmusic(e) {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				for(var i=0; i<this.musicData.length; i++) {
					listLis[i].setAttribute('class','');
				}
				listLis[this.playNum - 0].setAttribute('class','playing');
				if(this.ifplay) {
					this.$refs.audio.play();
					this.ifplay = false;
				}else {
					this.$refs.audio.pause();
					this.ifplay = true;
				}
			},
			// 顺序切换
			cutorder() {
				if(this.ifcut == 0) {
					this.orderclass = 'random-play';
					this.ifcut = 1;
				}else if (this.ifcut == 1) {
					this.orderclass = 'one-play';

					this.ifcut = 2;
				}else if (this.ifcut == 2) {
					this.orderclass = 'list-play';
					this.ifcut = 3;
				}else {
					this.orderclass = 'order-play';
					this.ifcut = 0;
				}
			},
			// 静音
			closevol() {
				if(this.ifvol) {
					this.ifvol = 0;
					document.getElementById('audios').volume = this.scales;

				}else {
					this.ifvol = 1;
					 document.getElementById('audios').volume = 0;
				}
			},
			// 进度点击
			getDrag(e) {
				let getAudio = document.getElementById('audios');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let musicShow = document.getElementsByClassName('music-show')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				let lrcLi = document.getElementsByClassName('lrc-ul')[0].children;
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				let lisnum = 0;
				let lisheight = 0;
				this.musicleft = e.clientX - musicWrap.offsetLeft - musicBar.offsetLeft;
				this.scales1 = this.musicleft / musicBar.offsetWidth;
				musicDarg.style.left = this.musicleft + 'px';
				musicPlan.style.width = musicBar.offsetWidth * this.scales1 + 'px';
				getAudio.currentTime = getAudio.duration * this.scales1;
				// this.getMusicTime();
				this.ifplay = 1;
				this.playmusic();
				this.curtime = Math.round(getAudio.currentTime);
				for(var j=0; j<lrcLi.length; j++) {
					lrcLi[j].setAttribute('class','');
				};
				if(lrcLi.length == 1) {

				}else {
					lisnum = 0;
					lisheight = 0;
					for(var i=0; i<lrcLi.length; i++) {
						if(lrcLi[i].getAttribute('time') < this.curtime) {
							lisnum++;
							lisheight += lrcLi[i].offsetHeight;
							lrcLi[i].setAttribute('class','');
						}
					}
					if(lisnum == 0) {
						lrcUl.style.top = musicLrc.offsetHeight / 2 + 50 + 'px';
					}else {
						console.log(this.ulTop - lisheight);
						lrcUl.style.top = musicLrc.offsetHeight / 2 + 50 - lisheight + 'px';
						if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum-2].getAttribute('time')) {
							console.log('duiduidui')
							lrcLi[lisnum-1].setAttribute('class','playing');
							lrcLi[lisnum-2].setAttribute('class','playing');
						}else if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum].getAttribute('time')) {
							lrcLi[lisnum-1].setAttribute('class','playing');
							lrcLi[lisnum].setAttribute('class','playing');
						}else {
							lrcLi[lisnum-1].setAttribute('class','playing');
						}
					}
				}
			},
			// 音量点击
			getVol(e) {
				let volBarBtn = document.getElementsByClassName('vol-bar-btn')[0];
				let volPlan = document.getElementsByClassName('vol-plan')[0];
				let musicVol = document.getElementsByClassName('music-vol')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				let volBar = document.getElementsByClassName('vol-bar')[0];
				this.volleft = e.clientX - volBar.offsetLeft - musicWrap.offsetLeft;
				volBarBtn.style.left = this.volleft + 'px';
				this.scales = volBarBtn.offsetLeft / volBar.offsetWidth;
				if(this.scales > 0) {
					document.getElementById('audios').volume = this.scales;
					volPlan.style.width = volBar.offsetWidth * this.scales + 'px';
					this.ifvol = 1;
					this.closevol();
				}else if(this.scales == 0){
					document.getElementById('audios').volume = this.scales;
					volPlan.style.width = '0' + 'px';
					this.ifvol = 0;
					this.closevol();
				}
			},
			// 进度拖拽
			dragplan(e) {
				let getAudio = document.getElementById('audios');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let musicShow = document.getElementsByClassName('music-show')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				let lrcLi = document.getElementsByClassName('lrc-ul')[0].children;
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				let lisnum = 0;
				let lisheight = 0;
				this.ifplay = false;
				this.playmusic();
				let that = this;
				document.onmousemove = function(e) {

					that.musicleft = e.clientX - musicBar.offsetLeft - musicWrap.offsetLeft - musicDarg.offsetWidth / 2;
					if(that.musicleft <= 0) {
						that.musicleft = 0;
					}
					if(that.musicleft >= musicBar.offsetWidth) {
						that.musicleft = musicBar.offsetWidth;
					}
					that.scales1 = that.musicleft / musicBar.offsetWidth;
					musicDarg.style.left = that.musicleft + 'px';
					musicPlan.style.width = musicBar.offsetWidth * that.scales1 + 'px';
				};
				document.onmouseup = function() {
					that.scales1 = musicDarg.offsetLeft / musicBar.offsetWidth;
					getAudio.currentTime = getAudio.duration * that.scales1;
					that.ifplay = 1;
					that.playmusic();
					document.onmousemove = null;
					document.onmousedown = null;
					document.onmouseup = null;
					this.curtime = Math.round(getAudio.currentTime.toFixed(1));
					for(var j=0; j<lrcLi.length; j++) {
						lrcLi[j].setAttribute('class','');
					};
					if(lrcLi.length == 1) {

					}else {
						lisnum = 0;
						lisheight = 0;
						for(var i=0; i<lrcLi.length; i++) {
							if(lrcLi[i].getAttribute('time') < this.curtime) {
								lisnum++;
								lisheight += lrcLi[i].offsetHeight;
								lrcLi[i].setAttribute('class','');
								// lrcLi[i].setAttribute('ifchoose','true');
							}
						}
						// console.log(lisnum);
						if(lisnum == 0) {
							lrcUl.style.top = musicLrc.offsetHeight / 2 + 50 + 'px';
						}else {
							console.log(this.ulTop - lisheight);
							lrcUl.style.top = musicLrc.offsetHeight / 2 + 50 - lisheight + 'px';
							if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum-2].getAttribute('time')) {
								console.log('duiduidui')
								lrcLi[lisnum-1].setAttribute('class','playing');
								lrcLi[lisnum-2].setAttribute('class','playing');
							}else if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum].getAttribute('time')) {
								lrcLi[lisnum-1].setAttribute('class','playing');
								lrcLi[lisnum].setAttribute('class','playing');
							}else {
								lrcLi[lisnum-1].setAttribute('class','playing');
							}
						}
					}
					// that.getMusicTime()
				}
			},
			// 音量拖拽
			voldrag() {
					let volBarBtn = document.getElementsByClassName('vol-bar-btn')[0];
					let volBar = document.getElementsByClassName('vol-bar')[0];
					let volPlan = document.getElementsByClassName('vol-plan')[0];
					let musicVol = document.getElementsByClassName('music-vol')[0];
					let musicWrap = document.getElementsByClassName('music-wrap')[0];
					let that = this;
					document.onmousemove = function(e) {
						// console.log(e.clientX,volBarBtn.offsetLeft,volBar.offsetLeft,musicWrap.offsetLeft);
							that.volleft = e.clientX - volBar.offsetLeft - musicWrap.offsetLeft - volBarBtn.offsetWidth / 2;
							if(that.volleft <= 0) {
								that.volleft = 0;
							}
							if(that.volleft >= volBar.offsetWidth) {
								that.volleft = volBar.offsetWidth;
							}
							volBarBtn.style.left = that.volleft + 'px';
							that.scales = volBarBtn.offsetLeft / volBar.offsetWidth;
							// console.log(that.scales)
							if(that.scales > 0) {
								document.getElementById('audios').volume = that.scales;
								volPlan.style.width = volBar.offsetWidth * that.scales + 'px';
								that.ifvol = 1;
								that.closevol();
							}else if(that.scales == 0){
								document.getElementById('audios').volume = that.scales;
								volPlan.style.width = '0' + 'px';
								that.ifvol = 0;
								that.closevol();
							}
						};
						document.onmouseup = function() {
							that.scales = volBarBtn.offsetLeft / volBar.offsetWidth;
							document.onmousemove = null;
							document.onmousedown = null;
						}
			},
			// 显示列表
			showmy() {
				let playList = document.getElementsByClassName('music-play-list')[0];
				let musicTop = document.getElementsByClassName('music-top')[0];
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				if(this.ifshow == 0) {
					playList.style.transform = 'translate(0)';
					musicTop.style.width = window.innerWidth - 232 + 'px';
					musicTop.style.top = 0;
					musicLrc.style.height = window.innerHeight - 85 - 100 + 'px';
					this.ifshow = 1;
				}else {
					playList.style.transform = 'translate(-230px)';
					musicTop.style.width = window.innerWidth + 'px';
					musicTop.style.top = -63 + 'px';
					musicLrc.style.height = musicLrc.offsetHeight + 50 + 'px';
					this.ifshow = 0;
				}
			},
			// 时间进度
			timeActive() {
				let getAudio = document.getElementById('audios');
				// 音乐时间
				let timeSeconds = parseInt(getAudio.duration % 60);
				let timeMinutes = parseInt(getAudio.duration / 60);

				if(timeSeconds <= 9) {
					timeSeconds = '0' + timeSeconds;
				}

				if(timeMinutes <= 9) {
					timeMinutes = '0' + timeMinutes;
				}

				document.getElementsByClassName('time-all')[0].innerHTML = timeMinutes + ':' + timeSeconds;
				// 当前播放时间
				let newSeconds = parseInt(getAudio.currentTime % 60);
				let newMinutes = parseInt(getAudio.currentTime / 60);
				// console.log(getAudio.currentTime)
				//
				// console.log(Math.round(getAudio.currentTime))
				if(newSeconds <= 9) {
					newSeconds = '0' + newSeconds;
				}

				if(newMinutes <= 9) {
					newMinutes = '0' + newMinutes;
				}
				document.getElementsByClassName('time-second')[0].innerHTML = newMinutes + ':' + newSeconds;

				this.curtime = Math.round(getAudio.currentTime.toFixed(1));
			},
			//获得音乐时间  //歌词滚动
			getMusicTime() {
				let getAudio = document.getElementById('audios');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				let lrcLi = document.getElementsByClassName('lrc-ul')[0].children;
				let that = this;
					getAudio.addEventListener('timeupdate',function(){
						that.curtime = Math.round(getAudio.currentTime);
						var lrcLine = 0;
						if(lrcUl.getAttribute('move')) {
							for(var i=0; i<lrcLi.length; i++) {
								var thisliHeight = 0;
								if(lrcLi[i].getAttribute('time') == that.curtime  && lrcLi[i].getAttribute('ifchoose') == 'false'){
									for(var j=0; j<lrcLi.length; j++) {
										lrcLi[j].setAttribute('class','');
									}
									lrcLine++;
									if(lrcLine == 2) {
										that.lasti = i;
										lrcLi[i].setAttribute('class','playing');
										lrcLi[i-1].setAttribute('class','playing');
										lrcLi[i].setAttribute('ifchoose','true');
										lrcLi[i-1].setAttribute('ifchoose','true');
										thisliHeight = lrcLi[i].offsetHeight + lrcLi[i-1].offsetHeight;
									}else if(lrcLine == 1){
										that.lasti = i;
										lrcLi[i].setAttribute('class','playing');
										thisliHeight = lrcLi[i].offsetHeight;
										lrcLi[i].setAttribute('ifchoose','true');
									}else if(lrcLine == 3) {
										that.lasti = i;
										lrcLi[i].setAttribute('class','playing');
										lrcLi[i-1].setAttribute('class','playing');
										lrcLi[i-2].setAttribute('class','playing');
										lrcLi[i].setAttribute('ifchoose','true');
										lrcLi[i-1].setAttribute('ifchoose','true');
										lrcLi[i-2].setAttribute('ifchoose','true');
										thisliHeight = lrcLi[i].offsetHeight + lrcLi[i-1].offsetHeight + lrcLi[i-2].offsetHeight;
									}
									lrcUl.style.top = lrcUl.offsetTop - thisliHeight + 'px';
									that.lastnum = lrcLine;
								}
							}
						}else {
							// console.log('不需要滚动');
						}
						this.scales1 = getAudio.currentTime / getAudio.duration;
						// console.log(this.scales1);
						musicPlan.style.width = musicBar.offsetWidth * this.scales1 + 'px';
						musicDarg.style.left = musicBar.offsetWidth * this.scales1 + 'px';
						that.timeActive();
					},false);
			},
			//列表循环
			listplay() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let audio = document.getElementById('audios');
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				this.listNum = audio.getAttribute('dataNum') - 0;
				if(event.currentTarget.getAttribute('id') == 'prev') {

					if(this.listNum == 0) {
						this.listNum = this.musicData.length;
					}
					if(this.listNum < 0) {
						this.listNum = -1
					}

					this.listNum = this.listNum - 1;
					audio.src = this.musicData[this.listNum].url;
					audio.setAttribute('dataNum',this.listNum);
					this.playNum = audio.getAttribute('datanum') - 0;
					listLis[this.playNum - 0].setAttribute('class','playing');
					// console.log(this.playNum);
					this.getLrc1();

					musicShowName.innerHTML = this.musicData[this.listNum].name + ' - ' + this.musicData[this.listNum].singer;
					this.getMusicTime();
					this.ifplay = true;
					this.playmusic();

				}else if(event.currentTarget.getAttribute('id') == 'next' || this.ends == true) {

						if(this.listNum == this.musicData.length - 1) {
							this.listNum = -1;
						}
						if(this.listNum < 0) {
							this.listNum = -1
						}

						this.listNum = this.listNum + 1;
						audio.src = this.musicData[this.listNum].url;
						audio.setAttribute('dataNum',this.listNum);
						this.playNum = audio.getAttribute('datanum') - 0;
						listLis[this.playNum - 0].setAttribute('class','playing');
						// console.log(this.playNum);
						this.getLrc1();
						musicShowName.innerHTML = this.musicData[this.listNum].name + ' - ' + this.musicData[this.listNum].singer;
						this.getMusicTime();
						this.ifplay = true;
						this.playmusic();
				}
			},
			//顺序播放
			orderplay() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let audio = document.getElementById('audios');
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				this.orderNum = audio.getAttribute('dataNum') - 0;
				if(event.currentTarget.getAttribute('id') == 'prev') {

					if(this.orderNum <= 0) {
						this.orderNum = 0;

					}else {
						this.orderNum = this.orderNum - 1;
					}

					audio.src = this.musicData[this.orderNum].url;
					audio.setAttribute('dataNum',this.orderNum);
					this.playNum = audio.getAttribute('datanum') - 0;
					musicShowName.innerHTML = this.musicData[this.orderNum].name + ' - ' + this.musicData[this.orderNum].singer;
					this.getMusicTime();
					this.ifplay = true;
					listLis[this.playNum - 0].setAttribute('class','playing');
					// console.log(this.playNum);
					this.getLrc1();
					this.playmusic();
				}else if(event.currentTarget.getAttribute('id') == 'next' || this.ends == true) {

						if(this.orderNum >= this.musicData.length - 1) {
							this.orderNum = this.musicData.length - 1;
						}else {
							this.orderNum = this.orderNum + 1;
						}

						audio.src = this.musicData[this.orderNum].url;
						audio.setAttribute('dataNum',this.orderNum);
						this.playNum = audio.getAttribute('datanum') - 0;
						listLis[this.playNum - 0].setAttribute('class','playing');
						// console.log(this.playNum);
						this.getLrc1();
						musicShowName.innerHTML = this.musicData[this.orderNum].name + ' - ' + this.musicData[this.orderNum].singer;
						this.getMusicTime();
						this.ifplay = true;
						this.playmusic();
				}
			},
			// 随机播放
			randomplay() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let audio = document.getElementById('audios');
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				if(event.currentTarget.getAttribute('id') == 'prev') {

					if(this.randomNum == 0) {
						this.randomNum = this.musicData.length;
					}
					if(this.randomNum < 0) {
						this.randomNum = -1
					}

					this.randomNum = this.randomNum - 1;this.playNum = audio.getAttribute('datanum') - 0;
					audio.src = this.musicData[this.randomNum].url;
					audio.setAttribute('dataNum',this.randomNum);
					this.playNum = audio.getAttribute('datanum') - 0;
					listLis[this.playNum - 0].setAttribute('class','playing');
					this.getLrc1();
					musicShowName.innerHTML = this.musicData[this.randomNum].name + ' - ' + this.musicData[this.randomNum].singer;
					this.getMusicTime();
					this.ifplay = true;
					this.playmusic();
				}else if(event.currentTarget.getAttribute('id') == 'next' || this.ends == true) {

						if(this.randomNum == this.musicData.length - 1) {
							this.randomNum = -1;
						}
						if(this.randomNum < 0) {
							this.randomNum = -1
						}

						this.randomNum = this.randomNum + 1;
						audio.src = this.musicData[this.randomNum].url;
						audio.setAttribute('dataNum',this.randomNum);
						this.playNum = audio.getAttribute('datanum') - 0;
						listLis[this.playNum - 0].setAttribute('class','playing');
						this.getLrc1();
						musicShowName.innerHTML = this.musicData[this.randomNum].name + ' - ' + this.musicData[this.randomNum].singer;
						this.getMusicTime();
						this.ifplay = true;
						this.playmusic();
				}
			},
			// 单曲循环
			oneplay() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let audio = document.getElementById('audios');
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				if(event.currentTarget.getAttribute('id') == 'next' || event.currentTarget.getAttribute('id') == 'prev' || this.ends == true) {
					// console.log(this.playNum);
					this.oneNum = audio.getAttribute('dataNum');
					audio.src = this.musicData[this.oneNum].url;
					audio.setAttribute('dataNum',this.oneNum);
					this.playNum = audio.getAttribute('datanum') - 0;
					listLis[this.playNum - 0].setAttribute('class','playing');
					this.getLrc1();
					musicShowName.innerHTML = this.musicData[this.oneNum].name + ' - ' + this.musicData[this.oneNum].singer;
					this.getMusicTime();
					this.ifplay = true;
					this.playmusic();
				}
			},
			// 切换歌曲
			musicclick() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				for(var i=0; i<this.musicData.length; i++) {
					listLis[i].setAttribute('class','');
				}

				if(this.ifcut == 0) {
					//顺序播放
					this.orderplay()
				}else if (this.ifcut == 1) {
					//随机播放
					this.randomNum = parseInt(Math.random() * this.musicData.length);
					this.randomplay();
				}else if (this.ifcut == 2) {
					//单曲循环
					this.oneplay()
				}else {
					//列表循环
					this.listplay()
				}

			},
			// 列表滚动
			listWell() {
				let that = this;
				let listUl = document.getElementsByClassName('play-list-ul')[0];
				let musicPlayList = document.getElementsByClassName('music-play-list')[0];
				// listUl.style.height = '2760' + 'px';
				listUl.onmousewheel = function(e) {
					if(e.wheelDelta < 0) {
						//向上滚动
						that.scrollPageY += 60;
					}
					else if(e.wheelDelta > 0) {
						//向下滚动
						that.scrollPageY -= 60;
					}

					if(that.scrollPageY <= -60) {
						that.scrollPageY = -60;
					}
					if(that.scrollPageY >= listUl.offsetHeight - musicPlayList.offsetHeight + 60) {
						that.scrollPageY = listUl.offsetHeight - musicPlayList.offsetHeight + 60;
					}

					listUl.style.top = -that.scrollPageY + 'px';
				}
			},
			// 列表点击
			listClick() {
				let audiosUrl = escape(document.getElementById('audios').src);
				let this_ = event.currentTarget;
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				if(event.currentTarget.getAttribute('num')) {
					document.getElementById('audios').setAttribute('dataNum',event.currentTarget.getAttribute('num'));
					this.playNum = event.currentTarget.getAttribute('num');
					this.audioUrl = this.musicData[event.currentTarget.getAttribute('num')].url;
				}else {

				}
				if(audiosUrl == escape(this.audioUrl)) {
					// this.ifplay = !this.ifplay;
					this_.setAttribute('class','playing');
					this.playmusic();
				}else {
					document.getElementById('audios').src = this.audioUrl;
					this.ifplay = true;
					musicShowName.innerHTML = this.musicData[this_.getAttribute('num')].name + ' - ' + this.musicData[this_.getAttribute('num')].singer
					for(var i=0; i<this.musicData.length; i++) {
						listLis[i].setAttribute('class','');
					}
					this_.setAttribute('class','playing');
					this.playmusic();
				}
			},
			// 第二列表点击
			li2click() {
				// 监听我的音乐列表是否被点击
				let audio = document.getElementById('audios');
				let musicshowname = document.getElementsByClassName('music-show-name')[0];
				let thisurl = event.currentTarget.getAttribute('datasrc');
				let thisnum = event.currentTarget.getAttribute('num');

				audio.src = thisurl;
				musicshowname.innerHTML = this.dragObj[thisnum].name + ' - ' + this.dragObj[thisnum].singer
			},
			// 获得列表第一首歌信息
			firstGet() {
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				let audios = document.getElementById('audios');
				let that = this;
				document.getElementsByClassName('music-play-list')[0].style.height = window.innerHeight - 75 + 'px';
				audios.src = this.newData[0].url;
				musicShowName.innerHTML = this.newData[0].name +' - '+ this.newData[0].singer;
				audios.addEventListener('canplaythrough',function() {
					that.timeActive();

				})
				that.getLrc1();
			},
			// 获取到歌词
			getLrcFile(val) {
				// music/
				axios.get('../../static/lrc/'+ val +'.lrc').then((response) => {
						if(response.data == "纯音乐,请欣赏") {
							this.lrctoshow1(response.data);
						}else {
							this.lrcData = response.data;
							this.parseLyric(this.lrcData);
						}

				},(response) => {
					this.lrcData = '未找到歌词';
				})
			},
			//解析歌词
			parseLyric(lrc) {
					this.lrcObj = {};
					this.lrctime = {};
			    var lyrics = lrc.split("\n");
			    for(var i=0;i<lyrics.length;i++){
			        var lyric = decodeURIComponent(lyrics[i]);
							// console.log(lyric)
			        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
			        var timeRegExpArr = lyric.match(timeReg);

			        if(!timeRegExpArr)continue;
			        var clause = lyric.replace(timeReg,'');
							// clause = clause.split(',');
							// console.log(clause);
							// for(var j=0; j<clause.length; j++) {
							// 	if(clause[j] == '' || clause[j]==null || typeof(clause[j]) == undefined) {
							// 		clause.splice(j,1);
							// 		j = j-1;
							// 	}
							// }
							// console.log(clause);
							this.lrcObj[i] = clause;
							timeRegExpArr.toString();
							// timeRegExpArr = timeRegExpArr.replace(/\[|]/g,'')
							this.lrctime[i] = timeRegExpArr;
							// console.log(this.lrcObj);
			        // for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
			        //     var t = timeRegExpArr[k];
			        //     var min = Number(String(t.match(/\[\d*/i)).slice(1)),
			        //         sec = Number(String(t.match(/\:\d*/i)).slice(1));
			        //     var time = min * 60 + sec;
							// 		// console.log(min,sec)
			        //     this.lrcObj[time] = clause + clause;
							// 		// console.log(this.lrcObj[time]);
			        // }
			    }
					this.lrctoshow();
			},
			//歌词显示
			lrctoshow() {
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				lrcUl.innerHTML = ' ';
				// console.log(this.lrcObj);
				for(var k in this.lrcObj) {
					let lrcLi = document.createElement('li');
					lrcLi.innerHTML = this.lrcObj[k];
					// console.log(typeof(this.lrctime[k].toString()));
					this.lrctime[k] = this.lrctime[k].toString().replace(/\[|]/g,'');
					var Temp = this.lrctime[k].split(':')
					this.lrcsecond = 60 * Number(Temp[0]) + 1 * Number(Temp[1]);
					this.lrcsecond = Math.round(this.lrcsecond);
					lrcLi.setAttribute('time',this.lrcsecond);
					lrcLi.setAttribute('ifchoose','false');
					lrcUl.appendChild(lrcLi);
				}
				lrcUl.setAttribute('move',true);
				lrcUl.style.top = musicLrc.offsetHeight / 2 + 50 + 'px';
			},
			//当为纯音乐时显示
			lrctoshow1(val) {
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				lrcUl.innerHTML = ' ';
				let lrcLi = document.createElement('li');
				lrcLi.innerHTML = val;
				lrcUl.appendChild(lrcLi);
				lrcUl.setAttribute('move',false);
				lrcUl.style.top = '45%';
			},
			//点击列表获取歌词
			getLrc() {
				let lrcUl = document.getElementsByClassName('lrc-ul')[0];
				this.ulTop = lrcUl.offsetTop;
				this.lrcName = event.currentTarget.getAttribute('musicName');
				this.getLrcFile(this.lrcName);
			},
			//音乐播放完成自动获取下一首歌词
			getLrc1() {
				this.lrcName = this.musicData[this.playNum].name;
				this.getLrcFile(this.lrcName);
			},
			//歌词  波形切换 被禁用
			showlrc() {
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				let musicWave = document.getElementsByClassName('music-wave')[0];
				// musicLrc.style.display = 'block';
				// musicWave.style.display = 'none';
			},
			//歌词  波形切换 被禁用
			showwave() {
				let musicLrc = document.getElementsByClassName('music-lrc')[0];
				let musicWave = document.getElementsByClassName('music-wave')[0];
				// musicLrc.style.display = 'none';
				// musicWave.style.display = 'block';
			},
      //歌曲拖拽
      dropmusic() {
			let that = this;
	        document.addEventListener("dragover",function(e) {
	          e.preventDefault();
	          // console.log('22');
	        });
	        document.addEventListener("drop",function(e) {
	          let playlistul = document.getElementsByClassName('list-ul2')[0];
						let musicfile = document.getElementById('input-file');
	          e.preventDefault();
	          for(var i=0; i<e.dataTransfer.files.length; i++) {
	            let playli = document.createElement('li');
	            let span = document.createElement('span');
	            // span.innerHTML = i+1 + '.';
	            let liName = e.dataTransfer.files[i].name.substring(0,e.dataTransfer.files[i].name.lastIndexOf('.'));
	            // that.dragObj[0].name = liName.split('-')[1].trim()
							// console.log(that.dragObj)
							// that.dragObj[i].singer = liName.split('-')[0].trim()
	            // playli.innerHTML = liName;
	            // playli.setAttribute('musicname',liName.split('-')[1].trim())
	            // playli.insertBefore(span,playli.firstChild);
	            // playlistul.insertBefore(playli,playlistul.firstChild);
							let objUrl = window.URL.createObjectURL(e.dataTransfer.files[i]);
							// that.dragObj[i].url = objUrl;
							that.dragObj.push({name: liName.split('-')[1].trim(), singer: liName.split('-')[0].trim(),url: objUrl})
							// console.log(that.dragObj)
	          }
	          // let playlistli = document.getElementsByClassName('list-ul2')[0].children;
	          // for(var j=0; j<playlistli.length; j++) {
	          //   playlistli[j].setAttribute('num',j);
	          //   playlistli[j].children[0].innerHTML = j+1 + '.';
	          // }
						that.inputfile(e.dataTransfer.files)
						that.showheader2();
	        });
      },
			//列表信息自动刷新 暂时废弃
			inputfile(file) {
					// let filelist = event.currentTarget.files;
					// let playlistul = document.getElementsByClassName('list-ul2')[0];
					// let that = this;
					// for(var i=0; i<file.length; i++) {
					// 	let files = file[i];
					// 	// readFile(files);
					// 	playlistul.children[i].setAttribute('datasrc',that.dragObj[i].url);
					// }
					// function readFile(files) {
					// 	var reader = new FileReader();
					// 	reader.readAsDataURL(files);
					// 	// console.log(reader.readyState);
					// 	// reader.onprogress = function(e) {
					// 	// 	console.log(e);
					// 	// }
					// 	reader.onload = function(e) {
					// 		// that.dragsrc = e.target.result;
					// 	}
					// }
			},
			// playlist点击
			headerlist() {
				let headerul = document.getElementsByClassName('list-header-ul')[0];
				if(this.headerul == 0) {
					headerul.style.display = 'block';
					this.headerul = 1;
				}else {
					headerul.style.display = 'none';
					this.headerul = 0;
				}
			},
			// 推荐音乐
			showheader1() {
				let headerul = document.getElementsByClassName('list-header-ul')[0];
				let listul1 = document.getElementsByClassName('play-list-ul')[0];
				let listul2 = document.getElementsByClassName('list-ul2')[0];
				headerul.children[1].setAttribute('class','');
				headerul.children[0].setAttribute('class','choose');
				listul1.style.left = '0px';
				listul2.style.left = '-230px';
			},
			// 我的音乐
			showheader2() {
				let headerul = document.getElementsByClassName('list-header-ul')[0];
				let listul2 = document.getElementsByClassName('list-ul2')[0];
				let listul1 = document.getElementsByClassName('play-list-ul')[0];
				headerul.children[0].setAttribute('class','');
				headerul.children[1].setAttribute('class','choose');
				listul2.style.left = '0px';
				listul1.style.left = '-230px';
			}
		},
		mounted() {
			this.getMusicData();
			this.getMusicTime();
			this.listWell();
      this.dropmusic();
			let audio =  document.getElementById('audios');
			let listLis = document.getElementsByClassName('play-list-ul')[0].children;
			let musicTop = document.getElementsByClassName('music-top')[0];
			let musicLrc = document.getElementsByClassName('music-lrc')[0];
			let musicWave = document.getElementsByClassName('music-wave')[0];
			let playList = document.getElementsByClassName('music-play-list')[0];
			let that = this;
			document.addEventListener('click',function() {
				let headerul = document.getElementsByClassName('list-header-ul')[0];
				headerul.style.display = 'none';
				that.headerul = 0;
			})

			// 监听音乐是否结束
			audio.addEventListener('timeupdate',function() {
				if(audio.ended) {
					for(var i=0; i<that.musicData.length; i++) {
						listLis[i].setAttribute('class','');
					}
					if(that.ifcut == 0) {
						//顺序播放
						that.ends = true;
						that.orderplay()

					}else if (that.ifcut == 1) {
						//随机播放
						that.ends = true;
						that.randomNum = parseInt(Math.random() * that.musicData.length);
						that.randomplay();

					}else if (that.ifcut == 2) {
						//单曲循环
						that.ends = true;
						that.oneplay();
					}else {
						//列表循环
						that.ends = true;
						that.listplay();
					}
				}
			});

			that.timeActive();

			// 加载完成 界面宽度自适应
			musicTop.style.width = window.innerWidth + 'px';
			musicLrc.style.height = window.innerHeight - 85 - 100 + 'px';
			musicLrc.style.height = musicLrc.offsetHeight + 50 + 'px';
			musicWave.style.height = window.innerHeight - 85 - 100 + 'px';

			// 浏览器宽高度改变 自适应
			window.addEventListener('resize',function() {
				if(playList.style.transform == 'translate(0px)') {
					musicTop.style.width = window.innerWidth - 232 + 'px';
					musicLrc.style.height = window.innerHeight - 85 - 100 + 'px';
					// console.log('yes')
				}else {
					musicTop.style.width = window.innerWidth + 'px';
					musicLrc.style.height = window.innerHeight - 85 - 100 + 'px';
					musicLrc.style.height = musicLrc.offsetHeight + 50 + 'px';
				}
				// musicLrc.style.height = window.innerHeight - 85 - 100 + 'px';
				musicWave.style.height = window.innerHeight - 85 - 100 + 'px';
			})

			//按下空格暂停/播放
			document.onkeydown = function(e) {
				if(e && e.keyCode == 32) {
					that.playmusic();
				}
			}
		},
		watch: {
				lrcData: function(val,oldVal) {

				},
				musicData : function(val,oldVal) {
					this.newData = val;
					this.firstGet();
					this.getMusicTime();
					let that = this;
					document.oncontextmenu = function(e) {
						e.returnValue=false;
				    that.showmy();
				  }
				},
				dragObj: function(val,oldVal) {
				}
				// '$route' (to,from) {
		    //   if(to.path == '') {
		    //     this.tabAnimation = 'slide-right'
		    //   }else {
		    //     this.tabAnimation = 'slide-left'
		    //   }
		    // }
		}
	}
</script>

<style>
	/*@import "../style/lrc.css";
	@import "../style/wave.css";*/
</style>
<style>
  .file {
    position: fixed;
    top: 0;
    left: 0;
  }

  .hidden {
    display: none;
  }

	.music-lrc {
			position: absolute;
			width: 100%;
			top: 85px;
			left:0;
			bottom: 75px;
			overflow: hidden;
		}

	.lrc-ul {
		width: 480px;
		height: auto;
		position: absolute;
		left: 50%;
		margin-left: -240px;
		top: 10%;
		transition: all .6s;
	}

	.lrc-ul li {
		padding: 5px 0px;
		font-size: 18px;
		height: auto;
		box-sizing: border-box;
		cursor: pointer;
		transition: all .3s;
		font-weight: bold;
		font-family: cursive,Monaco;
	}

	.lrc-ul .playing {
		color: black;
		font-size: 20px;
	}

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

	.music-top {
		transition: top .3s;
		border-radius: 5px;
		position: fixed;
		right: 2px;
		top: -63px;
		/*left: 2px;*/
		/*margin-left: 2px;*/
		width: auto;
		height: 61px;
		margin-top: 3px;
		min-width: 225px;
		box-shadow: 2px 0 2px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.2);
	}

	.music-top>ul {
		width: 100%;
		height: 100%;
	}

	.music-top>ul>li {
		float: left;
		line-height: 61px;
		width: 50%;
		height: 100%;
		text-align: center;
		box-sizing: border-box;
		background: rgba(64,64,64,0.5);
		transition: all .3s;
		position: relative;
		border-radius: 5px;
	}

	.music-top>ul>li:hover {
		background: rgba(64,64,64,0.7);
	}

	.music-top>ul .top-one {
		padding-left: 10%;
		border-right: 1px solid rgba(249, 159, 76, 0.9);
		/*background-color: linear-gradient(to left,rgba(80,80,80,0.6) 50%,rgba(64,64,64,0.6) 100%);
		background-color: -webkit-linear-gradient(left,rgba(80,80,80,0.6),rgba(64,64,64,0.6));
		background-color: -o-linear-gradient(left,rgba(80,80,80,0.6),rgba(64,64,64,0.6));
		background-color: -moz-linear-gradient(left,rgba(80,80,80,0.6),rgba(64,64,64,0.6));*/
	}

	.music-top>ul .top-two {
		padding-right: 10%;
		padding-left: 0;
		border-left: 1px solid rgba(249, 159, 76, 0.9);
		/*background-color: linear-gradient(right,rgba(80,80,80,0.9),rgba(64,64,64,0.9));
		background-color: -webkit-linear-gradient(right,rgba(80,80,80,0.9),rgba(64,64,64,0.9));
		background-color: -o-linear-gradient(right,rgba(80,80,80,0.9),rgba(64,64,64,0.9));
		background-color: -moz-linear-gradient(right,rgba(80,80,80,0.9),rgba(64,64,64,0.9));*/
	}

	.music-top ul li a {
		font-family: 'KaiTi';
		color: white;
		font-size: 18px;
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
		cursor: pointer;
	}

	.music-play-list {
		border-radius: 5px;
		position: absolute;
		bottom: 75px;
		width: 230px;
		height: auto;
		/*top:1px;*/
		transform: translate(-230px);
		z-index: 100;
		overflow: hidden;
		border: 1px solid gray;
		box-sizing: border-box;
		background: rgba(64, 64, 64, 0.3);
		transition: transform .3s;
		box-shadow: 2px 0 2px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.2);
	}

	.play-list-header {
		width: 100%;
		box-sizing: border-box;
		padding: 15px;
    font-size: 20px;
    color: #f1f1f1;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid #202020;
    box-shadow: 0 0 5px #000, inset 0 0 5px rgba(255, 255, 255, 0.2);
    text-align: center;
    background-color: rgba(238,173,91,1);
    cursor: pointer;
		position: absolute;
		z-index: 99;
		border-radius: 5px;
		transition: all .3s;
	}

	.play-list-header:hover {
		background-color: rgba(238,160,70,1);
	}

	.list-header-ul {
		position: absolute;
		top: 61px;
		font-size: 16px;
		left: 0;
		width: 100%;
		z-index: 100;
		display: none;
	}

	.list-header-ul li {
		text-align: center;
		background: rgba(0,0,0,0.5);
		border-radius: 5px;
		transition: all .1s;
		cursor: pointer;
	}

	.list-header-ul li:hover {
		background: rgba(238, 171, 81, 0.5);
	}

	.list-header-ul .choose {
		background: rgba(238, 171, 81, 0.5);
	}

	.list-header-ul li:first-child {
		border-bottom: 1px solid rgba(255,255,255,0.3);
	}

	.list-ul2 {
		left: -230px;
	}



	.list-ul {
		width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    opacity: 0.8;
    /*max-height: calc(100% - 60px);*/
		height: auto;
		position: absolute;
		transition: all .3s;
		top: 60px;
		z-index: 50;
	}

	.list-ul li {
		border-bottom: 1px solid #555;
    padding: 15px;
    color: #fff;
    font-size: 15px;
    width: 100%;
		/*height: 100%;*/
    cursor: pointer;
    word-break: break-all;
    transition: background-color 0.3s;
    box-sizing: border-box;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
		z-index: 50;
	}

	.list-ul li span {
		float: left;
		font-size: 16px;
	}

	.list-ul li:hover {
		background-color: #aaa;
    color: rgb(212, 70, 111);
    box-shadow: inset -1px 0 2px rgba(255, 255, 255, 0.8);
	}

	.list-ul .playing {
		color: rgb(212, 70, 111);
    background-color: skyblue !important;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 1) !important;
	}

	.music {
		height: 75px;
		left: 0;
		width: 100%;
		background: rgba(91, 91, 91, 0.4);
		color: white;
		text-align: center;
		position: fixed;
		bottom:0;
		z-index: 999;
	}
	.music-my {
		position: absolute;
		bottom: 75px;
		width:700px;
		height: 610px;
		left: -200%;
		margin-left: -350px;
		background: rgba(110, 168, 245, 0.8);
		transition: all .6s ease-out;
		font-family: 'KaiTi';
		color:white;
		overflow: hidden;
	}

	.music-myname {
		font-size: 24px;
		width: 100%;
		padding: 0 5%;
		/*margin:0 auto;*/
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		background: rgb(25,60,120);
		position: relative;
		z-index: 99;
		font-family: 'KaiTi';
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently*/
	}

	.music-begin {
		float: left;
		margin-left: 8%;
		cursor: pointer;
		font-family: 'KaiTi';
	}

	.music-begin a {
		display: none;
	}

	.music-No {
		width: 35px;
		position: absolute;
		left: 10px;
	}

	.music-down {
		float: left;
		position: absolute;
		right: 21px;
	}

	.music-down a {
		color: rgba(255,255,255,0.7);
	}

	.music-down a:hover {
		color: orange;
	}

	.music-line {
		position: absolute;
		right: 60px;
		color: white!important;
	}

	.music-begin:hover {
		color:orange!important;
	}

	.music-text {
		float: left;
		width:295px;
		height:100%;
		text-align: center;
	}

	.music-master {
		float: left;
		width:200px;
		height:100%;
		text-align: center;
		margin-left: 2%;
	}

	.music-ul {
		width: 700px;
		height: auto;
		/*overflow: hidden;*/
		position: relative;
		z-index: 10;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently*/
		/*box-sizing: border-box;*/
	}

	.music-scroll {
		position: absolute;
		width:15px;
		height:570px;
		right:0px;
		top:40px;
		background: #eaeaea;
		z-index: 99;
	}

	.music-scrollbar {
		position: absolute;
		width:100%;
		height:80px;
		top:0;
		left:0;
		background: rgba(55, 114, 246,0.8);
		cursor: pointer;
		transition: color .3s;
	}

	.music-scrollbar:hover {
		background: rgba(55, 114, 246,0.9);
	}

	.music-li {
		width:100%;
		height:40px;
		line-height: 40px;
		font-size: 16px;
		padding-left: 30px;
		position: relative;
		box-sizing: border-box;
		font-family: 'KaiTi';
	}

	.music audio {
		width:300px;
		height:60px;
	}

	.music-wrap {
		width:910px;
		height:40px;
		position: absolute;
		top:50%;
		left:50%;
		margin-left: -455px;
		margin-top: -20px;
	}

	.music-btn {
		width: 135px;
		height:100%;
		float: left;
	}

	.music .c-btn {
		background: url('../assets/player.png');
		display: block;
		float: left;
		width:19px;
		height:20px;
		margin-top: 10px;
		cursor: pointer;
		opacity: 0.8;
		transition: opacity .2s;
		/*position: absolute;*/
	}

	.music .c-btn:hover {
		opacity: 1;
	}

	.music .prev {
		background-position: 0 -30px;
		margin-right: 32px;
	}

	.music .play {
		width:21px;
		height:29px;
		background-position: 0 0;
		margin-top: 6px;
		margin-right: 30px;
	}

	.music .pause {
		width:21px;
		height:29px;
		background-position: -30px 0;
		margin-top: 6px;
		margin-right: 30px;
	}

	.music .next {
		background-position: 0 -52px;
	}

	.music-show {
		width:450px;
		height:100%;
		float: left;
		margin-left: 25px;
		margin-top: -5px;
		/*position: relative;*/
		user-select: none;
	}

	.music-name {
		font-size: 16px;
		text-align: left;
		margin-bottom: 5px;
		bottom:5px;
		font-family: 'KaiTi';
		position: relative;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently*/
	}

	.music-time {
		position: absolute;
		right:0;
		top:0;
		z-index: 100;
	}

	.music-show-name {
		z-index: 60;
		max-width: 350px;
		height: 30px;
		word-break:keep-all;/* 不换行 */
		white-space:nowrap;/* 不换行 */
		overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
	}

	.music-time span {
		font-family: 'KaiTi','-webkit-pictograph';
		font-size: 17px;
	}

	.music-bar {
		width:450px;
		height:2px;
		bottom:-5px;
		background: rgba(135, 129, 130,0.8);
		position: absolute;
		bottom: 5px;
		cursor: pointer;
	}

	.music-plan {
		position: absolute;
		width:0;
		height:2px;
		background: white;
	}

	.music-drag {
		position: absolute;
		width:12px;
		height:12px;
		border-radius: 50%;
		background: white;
		left:0;
		top:-5px;
		cursor: pointer;
	}

	.music-order {
		float: left;
		height:100%;
		width:35px;
		margin-left: 25px;
	}

	.music-order .order-play {
		display: block;
		width:23px;
		height:20px;
		background-position: 0 -260px;
	}

	.music-order .random-play {
		display: block;
		width:25px;
		height:19px;
		background-position: 0 -74px;
	}

	.music-order .one-play {
		display: block;
		width:26px;
		height:25px;
		background-position: 0 -232px;
	}

	.music-order .list-play {
		display: block;
		width:26px;
		height:25px;
		background-position: 0 -205px;
	}

	.music-vol {
		width:130px;
		height:100%;
		float: left;
		margin-left: 10px;
		margin-top: -1px;
	}

	.music-vol .vol-btn {
		width:26px;
		height:21px;
		background-position: 0 -144px;
		margin-top: 12px;
		float: left;
	}

	.music-vol .vol-close {
		width:26px;
		height:21px;
		background-position: 0 -182px;
		margin-top: 12px;
		float: left;
	}

	.music-vol .vol-bar {
		position: relative;
		width:90px;
		height:2px;
		background: rgba(135, 129, 130,0.8);
		float: left;
		margin-top: 20px;
		margin-left: 5px;
		cursor: pointer;
	}

	.vol-bar .vol-plan {
		width:90px;
		height:2px;
		background-color: white;
		position: absolute;
	}

	.music-vol .vol-bar-btn {
		position: absolute;
		width:12px;
		height:12px;
		border-radius: 50%;
		background: white;
		top:-5px;
		left:90px;
		cursor: pointer;
	}

	.music-list {
		width:59px;
		height:36px;
		float: left;
		margin-left: 20px;
	}

	.music-list-img {
		background: url('http://ogm5at7ve.bkt.clouddn.com/playbar.png');
		background-position: -42px -68px;
		float: none;
		width:38px;
		text-align: center;
		color:rgba(255,255,255,0.8);
		display: block;
		height:25px;
		margin: 5px 0 0 10px;
		padding-left: 21px;
		font-size: 15px;
		line-height: 26px;
		cursor: pointer;
		transition: color .2s;
		font-family: 'KaiTi';
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently*/
	}

	.music-list-img:hover {
		 background-position: -42px -98px;
		 color: white;
	}
</style>
