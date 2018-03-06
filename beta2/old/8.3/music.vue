<template>
	<div class="music">
		<audio id="audios" ref='audio' dataNum=0 >
		</audio>
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
		<div class="music-my">
			<div class="music-myname">
				<div class="music-text">
					音乐标题
				</div>
				<div class="music-master">
					歌手
				</div>
			</div>
			<ul class="music-ul">
				<li class="music-li" v-for='(item,index) in musicData'>
					<div class="music-text">
						{{item.name}}
					</div>
					<div class="music-master">
						{{item.singer}}
					</div>
					<div class="music-begin" musicplay='true' v-on:click='changeMusic'>
						<span>播放</span>
						<a class="music-url">{{item.url}}</a>
						<a class="music-index">{{index}}</a>
					</div>
					<div class="music-line">
						/
					</div>
					<div class="music-down">
						<a :href='item.url' target="_blank" value='download'>下载</a>
					</div>
					<div class="music-No">
						{{index + 1}}.
					</div>
				</li>
			</ul>
			<div class="music-scroll">
				<div class="music-scrollbar" v-on:mousedown='scrollul'>
				</div>
			</div>
		</div>
		<div class="music-play-list">
			<div class="play-list-header">Play List</div>
			<ul class="play-list-ul">
				<li v-for='(item,index) in musicData' :Num="index" :val="item.name+' - '+item.singer" :musicUrl='item.url' v-on:click='listClick'>
					<span>{{index + 1}}.</span>{{item.name}} - {{item.singer}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		components: {

		},
		data() {
			return {
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
				playText:'播放',
				appHeight: window.innerHeight,
				appWidth: window.innerWidth,
				audioUrl: null,
			}
		},
		methods: {
			getMusicData() {
				this.$http.get('http://lesses.me/my/beta2/static/music.json').then((response) => {
					this.musicData = response.data;
				},(response) => {
					console.log('失败');
				})
			},
			playmusic(e) {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				for(var i=0; i<this.musicData.length; i++) {
					listLis[i].setAttribute('class','');
				}
				listLis[this.playNum - 0].setAttribute('class','playing');
				if(this.ifplay) {
					this.$refs.audio.play();
					this.ifplay = false;
					document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML = this.ifplay? '播放' : '暂停';
					this.playText = document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
				}else {
					this.$refs.audio.pause();
					this.ifplay = true;
					document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML = this.ifplay? '播放' : '暂停';
					this.playText = document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
				}
			},
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
				this.musicleft = e.clientX - musicWrap.offsetLeft - musicBar.offsetLeft;
				this.scales1 = this.musicleft / musicBar.offsetWidth;
				musicDarg.style.left = this.musicleft + 'px';
				musicPlan.style.width = musicBar.offsetWidth * this.scales1 + 'px';
				getAudio.currentTime = getAudio.duration * this.scales1;
				this.getMusicTime();
				this.ifplay = 1;
				this.playmusic();
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
			showmy() {
				let playList = document.getElementsByClassName('music-play-list')[0];
				let musicMy = document.getElementsByClassName('music-my')[0];
				if(this.ifshow == 0) {
					// playList.style.display = 'block';
					playList.style.transform = 'translate(0px)';

					musicMy.style.left = '50%';
					this.ifshow = 1;
				}else {
					playList.style.transform = 'translate(-230px)';
					// playList.style.display = 'none';
					musicMy.style.left = '-200%';
					this.ifshow = 0;

				}

			},
			timeActive() {
				let getAudio = document.getElementById('audios');
				// 音乐时间
				let timeSeconds = Math.round(audios.duration % 60);
				let timeMinutes = Math.round(audios.duration / 60);

				if(timeSeconds <= 9) {
					timeSeconds = '0' + timeSeconds;
				}

				if(timeMinutes <= 9) {
					timeMinutes = '0' + timeMinutes;
				}

				document.getElementsByClassName('time-all')[0].innerHTML = timeMinutes + ':' + timeSeconds;
				// 当前播放时间
				let newSeconds = Math.round(audios.currentTime % 60);
				let newMinutes = Math.round(audios.currentTime / 60);

				if(newSeconds <= 9) {
					newSeconds = '0' + newSeconds;
				}

				if(newMinutes <= 9) {
					newMinutes = '0' + newMinutes;
				}
				document.getElementsByClassName('time-second')[0].innerHTML = newMinutes + ':' + newSeconds;
			},
			getMusicTime() {
				let getAudio = document.getElementById('audios');
				let musicDarg = document.getElementsByClassName('music-drag')[0];
				let musicBar = document.getElementsByClassName('music-bar')[0];
				let musicPlan = document.getElementsByClassName('music-plan')[0];
				let that = this;
					getAudio.addEventListener('timeupdate',function(){
						this.scales1 = getAudio.currentTime / getAudio.duration;
						musicPlan.style.width = musicBar.offsetWidth * this.scales1 + 'px';
						musicDarg.style.left = musicBar.offsetWidth * this.scales1 + 'px';
						that.timeActive();
					},false);
			},
			// recovery
			changeColor() {
				document.getElementsByClassName('music-li')[this.playNum].style.color = 'orange';
				// document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML = this.ifplay? '播放' : '暂停';
				document.getElementsByClassName('music-begin')[this.playNum].children[0].style.color = 'orange';
				// document.getElementsByClassName('music-begin')[this.playNum].setAttribute('musicplay',this.ifplay);
			},
			// recovery
			changewhite() {
				for(var i=0; i<document.getElementsByClassName('music-begin').length; i++) {
					document.getElementsByClassName('music-begin')[i].style.color = 'white';
					document.getElementsByClassName('music-li')[i].style.color = 'white';
					document.getElementsByClassName('music-begin')[i].children[0].innerHTML = '播放';
					document.getElementsByClassName('music-begin')[i].children[0].style.color = 'white';
				}
			},
			// recovery
			changeMusic() {
				let musicBegin = document.getElementsByClassName('music-begin');
				document.getElementById('audios').setAttribute('dataNum',event.currentTarget.children[2].innerHTML)
				this.changewhite();

				event.currentTarget.parentNode.style.color = 'orange';
				let musicIndex = event.currentTarget.children[2].innerHTML;
				let musicUrl = event.currentTarget.children[1].innerHTML;
				let musicUl = document.getElementsByClassName('music-ul')[0]
				let musicUlName = musicUl.children[musicIndex].children[0].innerHTML;
				let musicUlSinger = musicUl.children[musicIndex].children[1].innerHTML;
				// console.log(this.playNum,musicIndex);
				if(this.playNum == musicIndex) {
					event.currentTarget.children[0].innerHTML = this.playText;
				}else {
					this.playText = '暂停';

				}
				this.playNum = musicIndex;

				this.$refs.audio.src = musicUrl;
				document.getElementsByClassName('music-show-name')[0].innerHTML = musicUlName + ' - ' +musicUlSinger;
				this.scales1 = 0;

				if(event.currentTarget.children[0].innerHTML == '播放') {
					event.currentTarget.setAttribute('musicplay','false');
					// console.log(event.currentTarget.children[0].innerHTML);

					event.currentTarget.children[0].innerHTML = '暂停';
					this.playText = event.currentTarget.children[0].innerHTML;
					event.currentTarget.children[0].style.color = 'orange';

					this.ifplay = true;
					this.playmusic();
				}
				else if(event.currentTarget.children[0].innerHTML == '暂停'){
					// console.log(event.currentTarget.children[0].innerHTML);

					event.currentTarget.children[0].style.color = 'orange';
					event.currentTarget.children[0].innerHTML = '播放';
					this.playText = event.currentTarget.children[0].innerHTML;
					event.currentTarget.setAttribute('musicplay','true');
					this.playmusic();
				}
			},
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
					musicShowName.innerHTML = this.musicData[this.listNum].name + ' - ' + this.musicData[this.listNum].singer;
					this.getMusicTime();
					this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
					this.ifplay = true;
					this.playmusic();
					this.changeColor();

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
						musicShowName.innerHTML = this.musicData[this.listNum].name + ' - ' + this.musicData[this.listNum].singer;
						this.getMusicTime();
						this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
						this.ifplay = true;
						this.playmusic();
						this.changeColor();
				}
			},
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
					this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
					this.ifplay = true;
					listLis[this.playNum - 0].setAttribute('class','playing');
					this.playmusic();
					this.changeColor();
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
						musicShowName.innerHTML = this.musicData[this.orderNum].name + ' - ' + this.musicData[this.orderNum].singer;
						this.getMusicTime();
						this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
						this.ifplay = true;
						this.playmusic();
						this.changeColor();
				}
			},
			randomplay() {
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let audio = document.getElementById('audios');
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				// console.log(this.playNum);
				this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
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
					musicShowName.innerHTML = this.musicData[this.randomNum].name + ' - ' + this.musicData[this.randomNum].singer;
					this.getMusicTime();
					this.ifplay = true;
					this.playmusic();
					this.changeColor();
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
						musicShowName.innerHTML = this.musicData[this.randomNum].name + ' - ' + this.musicData[this.randomNum].singer;
						this.getMusicTime();
						this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
						this.ifplay = true;
						this.playmusic();
						this.changeColor();
				}
			},
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
					musicShowName.innerHTML = this.musicData[this.oneNum].name + ' - ' + this.musicData[this.oneNum].singer;
					this.getMusicTime();
					this.playText =document.getElementsByClassName('music-begin')[this.playNum].children[0].innerHTML;
					this.ifplay = true;
					this.playmusic();
					this.changeColor();
				}
			},
			musicclick() {
				let musicBegin = document.getElementsByClassName('music-begin');
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				for(var i=0; i<musicBegin.length; i++) {
					musicBegin[i].style.color = 'white';
					musicBegin[i].children[0].style.color = 'white';
					musicBegin[i].children[0].innerHTML = '播放';
					document.getElementsByClassName('music-li')[i].style.color = 'white';
				};

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
			scrollul() {
				let that = this;
				let thisBar = event.currentTarget;
				let scrollSide = document.getElementsByClassName('music-scroll')[0];
				let musicUl = document.getElementsByClassName('music-ul')[0];
				document.onmousemove = function(e) {
					that.scrollPageY = e.pageY - 190;

					if(that.scrollPageY <= 0) {
						that.scrollPageY = 0;
					}if(that.scrollPageY >= 490) {
						that.scrollPageY = 490;
					}
						thisBar.style.top = that.scrollPageY  + 'px';
						that.scrollProp = parseInt(thisBar.offsetTop) / (parseInt(scrollSide.offsetHeight) - 80);
						musicUl.style.top = - that.scrollProp * parseInt(musicUl.offsetHeight -570) + 'px'
				}
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmousedown = null;
					document.onmouseup = null;
				}
			},
			mouseWhell() {
				let that = this;
				let thisBar = document.getElementsByClassName('music-scrollbar')[0];
				let scrollSide = document.getElementsByClassName('music-scroll')[0];
				let musicUl = document.getElementsByClassName('music-ul')[0];
				let musicMy = document.getElementsByClassName('music-my')[0];
				musicMy.onmousewheel = function(e) {

					if(e.wheelDelta < 0) {
						//向上滚动
						that.scrollPageY += 20;

					}
					if(e.wheelDelta > 0) {
						//向下滚动
						that.scrollPageY -= 20;
					}

					if(that.scrollPageY <= 0) {
						that.scrollPageY = 0;
					}if(that.scrollPageY >= 490) {
						that.scrollPageY = 490;
					}
						thisBar.style.top = that.scrollPageY  + 'px';
						that.scrollProp = parseInt(thisBar.offsetTop) / (parseInt(scrollSide.offsetHeight) - 80);
						musicUl.style.top = - that.scrollProp * parseInt(musicUl.offsetHeight -570) + 'px'
				}
			},
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

					// console.log(that.scrollPageY,listUl.offsetHeight - musicPlayList.offsetHeight - 60);
				}
			},
			listClick() {
				// console.log(this.musicData);
				let audiosUrl = escape(document.getElementById('audios').src);
				let this_ = event.currentTarget;
				let listLis = document.getElementsByClassName('play-list-ul')[0].children;
				let musicShowName = document.getElementsByClassName('music-show-name')[0];
				document.getElementById('audios').setAttribute('dataNum',event.currentTarget.getAttribute('num'));
				this.playNum = event.currentTarget.getAttribute('num');
				this.audioUrl = this.musicData[event.currentTarget.getAttribute('num')].url;
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

			},
		},
		mounted() {
			this.getMusicData();
			this.getMusicTime();
			this.mouseWhell();
			this.listWell();
			let audio =  document.getElementById('audios');
			let listLis = document.getElementsByClassName('play-list-ul')[0].children;
			let that = this;
			audio.addEventListener('timeupdate',function() {

				if(audio.ended) {
					for(var i=0; i<that.musicData.length; i++) {
						listLis[i].setAttribute('class','');
					}

					if(that.ifcut == 0) {
						//顺序播放
						that.ends = true;
						that.changewhite();
						that.orderplay()

					}else if (that.ifcut == 1) {
						//随机播放
						that.ends = true;
						that.randomNum = parseInt(Math.random() * that.musicData.length);
						that.changewhite();
						that.randomplay();

					}else if (that.ifcut == 2) {
						//单曲循环
						that.ends = true;
						that.changewhite();
						that.oneplay();
					}else {
						//列表循环
						that.ends = true;
						that.changewhite();
						that.listplay();
					}
				}
			});
		},
		watch: {
				musicData : function(val,oldVal) {
					this.newData = val;
					this.firstGet();
					this.getMusicTime();
				}
		}
	}
</script>

<style>
	.music-play-list {
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
			background: rgba(50,50,50,1);
			transition: transform .3s;
			box-shadow: 2px 0 2px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.2);
	}

	.play-list-header {
		width: 100%;
		box-sizing: border-box;
		padding: 15px;
    font-size: 20px;
    color: #888;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid #202020;
    box-shadow: 0 0 5px #000, inset 0 0 5px rgba(255, 255, 255, 0.2);
    text-align: center;
    background-color: #404040;
    cursor: default;
		position: absolute;
		z-index: 99;
	}


	.play-list-ul {
		width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    opacity: 0.8;
    /*max-height: calc(100% - 60px);*/
		height: auto;
		position: absolute;
		transition: top .3s;
		top: 60px;
		z-index: 50;
	}

	.play-list-ul li {
		border-bottom: 1px solid #555;
    padding: 15px;
    color: #888;
    font-size: 15px;
    width: 100%;
		/*height: 100%;*/
    cursor: pointer;
    word-break: break-all;
    transition: background-color 0.2s;
    box-sizing: border-box;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
		z-index: 50;
	}

	.play-list-ul li span {
		float: left;
		font-size: 16px;
	}

	.play-list-ul li:hover {
		background-color: #aaa;
    color: #fff;
    box-shadow: inset -1px 0 2px rgba(255, 255, 255, 0.8);
	}

	.play-list-ul .playing {
		color: #fff;
    background-color: #30ABD5 !important;
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
