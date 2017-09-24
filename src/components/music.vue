<template>
	<div class="music">
		<audio id="audio" ref='audio' crossOrigin="anonymous" dataNum=0 ></audio>
    <input type="file" accept='audio/mp3' id='input-file' class='hidden file'>
		<div class="show-title show-title-hide" id="show-title">
			顺序播放
		</div>
		<div class="music-wrap">
			<div class="music-btn">
				<a class="c-btn prev" id="prev" title="上一首" v-on:click='whatKind2()'></a>
				<a class="c-btn" title="播放/暂停" :class="ifPlay?'play':'pause'" v-on:click='playMusic()'></a>
				<a class="c-btn next" id="next" title="下一首" v-on:click='whatKind()'></a>
			</div>
			<div class="music-show">
				<div class="music-name">
					<div class="music-show-name" ref='showname'>
					</div>
					<div class="music-time"><span class="time-second" ref='curtime'>00:00</span>/<span class="time-all" ref='alltime'>00:00</span></div>
				</div>
				<div class="music-bar" v-on:click='planClick'>
					<div class="music-plan">
					</div>
					<div class="music-drag" v-on:mousedown.stop='planDrag'></div>
				</div>
			</div>
			<div class="music-order">
				<a class="c-btn order-play" v-on:click='cutOrder()' :class='this.orderClass'></a>
			</div>
			<div class="music-vol">
				<a class="c-btn vol-btn" v-on:click='closeVol' :class="ifVol ? 'vol-close' : 'vol-btn'"></a>
				<div class="vol-bar" v-on:click='volClick'>
					<div class="vol-plan"></div>
					<div class="vol-bar-btn" v-on:mousedown.stop='volDrag'>
					</div>
				</div>
			</div>
			<div class="music-list">
				<a class="music-list-img" v-on:click='showList()'></a>
			</div>
		</div>
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
		<div class="music-top" ref='musictop'>
			<ul>
				<li class="top-one" v-on:click='showLrcDiv()'><a>lyric</a></li>
				<li class="top-two" v-on:click='showWaveDiv()'><a>waveform</a></li>
			</ul>
			<div class="choose-img">
				<span class="imgurl choose1" imgurl='http://oht4at73h.bkt.clouddn.com/new1.png'></span>
				<span class="img-line"></span>
				<span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new7.png'></span>
				<span class="img-line"></span>
				<span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new6.png'></span>
				<span class="img-line"></span>
				<span class="imgurl" imgurl='http://oht4at73h.bkt.clouddn.com/new2.png'></span>
				<span class="img-line"></span>
				<span class="imgurl" imgurl='http://ogm5at7ve.bkt.clouddn.com/7.jpg'></span>
			</div>
				<div class="music-lrc" ref='musiclrc'>
			    <ul class='lrc-ul' ref='lrcul'>
						<li>请选择歌曲</li>
			    </ul>
			  </div>
				<div class="music-wave" ref='musicwave'>
						<canvas id="canvas" :width='this.waveWidth+120'  :height='this.waveHeight'  ></canvas>
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
				musicData:[], //音乐数组
				dragData:[],  //拖拽数组
				dragLrc: [],  //拖拽歌词数组
				dragMusicUrl: [],
				waveWidth: 0,
				waveHeight: 0,
				c1: 'rgb(188,140,190)',
				c2: 'rgb(78,100,164)',
				c3: 'rgb(35,32,43)',
				cutHeight:0,
				listShow: 0,  //列表显示判断
				listScroll: 0,//列表滚动位置
				barScroll:0,  //滚动条
				listScroll2: 0, //列表2滚动位置
				barTop:0,
				ifPlay: true, //是否播放
				ifVol: 0,     //是否静音
				volScales: 1, //音量大小默认为1
				planScales: 0,//进度默认为0
				ifCut: 0,     //顺序切换
				orderClass: 'order-play',  //默认播放顺序
				volLeft: 0,   //音量位置
				musicLeft: 0, //进度位置
				curTime: 0,   //当前音乐时间
				ifHeader: 0,  //是否显示切换列表按钮
				audioUrl: null,//记录音乐链接
				playNum: 0,   //记录当前音乐索引
				dragNum: 0,   //拖拽音乐索引
				lrcData: [],  //歌词数组
				lrcObj: {},   //歌词
				lrcTime: {},  //歌曲时间轴
				lrcSecond: 0, //歌词毫秒数
				resizeHeight: 0,
				ifMy: 0,      //判断是在哪个播放列表
				myScroll:0,
				scrollProp:0
			}
		},
		methods: {
			//获得音乐json文件
			getMusicData() {
				axios.get('http://lesses.me/music/static/music.json').then((response) => {
					this.musicData = response.data;
				},(response) => {
					console.log('失败');
				})
			},
			//音乐拖拽
			dragMusic() {
				let that = this;
				document.addEventListener("dragover",function(e) {
          e.preventDefault();
        });
				document.addEventListener('drop',function(e) {
					e.preventDefault(); //阻止默认事件
					let thisFiles = e.dataTransfer.files
					for(var i=0; i<thisFiles.length; i++) {
						let thisIndex = thisFiles[i].name.lastIndexOf('.');
						let ext = thisFiles[i].name.substr(thisIndex + 1);
						if(ext == 'mp3') {
							let dragName = thisFiles[i].name.substring(0,thisFiles[i].name.lastIndexOf('.'));
							let dragUrl = window.URL.createObjectURL(thisFiles[i]);
							that.dragData.push({name: dragName.split('-')[1].trim(), singer: dragName.split('-')[0].trim(),url: dragUrl});
							}
						}
						that.clearRepeat(that.dragData,'name');
					  that.showList2();
				})
			},
			//通过input得到歌曲
			getInput() {
				let thisFiles = event.currentTarget.files;
				let thisIndex = thisFiles[0].name.lastIndexOf('.');
				let ext = thisFiles[0].name.substr(thisIndex + 1);
				if(ext == 'mp3') {
					let dragName = thisFiles[0].name.substring(0,thisFiles[0].name.lastIndexOf('.'));
					let dragUrl = window.URL.createObjectURL(thisFiles[0]);
					this.dragData.push({name: dragName.split('-')[1].trim(), singer: dragName.split('-')[0].trim(),url: dragUrl});
					// console.log(this.dragData);
				}
				this.clearRepeat(this.dragData,'name');
				this.showList2();
			},
			//数组对象根据键值去重
			clearRepeat(arr,key) {
				let res = [];
				let obj = {};
				for(var i=0; i<arr.length; i++) {
					if(!obj[arr[i][key]]) {
						obj[arr[i][key]] = [arr[i]];
						res.push(arr[i]);
					}else {
						obj[arr[i][key]].push(arr[i]);
					}
				}
				this.dragData = res;
				this.saveMusic();
			},
			//获得歌词
			getLrcFile(n) {
				// ../../music/static/lrc/ 打包请修改
				if(this.$refs.listul2.getAttribute('myplay') == 'false') {
					axios.get('../../music/static/lrc/'+ n + '.lrc').then((response) => {
						if(response.data == '纯音乐,请欣赏' || response.data == '后摇,请欣赏') {
							this.lrcData = response.data;
							this.showLrc();
						}else {
							this.lrcData = response.data;
							//得到歌词 开始解析
							this.parseLyric(this.lrcData);
							// console.log('yes')
						}
					},(response) => {
						this.lrcData = '未找到歌词'
					})
				}else {
					this.dragLrc = '未找到歌词';
					this.showLrc();
				}
			},
			//解析歌词
			parseLyric(lrc) {
				//每次获得数据先清除
				this.lrcObj = {};
				this.lrcTime = {};
				let lyrics = lrc.split("\n");
				for(var i=0; i<lyrics.length; i++) {
					let lyric = decodeURIComponent(lyrics[i]);
					let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
					let timeRegExpArr = lyric.match(timeReg);
					if(!timeRegExpArr)continue;
					let clause = lyric.replace(timeReg,'');
					this.lrcObj[i] = clause;
					timeRegExpArr.toString();
					this.lrcTime[i] = timeRegExpArr;
				}
				this.showLrc();
			},
			//歌词显示
			showLrc() {
				//清空歌词
				this.$refs.lrcul.innerHTML = '';
				if(this.$refs.listul2.getAttribute('myplay') == 'false') {
					if(this.lrcData == '纯音乐,请欣赏' || this.lrcData == '后摇,请欣赏') {
						let lrcli = document.createElement('li');
						lrcli.innerHTML = this.lrcData;
						this.$refs.lrcul.appendChild(lrcli);
						let pianoY = this.$refs.musiclrc.offsetHeight / 2;
						this.$refs.lrcul.style.transform = 'translateY('+ pianoY +'px)';
					}else {
						for(var k in this.lrcObj) {
							if(this.lrcObj[k] == "\n\n") {
								console.log(1);
							}
							let lrcli = document.createElement('li');
							lrcli.innerHTML = this.lrcObj[k];
							this.lrcTime[k] = this.lrcTime[k].toString().replace(/\[|]/g,'');
							let temp =  this.lrcTime[k].split(':');
							this.lrcSecond = 60 * Number(temp[0]) + 1 *  Number(temp[1]);
							this.lrcSecond = Math.round(this.lrcSecond);
							lrcli.setAttribute('time',this.lrcSecond);
							lrcli.setAttribute('ifchoose','false');
							this.$refs.lrcul.appendChild(lrcli);
						}
						for(var s=0; s<this.$refs.lrcul.children.length; s++) {
							if(this.$refs.lrcul.children[s].innerHTML == "\n\n" ) {
								this.$refs.lrcul.removeChild(this.$refs.lrcul.children[s])
							}
						}
						this.$refs.lrcul.setAttribute('move',true);
						let LRCY = this.$refs.musiclrc.offsetHeight / 2 + 50;
						this.$refs.lrcul.style.transform = 'translateY('+ LRCY +'px)';;
						// this.lrcScroll();
					}
				}else {
					let lrcli = document.createElement('li');
					lrcli.innerHTML = this.dragLrc;
					this.$refs.lrcul.appendChild(lrcli);
					this.$refs.lrcul.style.transform = 'translateY('+ pianoY +'px)';
				}
			},
			//显示歌词div
			showLrcDiv() {
				this.$refs.musiclrc.style.opacity = 1;
				this.$refs.musicwave.style.opacity = 0;
			},
			//显示波形div
			showWaveDiv() {
				this.$refs.musiclrc.style.opacity = 0;
				this.$refs.musicwave.style.opacity = 1;
			},
			//提示框显示
			showTitle(val) {
				let showTit = document.getElementById('show-title');
				let timer1 = null;
				clearTimeout(timer1)
				showTit.innerHTML = val;
				// showTit.setAttribute('class','show-title show-title-hide');
				// showTit.style.opacity = 1;
				showTit.style.transform = 'translate(-43px)';
				timer1 = setTimeout(function() {
				showTit.style.transform = 'translate(0px)';
				},3000);
			},
			// 音乐播放/暂停
			playMusic() {
				let that = this;
				for(var i=0; i<this.musicData.length; i++) {
					that.$refs.listul.children[i].setAttribute('class','');
				}
				if(that.$refs.audio!==null) {
					if(that.$refs.listul2.getAttribute('myplay') == 'false') {
						that.$refs.listul.children[that.playNum].setAttribute('class','playing');
						if(that.ifPlay) {
							that.$refs.audio.play();
							that.ifPlay = false;
						}
						else {
							that.$refs.audio.pause();
							that.ifPlay = true;
						}
					}else {
						if(that.ifPlay) {
							that.$refs.audio.play();
							that.ifPlay = false;
						}
						else {
							that.$refs.audio.pause();
							that.ifPlay = true;
						}
					}
				}
			},
			//静音
			closeVol() {
				if(this.ifVol) {
					this.ifVol = 0;
					this.$refs.audio.volume = this.volScales;
				}else {
					this.ifVol = 1;
					this.$refs.audio.volume = 0;
				}
			},
			//音量点击
			volClick(e) {
				let volBarBtn = document.getElementsByClassName('vol-bar-btn')[0];
				let volPlan = document.getElementsByClassName('vol-plan')[0];
				let musicVol = document.getElementsByClassName('music-vol')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				let volBar = document.getElementsByClassName('vol-bar')[0];
				this.volLeft = e.clientX - volBar.offsetLeft - musicWrap.offsetLeft;
				volBarBtn.style.left = this.volLeft + 'px';
				this.volScales = volBarBtn.offsetLeft / volBar.offsetWidth;
				if(this.volScales > 0) {
					document.getElementById('audio').volume = this.volScales;
					volPlan.style.width = volBar.offsetWidth * this.volScales + 'px';
					this.ifVol = 1;
					this.closeVol();
				}else if(this.volScales == 0){
					document.getElementById('audio').volume = this.volScales;
					volPlan.style.width = '0' + 'px';
					this.ifVol = 0;
					this.closeVol();
				}
			},
			//音量拖拽
			volDrag() {
				let volBarBtn = document.getElementsByClassName('vol-bar-btn')[0];
				let volBar = document.getElementsByClassName('vol-bar')[0];
				let volPlan = document.getElementsByClassName('vol-plan')[0];
				let musicVol = document.getElementsByClassName('music-vol')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				let that = this;
				document.onmousemove = function(e) {
						that.volLeft = e.clientX - volBar.offsetLeft - musicWrap.offsetLeft - volBarBtn.offsetWidth / 2;
						if(that.volLeft <= 0) {
							that.volLeft = 0;
						}
						if(that.volLeft >= volBar.offsetWidth) {
							that.volLeft = volBar.offsetWidth;
						}
						volBarBtn.style.left = that.volLeft + 'px';
						that.volScales = volBarBtn.offsetLeft / volBar.offsetWidth;
						if(that.volScales > 0) {
							document.getElementById('audio').volume = that.volScales;
							volPlan.style.width = volBar.offsetWidth * that.volScales + 'px';
							that.ifVol = 1;
							that.closeVol();
						}else if(that.volScales == 0){
							document.getElementById('audio').volume = that.volScales;
							volPlan.style.width = '0' + 'px';
							that.ifVol = 0;
							that.closeVol();
						}
					};
					document.onmouseup = function() {
						that.volScales = volBarBtn.offsetLeft / volBar.offsetWidth;
						document.onmousemove = null;
						document.onmousedown = null;
					}
			},
			//进度点击
			planClick(e) {
				let getAudio = document.getElementById('audio');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let musicShow = document.getElementsByClassName('music-show')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				this.musicLeft = e.clientX - musicWrap.offsetLeft - musicBar.offsetLeft;
				this.planScales = this.musicLeft / musicBar.offsetWidth;
				musicDarg.style.left = this.musicLeft + 'px';
				musicPlan.style.width = musicBar.offsetWidth * this.planScales + 'px';
				getAudio.currentTime = getAudio.duration * this.planScales;
				this.ifPlay = true;
				this.playMusic();
				this.curTime = Math.round(getAudio.currentTime);
				this.dragScroll();
			},
			//进度拖拽
			planDrag() {
				let getAudio = document.getElementById('audio');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let musicShow = document.getElementsByClassName('music-show')[0];
				let musicWrap = document.getElementsByClassName('music-wrap')[0];
				this.ifPlay = false;
				this.playMusic();
				let that = this;
				document.onmousemove = function(e) {
					that.musicLeft = e.clientX - musicBar.offsetLeft - musicWrap.offsetLeft - musicDarg.offsetWidth / 2;
					if(that.musicLeft <= 0) {
						that.musicLeft = 0;
					}
					if(that.musicLeft >= musicBar.offsetWidth) {
						that.musicLeft = musicBar.offsetWidth;
					}
					that.planScales = that.musicLeft / musicBar.offsetWidth;
					musicDarg.style.left = that.musicLeft + 'px';
					musicPlan.style.width = musicBar.offsetWidth * that.planScales + 'px';
				};
				document.onmouseup = function() {
					that.planScales = musicDarg.offsetLeft / musicBar.offsetWidth;
					getAudio.currentTime = getAudio.duration * that.planScales;
					that.ifPlay = true;
					that.playMusic();
					document.onmousemove = null;
					document.onmousedown = null;
					document.onmouseup = null;
					that.curTime = Math.round(getAudio.currentTime.toFixed(1));
					that.dragScroll();
					}
			},
			//顺序切换
			cutOrder() {
				if(this.ifCut == 0) {
					this.orderClass = 'random-play';
					this.ifCut = 1;
					this.showTitle("随机播放")
				}else if (this.ifCut == 1) {
					this.orderClass = 'one-play';
					this.ifCut = 2;
					this.showTitle("单曲循环")
				}else if (this.ifCut == 2) {
					this.orderClass = 'list-play';
					this.ifCut = 3;
					this.showTitle("列表循环")
				}else {
					this.orderClass = 'order-play';
					this.ifCut = 0;
					this.showTitle("顺序循环")
				}
			},
			//显示音乐列表
			showList() {
				if(this.listShow == 0) {
					this.$refs.playlist.style.transform = 'translate(0)';
					this.$refs.musictop.style.width = window.innerWidth - 232 + 'px';
					this.$refs.musictop.style.transform = 'translateY(63px)';
					this.$refs.musiclrc.style.height = window.innerHeight - 85 - 95 + 'px';
					this.$refs.musicwave.style.height = window.innerHeight - 85 - 200 + 'px';
					this.dragScroll();
					this.listShow = 1;
					this.$refs.playlist.setAttribute('ifshow',1);
					this.waveWidth = this.$refs.musicwave.offsetWidth;
					this.waveHeight = this.$refs.musicwave.offsetHeight;
				}else {
					this.$refs.playlist.style.transform = 'translate(-230px)';
					this.$refs.musictop.style.width = window.innerWidth + 'px';
					this.$refs.musictop.style.transform = 'translateY(0px)';;
					this.$refs.musiclrc.style.height = this.$refs.musiclrc.offsetHeight + 50 + 'px';
					this.$refs.musicwave.style.height = this.$refs.musicwave.offsetHeight + 50 + 'px';
					this.dragScroll();
					this.listShow = 0;
					this.$refs.playlist.setAttribute('ifshow',0);
					this.waveWidth = this.$refs.musicwave.offsetWidth;
					this.waveHeight = this.$refs.musicwave.offsetHeight;
					// this.Visualizer();
				}
			},
			//列表滚动  显示滚动条
			listWell() {
				let that = this;
				let bar = document.getElementById('list-bar');
				let thisLBW = document.getElementsByClassName('list-bar-wrap')[0];
				let playList1 = document.getElementsByClassName('play-list-ul')[0];
				let timer2 = null;
				that.$refs.playlist.onmouseover = function() {
					bar.style.opacity = 1;
				}
				that.$refs.playlist.onmouseout = function() {
					clearTimeout(timer2);
					timer2 = setTimeout(function() {
						bar.style.opacity = 0;
					},3000)
				}
				that.$refs.listul.onmousewheel = function(e) {
					let PH = thisLBW.offsetHeight + 7;
					let PH1 = playList1.offsetHeight - 200;
					// console.log(that.listScroll * (thisLBW.offsetHeight / PH1))
					if(e.wheelDelta < 0) {
						//向上滚动
						that.listScroll += 60;
					}
					else if(e.wheelDelta > 0) {
						//向下滚动
						that.listScroll -=60;
					}
					if(that.listScroll <= -60) {
						that.listScroll = -60;
					}
					if(that.listScroll >= that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60) {
						that.listScroll = that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60;
					}
					let B = parseInt(that.listScroll * (PH / PH1));
					bar.style.transform = 'translateY('+ B +'px)';
					if(parseInt(bar.style.transform.substring(11)) <=0) {
						bar.style.transform = 'translateY(0px)';
						that.barScroll = 0;
					}
					if(parseInt(bar.style.transform.substring(11)) >= (PH-7-66)) {
						let PHB = PH-7-66;
						bar.style.transform = 'translateY('+ PHB +'px)';
						that.barScroll = PHB;
					}else {
						that.barScroll = parseInt(bar.style.transform.substring(11));
					}

					that.$refs.listul.style.transform = 'translateY(-'+that.listScroll+'px)';
				}

				// that.$refs.playlist.addEventListener('touchmove',function(e) {
				// 	let PH = thisLBW.offsetHeight + 7;
				// 	let PH1 = playList1.offsetHeight - 200;
				// 	// console.log(that.listScroll * (thisLBW.offsetHeight / PH1))
				// 	if(e.wheelDelta < 0) {
				// 		//向上滚动
				// 		that.listScroll += 60;
				// 	}
				// 	else if(e.wheelDelta > 0) {
				// 		//向下滚动
				// 		that.listScroll -=60;
				// 	}
				// 	if(that.listScroll <= -60) {
				// 		that.listScroll = -60;
				// 	}
				// 	if(that.listScroll >= that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60) {
				// 		that.listScroll = that.$refs.listul.offsetHeight - that.$refs.playlist.offsetHeight + 60;
				// 	}
				// 	let B = parseInt(that.listScroll * (PH / PH1));
				// 	bar.style.transform = 'translateY('+ B +'px)';
				// 	if(parseInt(bar.style.transform.substring(11)) <=0) {
				// 		bar.style.transform = 'translateY(0px)';
				// 		that.barScroll = 0;
				// 	}
				// 	if(parseInt(bar.style.transform.substring(11)) >= (PH-7-66)) {
				// 		let PHB = PH-7-66;
				// 		bar.style.transform = 'translateY('+ PHB +'px)';
				// 		that.barScroll = PHB;
				// 	}else {
				// 		that.barScroll = parseInt(bar.style.transform.substring(11));
				// 	}
				//
				// 	that.$refs.listul.style.transform = 'translateY(-'+that.listScroll+'px)';
				// })
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
				for(var i=0; i<playList1.children.length-1; i++) {
					PH += playList1.children[i].offsetHeight;
				}
				PH = PH-20;
				document.onmousemove = function(e) {
					let _top = e.clientY;
					 that.barScroll = _top - top + that.barTop;
					if(that.barScroll > thisLBW.offsetHeight - 66) {
						that.barScroll = thisLBW.offsetHeight - 66;
					}
					if(that.barScroll <= 0) {
						that.barScroll = 0;
					}
					bar.style.transform = 'translateY('+ that.barScroll +'px)';
					let Y = -that.barScroll * (PH / thisLBW.offsetHeight);
					playList1.style.transform = 'translateY('+ Y +'px)';
					that.listScroll = -parseInt(playList1.style.transform.substring(11));
				};
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmousedown = null;
					document.onmouseup = null;
				}
			},
			//列表2滚动
			listWell2() {
				let that = this;
				that.$refs.listul2.onmousewheel = function(e) {
					let lisHeight = 0;
					for(var i=0; i<that.$refs.listul2.children.length; i++) {
						lisHeight += that.$refs.listul2.children[i].offsetHeight;
					}
					if(lisHeight <	that.$refs.playlist.offsetHeight - 61) {
						// console.log('111');
					}else {
						if(e.wheelDelta < 0) {
							//向上滚动
							that.listScroll2 += 60;
						}
						else if(e.wheelDelta > 0) {
							//向下滚动
							that.listScroll2 -=60;
						}
						if(that.listScroll2 <= -60) {
							that.listScroll2 = -60;
						}
						if(that.listScroll2 >= that.$refs.listul2.offsetHeight - that.$refs.playlist.offsetHeight + 60) {
							that.listScroll2 = that.$refs.listul2.offsetHeight - that.$refs.playlist.offsetHeight + 60;
						}
						that.$refs.listul2.style.top = -that.listScroll2 + 'px';
					}
				}
			},
			//加载完成获得第一首音乐的信息
			firstGet() {
				this.$refs.audio.src = this.musicData[0].url;
				this.$refs.showname.innerHTML = this.musicData[0].name + ' - ' + this.musicData[0].singer;
				let that = this;
				this.$refs.audio.addEventListener('canplaythrough',function() {
					that.timeActive();
				})
				this.getLrcFile(this.musicData[0].name);
			},
			//时间进度
			timeActive() {
				//得到总的时间
				let allSeconds = parseInt(this.$refs.audio.duration % 60);
				let allMinutes = parseInt(this.$refs.audio.duration / 60);
				if(allSeconds <= 9) {
					allSeconds = '0' + allSeconds;
				}
				if(allMinutes <= 9) {
					allMinutes = '0' + allMinutes;
				}
				this.$refs.alltime.innerHTML = allMinutes + ':' + allSeconds;
				//得到当前音乐时间
				let currentSeconds = parseInt(this.$refs.audio.currentTime % 60);
				let currentMinutes = parseInt(this.$refs.audio.currentTime / 60);
				if(currentSeconds <= 9) {
					currentSeconds = '0' + currentSeconds;
				}
				if(currentMinutes <= 9) {
					currentMinutes = '0' + currentMinutes;
				}
				this.$refs.curtime.innerHTML = currentMinutes + ':' + currentSeconds;
			},
			//音乐时间监听
			getMusicTime() {
				let audio = document.getElementById('audio');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let that = this;
				audio.addEventListener('timeupdate',function() {
					that.curTime = Math.round(audio.currentTime);
					that.planScales = audio.currentTime / audio.duration;
					musicPlan.style.width = musicBar.offsetWidth * that.planScales + 'px';
					musicDarg.style.left = musicBar.offsetWidth * that.planScales + 'px';
					that.timeActive();
					if(that.lrcData == '纯音乐,请欣赏' && that.dragLrc == '未找到歌词') {

					}else {
						that.lrcScroll();
					}
				})
			},
			// 歌词滚动
			lrcScroll() {
				if(this.$refs.listul2.getAttribute('myplay') == 'false') {
					let lrcLine = 0;
					if(this.$refs.lrcul.getAttribute('move') == 'true') {
						let lrcli = this.$refs.lrcul.children;
						for(var i=0; i<lrcli.length; i++) {
							let thisLiHeight = 0;
							if(lrcli[i].getAttribute('time') == this.curTime && lrcli[i].getAttribute('ifchoose') == 'false') {
								for(var j=0; j<lrcli.length; j++) {
									lrcli[j].setAttribute('class','');
								}
								lrcLine++;
								if(lrcLine == 1) {
									lrcli[i].setAttribute('class','playing');
									lrcli[i].setAttribute('ifchoose','true');
									thisLiHeight = lrcli[i].offsetHeight;
								}else if(lrcLine == 2) {
									lrcli[i].setAttribute('class','playing');
									lrcli[i-1].setAttribute('class','playing');
									lrcli[i].setAttribute('ifchoose','true');
									lrcli[i-1].setAttribute('ifchoose','true');
									thisLiHeight = lrcli[i].offsetHeight + lrcli[i-1].offsetHeight;
									thisLiHeight = thisLiHeight / 2;
								}else if(lrcLine === 3) {
									lrcli[i].setAttribute('class','playing');
									lrcli[i-1].setAttribute('class','playing');
									lrcli[i-2].setAttribute('class','playing');
									lrcli[i].setAttribute('ifchoose','true');
									lrcli[i-1].setAttribute('ifchoose','true');
									lrcli[i-2].setAttribute('ifchoose','true');
									thisLiHeight = lrcli[i].offsetHeight + lrcli[i-1].offsetHeight + lrcli[i-2].offsetHeight;
									thisLiHeight = thisLiHeight / 2;
								}else if(lrcLine === 4) {
									lrcli[i].setAttribute('class','playing');
									lrcli[i-1].setAttribute('class','playing');
									lrcli[i-2].setAttribute('class','playing');
									lrcli[i-3].setAttribute('class','playing');
									lrcli[i].setAttribute('ifchoose','true');
									lrcli[i-1].setAttribute('ifchoose','true');
									lrcli[i-2].setAttribute('ifchoose','true');
									lrcli[i-3].setAttribute('ifchoose','true');
									thisLiHeight = lrcli[i].offsetHeight + lrcli[i-1].offsetHeight + lrcli[i-2].offsetHeight + lrcli[i-3].offsetHeight;
								}
								let lrcTop = parseInt(this.$refs.lrcul.style.transform.substring(11))
								let LRCY = lrcTop - thisLiHeight;
								this.$refs.lrcul.style.transform = 'translateY('+ LRCY +'px)';
							}
						}
					}
				}
			},
			//手动控制歌词滚动
			dragScroll() {
				if(this.$refs.listul2.getAttribute('myplay') == 'false') {
					let lrcLi = document.getElementsByClassName('lrc-ul')[0].children;
					let lrcUl = document.getElementsByClassName('lrc-ul')[0];
					let musicLrc = document.getElementsByClassName('music-lrc')[0];
					let lisnum = 0;
					let lisheight = 0;
					for(var j=0; j<lrcLi.length; j++) {
						lrcLi[j].setAttribute('class','');
					};
					if(lrcLi.length == 1) {

					}else {
						lisnum = 0;
						lisheight = 0;
						for(var i=0; i<lrcLi.length; i++) {
							if(lrcLi[i].getAttribute('time') <= this.curTime) {
								lisnum++;
								lisheight += lrcLi[i].offsetHeight;
								lrcLi[i].setAttribute('class','');
							}
						}
						if(lisnum == 0) {
							let LRCY = this.$refs.musiclrc.offsetHeight / 2 + 50;
							lrcUl.style.transform = 'translateY('+ LRCY +'px)';
						}else{
							let allY = musicLrc.offsetHeight / 2 - lisheight + 40;
							lrcUl.style.transform = 'translateY('+ allY +'px)';
							if(lisnum < 3) {
								if(lisnum == 1) {
									if(lrcLi[0].getAttribute('time') == lrcLi[1].getAttribute('time')) {
										allY = musicLrc.offsetHeight / 2 - lisheight + 100;
										lrcUl.style.transform = 'translateY('+ allY +'px)';
										lrcLi[0].setAttribute('class','playing');
										lrcLi[1].setAttribute('class','playing');
									}else {
										allY = this.$refs.musiclrc.offsetHeight / 2 + 50;
										lrcUl.style.transform = 'translateY('+ allY +'px)';
										lrcLi[0].setAttribute('class','playing');
									}
								}
								else if(lisnum == 2) {
										allY = musicLrc.offsetHeight / 2 - lisheight + 100;
										lrcUl.style.transform = 'translateY('+ allY +'px)';
										lrcLi[0].setAttribute('class','playing');
										lrcLi[1].setAttribute('class','playing');
								}

							}else {
								if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum-2].getAttribute('time')) {
									lrcLi[lisnum-1].setAttribute('class','playing');
									lrcLi[lisnum-2].setAttribute('class','playing');
									allY = musicLrc.offsetHeight / 2 - lisheight + 60;
									lrcUl.style.transform = 'translateY('+ allY +'px)';
								}else if(lrcLi[lisnum-1].getAttribute('time') == lrcLi[lisnum].getAttribute('time')) {
									lrcLi[lisnum-1].setAttribute('class','playing');
									lrcLi[lisnum].setAttribute('class','playing');
									allY = musicLrc.offsetHeight / 2 - lisheight + 60;
									lrcUl.style.transform = 'translateY('+ allY +'px)';
								}else {
									lrcLi[lisnum-1].setAttribute('class','playing');
								}
							}
						}
					}
				}
			},
			//音乐循环播放四合一 next
			musicEndsPlay() {
				if(this.$refs.listul2.getAttribute('myplay') == 'false') {
					let audio = document.getElementById('audio');
					audio.src = this.musicData[this.playNum].url;
					this.$refs.listul.children[this.playNum].setAttribute('class','playing');
					this.$refs.showname.innerHTML = this.musicData[this.playNum].name + ' - ' + this.musicData[this.playNum].singer;
					this.getMusicTime();
					this.ifPlay = true;
					this.playMusic();
					this.getLrcFile(this.musicData[this.playNum].name)
				}
				else {
					let audio = document.getElementById('audio');
					audio.src = this.dragData[this.dragNum].url;
					this.$refs.listul2.children[this.dragNum].setAttribute('class','playing');
					this.$refs.showname.innerHTML = this.dragData[this.dragNum].name + ' - ' + this.dragData[this.dragNum].singer;
					this.getMusicTime();
					this.ifPlay = true;
					this.playMusic();
				}
			},
			//判断是什么顺序 next
			whatKind() {
				let that = this;
				if(that.$refs.listul2.getAttribute('myplay') == 'false') {
					for(var i=0; i<this.musicData.length; i++) {
						that.$refs.listul.children[i].setAttribute('class','');
					}
					if(that.ifCut == 0) {
						//顺序播放
						that.playNum +=1;
						if(that.playNum >= that.musicData.length - 1) {
							that.playNum = that.musicData.length - 1
						}
						that.musicEndsPlay();
					}else if (that.ifCut == 1) {
						//随机播放
						that.playNum = parseInt(Math.random() * that.musicData.length);
						that.musicEndsPlay();
					}else if (that.ifCut == 2) {
						//单曲循环
						that.musicEndsPlay();
					}else {
						//列表循环
						that.playNum +=1;
						if(that.playNum >= that.musicData.length) {
							that.playNum = 0;
						}
						that.musicEndsPlay();
					}
				}else {
					for(var i=0; i<that.$refs.listul2.children.length; i++) {
						if(that.$refs.listul2.children[i].getAttribute('class') == 'addmy') {

						}else {
							that.$refs.listul2.children[i].setAttribute('class','');
						}
					}
					if(that.ifCut == 0) {
						//顺序播放
						that.dragNum +=1;
						if(that.dragNum >= that.dragData.length - 1) {
							that.dragNum = that.dragData.length - 1
						}
						that.musicEndsPlay();
					}else if (that.ifCut == 1) {
						//随机播放
						that.dragNum = parseInt(Math.random() * that.dragData.length);
						that.musicEndsPlay();
					}else if (that.ifCut == 2) {
						//单曲循环
						that.musicEndsPlay();
					}else {
						//列表循环
						that.dragNum +=1;
						if(that.dragNum >= that.dragData.length) {
							that.dragNum = 0;
						}
						that.musicEndsPlay();
					}
				}
			},
			//判断是什么顺序 prev
			whatKind2() {
				let that = this;
				if(that.$refs.listul2.getAttribute('myplay') == 'false') {
					for(var i=0; i<this.musicData.length; i++) {
						that.$refs.listul.children[i].setAttribute('class','');
					}
					if(that.ifCut == 0) {
						//顺序播放
						that.playNum -=1;
						if(that.playNum <= 0) {
							that.playNum = 0
						}
						that.musicEndsPlay();
					}else if (that.ifCut == 1) {
						//随机播放
						that.playNum = parseInt(Math.random() * that.musicData.length);
						that.musicEndsPlay();
					}else if (that.ifCut == 2) {
						//单曲循环
						that.musicEndsPlay();
					}else {
						//列表循环
						that.playNum -=1;
						if(that.playNum < 0) {
							that.playNum = that.musicData.length -1;
						}
						that.musicEndsPlay();
					}
				}else {
					for(var i=0; i<that.$refs.listul2.children.length; i++) {
						if(that.$refs.listul2.children[i].getAttribute('class') == 'addmy') {

						}else {
							that.$refs.listul2.children[i].setAttribute('class','');
						}
					}
					if(that.ifCut == 0) {
						//顺序播放
						that.dragNum -=1;
						if(that.dragNum <= 0) {
							that.dragNum = 0
						}
						that.musicEndsPlay();
					}else if (that.ifCut == 1) {
						//随机播放
						that.dragNum = parseInt(Math.random() * that.dragData.length);
						that.musicEndsPlay();
					}else if (that.ifCut == 2) {
						//单曲循环
						that.musicEndsPlay();
					}else {
						//列表循环
						that.dragNum -=1;
						if(that.dragNum < 0) {
							that.dragNum = thatdragData.length -1;;
						}
						that.musicEndsPlay();
					}
				}
			},
			//playlist点击
			headerClick() {
				if(this.ifHeader == 0) {
					this.$refs.headerul.style.display = 'block';
					this.ifHeader = 1;
				}else {
					this.$refs.headerul.style.display = 'none';
					this.ifHeader = 0;
				}
			},
			//切换推荐音乐列表
			showList1() {
				this.ifMy = 0;
				this.$refs.headerul.children[1].setAttribute('class','');
				this.$refs.headerul.children[0].setAttribute('class','choose');
				this.$refs.listul.style.left = '0';
				this.$refs.listul2.style.left = '-230px';
				this.$refs.listul2.setAttribute('myplay','false');
				this.listNum();
			},
			//切换我的音乐列表
			showList2() {
				this.ifMy = 1;
				this.$refs.headerul.children[0].setAttribute('class','');
				this.$refs.headerul.children[1].setAttribute('class','choose');
				this.$refs.listul2.style.left = '0';
				this.$refs.listul.style.left = '-230px';
				this.$refs.listul2.setAttribute('myplay','true');
				this.listNum();
			},
			//列表点击
			listClick() {
				let audioUrls = document.getElementById('audio').src;
				let audio = document.getElementById('audio');
				let this_ = event.currentTarget;
				audio.setAttribute('dataNum',this_.getAttribute('num'));
				this.playNum = this_.getAttribute('num') - 0;
				this.audioUrl = this.musicData[this.playNum].url;
				this.$refs.listul2.setAttribute('myplay','false');
				for(var i=0; i<this.$refs.listul2.children.length; i++) {
					if(this.$refs.listul2.children[i].getAttribute('class') == 'addmy') {
						//null
					}else {
						this.$refs.listul2.children[i].setAttribute('class','');
					}
				}
				if(audioUrls == this.audioUrl) {
					this_.setAttribute('class','playing');
					this.playMusic();
				}else {
					for(var i=0; i<this.musicData.length; i++) {
						this.$refs.listul.children[i].setAttribute('class','');
					}
					audio.src = this.audioUrl;
					this.ifPlay = true;
					this.$refs.showname.innerHTML = this.musicData[this.playNum].name + ' - ' + this.musicData[this.playNum].singer;
					this_.setAttribute('class','playing');
					this.playMusic();
				}
				this.getLrcFile(this.musicData[this.playNum].name)
			},
			//第二列表点击
			listClick2() {
				let audioUrls = document.getElementById('audio').src;
				let audio = document.getElementById('audio');
				let this_ = event.currentTarget;
				let thisNum = this_.getAttribute('num') - 0;
				this.audioUrl = this.dragData[thisNum].url;
				this.$refs.listul2.setAttribute('myplay','true');
				this.dragNum = thisNum;
				for(var i=0; i<this.musicData.length; i++) {
					this.$refs.listul.children[i].setAttribute('class','');
				}
				if(audioUrls == this.audioUrl) {
					this_.setAttribute('class','playing');
					this.playMusic();
				}else {
					for(var i=0; i<this.$refs.listul2.children.length; i++) {
						if(this.$refs.listul2.children[i].getAttribute('class') == 'addmy') {

						}else {
							this.$refs.listul2.children[i].setAttribute('class','');
						}
					}
					audio.src = this.audioUrl;
					this.ifPlay = true;
					this.$refs.showname.innerHTML = this.dragData[thisNum].name + ' - ' + this.dragData[thisNum].singer;
					this_.setAttribute('class','playing');
					this.playMusic();
				}
				this.getLrcFile(this.dragData[this.dragNum].name)
			},
			//切换列表音乐数量
			listNum() {
				let musiclist = document.getElementsByClassName('music-list-img')[0];
				if(this.ifMy == 0) {
					musiclist.innerHTML = this.musicData.length;
				}else {
					musiclist.innerHTML = this.dragData.length;
				};
			},
			//移除我的音乐
			removeLi() {
				let thisClose = event.currentTarget;
				let thisLi = thisClose.parentNode;
				let thisNum = thisLi.getAttribute('num');
				this.dragData.splice(thisNum,1);
				window.localStorage.clear();
				this.saveMusic();
				// thisLi.parentNode.removeChild(thisLi);
			},
			//localStorage存储歌曲
			saveMusic() {
				// for(var i=0; i<this.dragData.length; i++) {
				// 	window.localStorage['name'+i] = this.dragData[i].name;
				// 	window.localStorage['singer'+i]= this.dragData[i].singer;
				// 	window.localStorage['url'+i] = this.dragData[i].url;
				// }
				// console.log(window.localStorage)
			},
			//波形
			Visualizer() {
				let that = this;
				//获得音乐链接
				var audiosrc = document.getElementById('audio');

				// 创建上下文，audio context;
				var audioCtx = window.AudioContext || window.webkitAudioContext;
				var ctx = new audioCtx();

				var audioSrc = ctx.createMediaElementSource(audiosrc);
				var analyser = ctx.createAnalyser();

				audioSrc.connect(analyser);
				analyser.connect(ctx.destination);
				// analyser.fftSize = 256;

				var canvas = document.getElementById('canvas');
        var meterWidth = 18;
        var gap = 2;
        var capHeight = 5;
        var capStyle = '#fff';
				// var b = 'rgb(174,201,240)';
				// var r = 'rgb(228,89,135)';
				// var y = 'rgb(243,233,168)';
        var capYPositionArray = [];
		    var ctx = canvas.getContext('2d');
		    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
		    gradient.addColorStop(1, '#0f0');
		    gradient.addColorStop(0.5, '#ff0');
		    gradient.addColorStop(0, '#f00');

				function renderFrame() {
					var cwidth = canvas.width;
	        var cheight = canvas.height - 2;
					var meterNum = cwidth / (18 + 2);
					var three = Math.ceil(Math.random() * 2);
					var array = new Uint8Array(analyser.frequencyBinCount);
        	analyser.getByteFrequencyData(array);
					analyser.fftSize = 4096;
        	var step = Math.round(array.length / meterNum);
        	ctx.clearRect(0, 0, cwidth, cheight);
        	for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
						if(i%5 == 0) {
							ctx.fillStyle = that.c1;
						}else if(i%2==0) {
							ctx.fillStyle = that.c2;
						}else {
							ctx.fillStyle = that.c3;
						}

            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 20, cheight - (--capYPositionArray[i]), meterWidth, capHeight + 5);

            } else {
                ctx.fillRect(i * 20, cheight - value, meterWidth, capHeight + 5);
                capYPositionArray[i] = value;
								if(value == 0) {
									// console.log(capYPositionArray[i]);
									ctx.fillRect(i * 20,cheight - value + capHeight - 20,meterWidth,capHeight + 9);
								}
            };
						if(i%5 == 0) {
							ctx.fillStyle = that.c1;
						}else if(i%2==0) {
							ctx.fillStyle = that.c2;
						}else {
							ctx.fillStyle = that.c3;
						}

						//波形图主波形
						ctx.fillRect(i * 20  , cheight - value + capHeight + 15, meterWidth, cheight);
        	}
					// console.log(cheight);
					requestAnimationFrame(renderFrame);
				}
				renderFrame();
			},
		},
		mounted() {
			this.getMusicData();
			this.dragMusic();
			this.listWell();
			this.listWell2();
			this.getMusicTime();
			this.saveMusic();
			let that = this;
			let audio = document.getElementById('audio');
			let playlist = document.getElementsByClassName('music-play-list')[0];
			let imgspan = document.getElementsByClassName('choose-img')[0].getElementsByClassName('imgurl');
			let lis = document.getElementsByClassName('list-ul')[0].children;

			let listBarWrap = document.getElementsByClassName('list-bar-wrap')[0];
			if(window.localStorage.length >= 3) {
				let ls = window.localStorage;
				for(var i=0; i<ls.length/3; i++) {
					that.dragData.push({name: ls['name'+i], singer: ls['singer'+i],url: ls['url'+i]});
				}
			}

			//切换图片函数
			for(var i=0; i<imgspan.length; i++) {
				imgspan[i].index = i;
				imgspan[i].addEventListener('click',function() {
					for(var j=0; j<imgspan.length; j++) {
						imgspan[j].className = 'imgurl';
					}
					let this_ = this;
					if(this.index == 0) {
						changeimg(this_);
						that.c1 = 'rgb(188,140,190)';
						that.c2 = 'rgb(78,100,164)';
						that.c3 = 'rgb(35,32,43)';
						changeblack();
					}else if(this.index == 1) {
						changeimg(this_);
						that.c1 = 'rgb(225,208,200)';
						that.c2 = 'rgb(86,82,82)';
						that.c3 = 'rgb(195,195,195)';
						changeblack();
					}else if(this.index == 2) {
						changeimg(this_);
						that.c1 = 'rgb(8,61,151)';
						that.c2 = 'rgb(124,173,251)';
						that.c3 = 'rgb(149,197,221)';
						for(var k=0; k<lis.length; k++) {
							lis[k].style.color = 'white';
						}
						let lis2 = document.getElementsByClassName('list-ul2')[0].children;
						for(var x=0; x<lis2.length; x++) {
							lis2[x].style.color = 'white';
						}
					}else if(this.index == 3){
						changeimg(this_);
						that.c1 = 'rgb(247,157,164)';
						that.c2 = 'rgb(163,62,77)';
						that.c3 = 'rgb(225,161,151)';
						changeblack();
					}else {
						changeimg(this_);
						that.c1 = 'rgb(236,231,147)';
						that.c2 = 'rgb(196, 91, 150)';
						that.c3 = 'rgb(89,146,166)';
						changeblack();
					}
					function changeimg(a) {
						let cName = 'choose' + (a.index-0+1);
						a.classList.add('imgurl',cName);
						let thisImgUrl = a.getAttribute('imgurl');
						document.body.style.backgroundImage = 'url('+ thisImgUrl +')';
						// document.body.style.backgroundSize =  "cover";
					}
					function changeblack() {
						for(var k=0; k<lis.length; k++) {
							lis[k].style.color = '';
						}
						let lis2 = document.getElementsByClassName('list-ul2')[0].children;
						for(var x=0; x<lis2.length; x++) {
							lis2[x].style.color = '';
						}
					}
				})
			}


			//空格事件
			document.onkeydown = function(e) {
				if(e && e.keyCode == 32) {
					that.playMusic();
				}
			}
			//点击列表选择按钮关闭
			document.addEventListener('click',function() {
				that.$refs.headerul.style.display = 'none';
				that.ifHeader = 0;
			})

			function onloadsize() {
				// 加载完成 界面宽度自适应
				that.$refs.playlist.style.height = window.innerHeight - 75 + 'px';
				listBarWrap.style.height = window.innerHeight - 75 - 61 + 'px';
				that.$refs.musictop.style.width = window.innerWidth + 'px';
				that.$refs.musiclrc.style.height = window.innerHeight - 85 - 95 + 'px';
				that.$refs.musiclrc.style.height = that.$refs.musiclrc.offsetHeight + 50 + 'px';
				that.$refs.musicwave.style.height = window.innerHeight - 85 - 200 + 'px';
				that.$refs.musicwave.style.height = that.$refs.musicwave.offsetHeight + 50 + 'px';
				that.waveWidth = that.$refs.musicwave.offsetWidth;
				that.waveHeight = that.$refs.musicwave.offsetHeight;
			}
			onloadsize();
			// 浏览器宽高度改变 自适应
			window.addEventListener('resize',function() {

				if(playlist.getAttribute('ifshow') == '1') {
					// console.log(1);
					that.$refs.musictop.style.width = window.innerWidth - 232 + 'px';
					that.$refs.musiclrc.style.height = window.innerHeight - 85 - 95 + 'px';
					that.$refs.musicwave.style.height = window.innerHeight - 85 - 200 + 'px';
					that.waveWidth = that.$refs.musicwave.offsetWidth;
					that.waveHeight = that.$refs.musicwave.offsetHeight;
					that.showLrc();
					that.dragScroll();
					// that.Visualizer();
				}else {
					that.$refs.musictop.style.width = window.innerWidth + 'px';
					that.$refs.musiclrc.style.height = window.innerHeight - 85 - 95 + 'px';
					that.$refs.musiclrc.style.height = that.$refs.musiclrc.offsetHeight + 50 + 'px';
					that.$refs.musicwave.style.height = window.innerHeight - 85 - 200 + 'px';
					that.$refs.musicwave.style.height = that.$refs.musicwave.offsetHeight + 50 + 'px';
					that.waveWidth = that.$refs.musicwave.offsetWidth;
					that.waveHeight = that.$refs.musicwave.offsetHeight;
					that.showLrc();
					that.dragScroll();
				}
			})

			//音乐监听
			audio.addEventListener('timeupdate',function() {
				// that.Visualizer();
				if(audio.ended) {
					if(that.$refs.listul2.getAttribute('myplay') == 'false') {
						for(var i=0; i<that.musicData.length; i++) {
							that.$refs.listul.children[i].setAttribute('class','');
						}
						if(that.ifCut == 0) {
							//顺序播放
							that.playNum +=1;
							if(that.playNum >= that.musicData.length - 1) {
								that.playNum = that.musicData.length - 1
							}
							that.musicEndsPlay();
						}else if (that.ifCut == 1) {
							//随机播放
							that.playNum = parseInt(Math.random() * that.musicData.length);
							that.musicEndsPlay();
						}else if (that.ifCut == 2) {
							//单曲循环
							that.musicEndsPlay();
						}else {
							//列表循环
							that.playNum +=1;
							if(that.playNum >= that.musicData.length) {
								that.playNum = 0;
							}
							that.musicEndsPlay();
						}
					}else {
						for(var i=0; i<that.$refs.listul2.children.length; i++) {
							if(that.$refs.listul2.children[i].getAttribute('class') == 'addmy') {

							}else {
								that.$refs.listul2.children[i].setAttribute('class','');
							}
						}
						if(that.ifCut == 0) {
							//顺序播放
							that.dragNum +=1;
							if(that.dragNum >= that.dragData.length - 1) {
								that.dragNum = that.dragData.length - 1
							}
							that.musicEndsPlay();
						}else if (that.ifCut == 1) {
							//随机播放
							that.dragNum = parseInt(Math.random() * that.dragData.length);
							that.musicEndsPlay();
						}else if (that.ifCut == 2) {
							//单曲循环
							that.musicEndsPlay();
						}else {
							//列表循环
							that.dragNum +=1;
							if(that.dragNum >= that.dragData.length) {
								that.dragNum = 0;
							}
							that.musicEndsPlay();
						}
					}
				}
			})
		},
		watch: {
			musicData: function(val,oldVal) {
				let that = this;
				that.firstGet();
				that.Visualizer();
				//鼠标右击事件
				document.oncontextmenu = function(e) {
					that.showList();
					e.returnValue=false;
				}
				that.listNum();
			}
		}
	}
</script>

<style>
	@import '../style/music.css';
	@import '../style/list.css';
	@import '../style/top.css';
	@import '../style/lrc.css';
	@import '../style/wave.css';
	@import '../style/img.css';
</style>
<style>
</style>
