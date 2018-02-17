webpackJsonp([1],[,,,function(t,e,s){function i(t){s(35),s(36)}var l=s(9)(s(31),s(40),i,null,null);t.exports=l.exports},,,,,,,,function(t,e,s){function i(t){s(33),s(34)}var l=s(9)(s(30),s(39),i,null,null);t.exports=l.exports},,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(3),l=s.n(i);e.default={components:{vuemusic:l.a},data:function(){return{}},methods:{},mounted:function(){function t(){e.style.height=window.innerHeight+"px",e.style.width=window.innerWidth+"px",s.style.width=window.innerWidth+"px",i.style.height=window.innerHeight-75+"px"}var e=document.getElementsByTagName("body")[0],s=document.getElementsByClassName("music")[0],i=document.getElementsByClassName("music-play-list")[0];t(),window.addEventListener("resize",function(){t()})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2),l=s.n(i);e.default={components:{},data:function(){return{musicData:[],dragData:[],dragLrc:[],dragMusicUrl:[],waveWidth:0,waveHeight:0,c1:"rgb(203,203,221)",c2:"rgb(51,47,70)",c3:"rgb(64,60,68)",cutHeight:0,listShow:0,listScroll:0,barScroll:0,listScroll2:0,barTop:0,ifPlay:!0,ifVol:0,volScales:1,planScales:0,ifCut:0,orderClass:"order-play",volLeft:0,musicLeft:0,curTime:0,ifHeader:0,audioUrl:null,playNum:0,dragNum:0,lrcData:[],lrcObj:{},lrcTime:{},lrcSecond:0,resizeHeight:0,ifMy:0,myScroll:0,scrollProp:0}},methods:{getMusicData:function(){var t=this;l.a.get("http://www.wuyayu.cn/music/beta1/static/music.json").then(function(e){t.musicData=e.data},function(t){console.log("music.json获取失败")})},dragMusic:function(){var t=this;document.addEventListener("dragover",function(t){t.preventDefault()}),document.addEventListener("drop",function(e){e.preventDefault();for(var s=e.dataTransfer.files,i=0;i<s.length;i++){var l=s[i].name.lastIndexOf(".");if("mp3"==s[i].name.substr(l+1)){var a=s[i].name.substring(0,s[i].name.lastIndexOf(".")),r=window.URL.createObjectURL(s[i]);t.dragData.push({name:a.split("-")[1].trim(),singer:a.split("-")[0].trim(),url:r})}}t.clearRepeat(t.dragData,"name"),t.showList2()})},getInput:function(){var t=event.currentTarget.files,e=t[0].name.lastIndexOf(".");if("mp3"==t[0].name.substr(e+1)){var s=t[0].name.substring(0,t[0].name.lastIndexOf(".")),i=window.URL.createObjectURL(t[0]);this.dragData.push({name:s.split("-")[1].trim(),singer:s.split("-")[0].trim(),url:i})}this.clearRepeat(this.dragData,"name"),this.showList2()},clearRepeat:function(t,e){for(var s=[],i={},l=0;l<t.length;l++)i[t[l][e]]?i[t[l][e]].push(t[l]):(i[t[l][e]]=[t[l]],s.push(t[l]));this.dragData=s,this.saveMusic()},getLrcFile:function(t){var e=this;"false"==this.$refs.listul2.getAttribute("myplay")?l.a.get("http://www.wuyayu.cn/music/beta1/static/lrc/"+t+".lrc").then(function(t){"纯音乐,请欣赏"==t.data||"后摇,请欣赏"==t.data||"暂无歌词"==t.data?(e.lrcData=t.data,e.showLrc()):(e.lrcData=t.data,e.parseLyric(e.lrcData))},function(t){e.lrcData="未找到歌词"}):(this.dragLrc="未找到歌词",this.showLrc())},parseLyric:function(t){this.lrcObj={},this.lrcTime={};for(var e=t.split("\n"),s=0;s<e.length;s++){var i=decodeURIComponent(e[s]),l=/\[\d*:\d*((\.|\:)\d*)*\]/g,a=i.match(l);if(a){var r=i.replace(l,"");this.lrcObj[s]=r,a.toString(),this.lrcTime[s]=a}}this.showLrc()},showLrc:function(){if(this.$refs.lrcul.innerHTML="","false"==this.$refs.listul2.getAttribute("myplay"))if("纯音乐,请欣赏"==this.lrcData||"后摇,请欣赏"==this.lrcData||"暂无歌词"==this.lrcData){var t=document.createElement("li");t.innerHTML=this.lrcData,this.$refs.lrcul.appendChild(t);var e=this.$refs.musiclrc.offsetHeight/2;this.$refs.lrcul.style.transform="translateY("+e+"px)"}else{for(var s in this.lrcObj){"\n\n"==this.lrcObj[s]&&console.log(1);var i=document.createElement("li");i.innerHTML=this.lrcObj[s],this.lrcTime[s]=this.lrcTime[s].toString().replace(/\[|]/g,"");var l=this.lrcTime[s].split(":");this.lrcSecond=60*Number(l[0])+1*Number(l[1]),this.lrcSecond=Math.round(this.lrcSecond),i.setAttribute("time",this.lrcSecond),i.setAttribute("ifchoose","false"),this.$refs.lrcul.appendChild(i)}for(var a=0;a<this.$refs.lrcul.children.length;a++)"\n\n"==this.$refs.lrcul.children[a].innerHTML&&this.$refs.lrcul.removeChild(this.$refs.lrcul.children[a]);this.$refs.lrcul.setAttribute("move",!0);var r=this.$refs.musiclrc.offsetHeight/2+50;this.$refs.lrcul.style.transform="translateY("+r+"px)"}else{var n=document.createElement("li");n.innerHTML=this.dragLrc,this.$refs.lrcul.appendChild(n),this.$refs.lrcul.style.transform="translateY("+pianoY+"px)"}},showLrcDiv:function(){this.$refs.musiclrc.style.opacity=1,this.$refs.musicwave.style.opacity=0},showWaveDiv:function(){this.$refs.musiclrc.style.opacity=0,this.$refs.musicwave.style.opacity=1},showTitle:function(t){var e=document.getElementById("show-title"),s=null;clearTimeout(s),e.innerHTML=t,e.style.transform="translate(-43px)",s=setTimeout(function(){e.style.transform="translate(0px)"},3e3)},playMusic:function(){for(var t=this,e=0;e<this.musicData.length;e++)t.$refs.listul.children[e].setAttribute("class","");null!==t.$refs.audio&&("false"==t.$refs.listul2.getAttribute("myplay")?(t.$refs.listul.children[t.playNum].setAttribute("class","playing"),t.ifPlay?(t.$refs.audio.play(),t.ifPlay=!1):(t.$refs.audio.pause(),t.ifPlay=!0)):t.ifPlay?(t.$refs.audio.play(),t.ifPlay=!1):(t.$refs.audio.pause(),t.ifPlay=!0))},closeVol:function(){this.ifVol?(this.ifVol=0,this.$refs.audio.volume=this.volScales):(this.ifVol=1,this.$refs.audio.volume=0)},volClick:function(t){var e=document.getElementsByClassName("vol-bar-btn")[0],s=document.getElementsByClassName("vol-plan")[0],i=(document.getElementsByClassName("music-vol")[0],document.getElementsByClassName("music-wrap")[0]),l=document.getElementsByClassName("vol-bar")[0];this.volLeft=t.clientX-l.offsetLeft-i.offsetLeft-3,e.style.left=this.volLeft-e.offsetWidth/2+"px",this.volScales=e.offsetLeft/l.offsetWidth,this.volScales>0?(document.getElementById("audio").volume=this.volScales,s.style.width=l.offsetWidth*this.volScales+"px",this.ifVol=1,this.closeVol()):0==this.volScales&&(document.getElementById("audio").volume=this.volScales,e.style.left="-6px",s.style.width="6px",this.ifVol=0,this.closeVol())},volDrag:function(){var t=document.getElementsByClassName("vol-bar-btn")[0],e=document.getElementsByClassName("vol-bar")[0],s=document.getElementsByClassName("vol-plan")[0],i=(document.getElementsByClassName("music-vol")[0],document.getElementsByClassName("music-wrap")[0]),l=this;document.onmousemove=function(a){l.volLeft=a.clientX-e.offsetLeft-i.offsetLeft-t.offsetWidth/2,l.volLeft=l.volLeft+3,l.volLeft<=0&&(l.volLeft=0),l.volLeft>=e.offsetWidth&&(l.volLeft=e.offsetWidth),t.style.left=l.volLeft-6+"px",l.volScales=t.offsetLeft/e.offsetWidth,l.volScales>0?(document.getElementById("audio").volume=l.volScales,s.style.width=e.offsetWidth*l.volScales+"px",l.ifVol=1,l.closeVol()):0==l.volScales&&(document.getElementById("audio").volume=l.volScales,s.style.width="-6px",l.ifVol=0,l.closeVol())},document.onmouseup=function(){l.volScales=t.offsetLeft/e.offsetWidth,document.onmousemove=null,document.onmousedown=null}},planClick:function(t){var e=document.getElementById("audio"),s=document.getElementsByClassName("music-drag")[0],i=document.getElementsByClassName("music-bar")[0],l=document.getElementsByClassName("music-plan")[0],a=(document.getElementsByClassName("music-show")[0],document.getElementsByClassName("music-wrap")[0]);this.musicLeft=t.clientX-a.offsetLeft-i.offsetLeft-6,this.planScales=this.musicLeft/i.offsetWidth,s.style.left=this.musicLeft+"px",l.style.width=i.offsetWidth*this.planScales+"px",e.currentTime=e.duration*this.planScales,this.ifPlay=!0,this.playMusic(),this.curTime=Math.round(e.currentTime),this.dragScroll()},planDrag:function(){var t=document.getElementById("audio"),e=document.getElementsByClassName("music-drag")[0],s=document.getElementsByClassName("music-bar")[0],i=document.getElementsByClassName("music-plan")[0],l=(document.getElementsByClassName("music-show")[0],document.getElementsByClassName("music-wrap")[0]);this.ifPlay=!1,this.playMusic();var a=this;document.onmousemove=function(t){a.musicLeft=t.clientX-s.offsetLeft-l.offsetLeft-e.offsetWidth/2,a.musicLeft<=0&&(a.musicLeft=0),a.musicLeft>=s.offsetWidth&&(a.musicLeft=s.offsetWidth),a.planScales=a.musicLeft/s.offsetWidth,e.style.left=a.musicLeft+"px",i.style.width=s.offsetWidth*a.planScales+"px"},document.onmouseup=function(){a.planScales=e.offsetLeft/s.offsetWidth,t.currentTime=t.duration*a.planScales,a.ifPlay=!0,a.playMusic(),document.onmousemove=null,document.onmousedown=null,document.onmouseup=null,a.curTime=Math.round(t.currentTime.toFixed(1)),a.dragScroll()}},cutOrder:function(){this.curOrderFn()},curOrderFn:function(){0==this.ifCut?(this.orderClass="random-play",this.ifCut=1,this.showTitle("随机播放")):1==this.ifCut?(this.orderClass="one-play",this.ifCut=2,this.showTitle("单曲循环")):2==this.ifCut?(this.orderClass="list-play",this.ifCut=3,this.showTitle("列表循环")):(this.orderClass="order-play",this.ifCut=0,this.showTitle("顺序循环"))},throttle:function(t,e,s){var i=null,l=(new Date).getTime();return function(){var a=this,r=arguments,n=(new Date).getTime();clearTimeout(i),console.log(n-l),n-l>=s?t.apply(a,r):i=setTimeout(function(){t.apply(a,r)},e)}},showList:function(){0==this.listShow?(this.$refs.playlist.style.transform="translate(0)",this.$refs.musictop.style.width=window.innerWidth-232+"px",this.$refs.musictop.style.transform="translateY(63px)",this.$refs.musiclrc.style.height=window.innerHeight-85-95+"px",this.$refs.musicwave.style.height=window.innerHeight-85-200+"px",this.dragScroll(),this.listShow=1,this.$refs.playlist.setAttribute("ifshow",1),this.waveWidth=this.$refs.musicwave.offsetWidth,this.waveHeight=this.$refs.musicwave.offsetHeight):(this.$refs.playlist.style.transform="translate(-230px)",this.$refs.musictop.style.width=window.innerWidth+"px",this.$refs.musictop.style.transform="translateY(0px)",this.$refs.musiclrc.style.height=this.$refs.musiclrc.offsetHeight+50+"px",this.$refs.musicwave.style.height=this.$refs.musicwave.offsetHeight+50+"px",this.dragScroll(),this.listShow=0,this.$refs.playlist.setAttribute("ifshow",0),this.waveWidth=this.$refs.musicwave.offsetWidth,this.waveHeight=this.$refs.musicwave.offsetHeight)},listWell:function(){var t=this,e=document.getElementById("list-bar"),s=document.getElementsByClassName("list-bar-wrap")[0],i=document.getElementsByClassName("play-list-ul")[0],l=null;console.log(11),t.$refs.playlist.onmouseover=function(){e.style.opacity=1},t.$refs.playlist.onmouseout=function(){clearTimeout(l),l=setTimeout(function(){e.style.opacity=0},3e3)},t.$refs.listul.onmousewheel=function(l){var a=s.offsetHeight+7,r=i.offsetHeight-200;l.wheelDelta<0?t.listScroll+=60:l.wheelDelta>0&&(t.listScroll-=60),t.listScroll<=-60&&(t.listScroll=-60),t.listScroll>=t.$refs.listul.offsetHeight-t.$refs.playlist.offsetHeight+60&&(t.listScroll=t.$refs.listul.offsetHeight-t.$refs.playlist.offsetHeight+60);var n=parseInt(t.listScroll*(a/r));if(e.style.transform="translateY("+n+"px)",parseInt(e.style.transform.substring(11))<=0&&(e.style.transform="translateY(0px)",t.barScroll=0),parseInt(e.style.transform.substring(11))>=a-7-66){var u=a-7-66;e.style.transform="translateY("+u+"px)",t.barScroll=u}else t.barScroll=parseInt(e.style.transform.substring(11));t.$refs.listul.style.transform="translateY(-"+t.listScroll+"px)"}},listBar:function(t){var e=this,s=document.getElementById("list-bar"),i=document.getElementsByClassName("play-list-ul")[0],l=(document.getElementsByClassName("list-ul2")[0],document.getElementsByClassName("list-bar-wrap")[0]),a=t.clientY;e.barTop=parseInt(s.style.transform.substring(11));for(var r=0,n=0;n<i.children.length-1;n++)r+=i.children[n].offsetHeight;r-=20,document.onmousemove=function(t){var n=t.clientY;e.barScroll=n-a+e.barTop,e.barScroll>l.offsetHeight-66&&(e.barScroll=l.offsetHeight-66),e.barScroll<=0&&(e.barScroll=0),s.style.transform="translateY("+e.barScroll+"px)";var u=-e.barScroll*(r/l.offsetHeight);i.style.transform="translateY("+u+"px)",e.listScroll=-parseInt(i.style.transform.substring(11))},document.onmouseup=function(){document.onmousemove=null,document.onmousedown=null,document.onmouseup=null}},listWell2:function(){var t=this;t.$refs.listul2.onmousewheel=function(e){for(var s=0,i=0;i<t.$refs.listul2.children.length;i++)s+=t.$refs.listul2.children[i].offsetHeight;s<t.$refs.playlist.offsetHeight-61||(e.wheelDelta<0?t.listScroll2+=60:e.wheelDelta>0&&(t.listScroll2-=60),t.listScroll2<=-60&&(t.listScroll2=-60),t.listScroll2>=t.$refs.listul2.offsetHeight-t.$refs.playlist.offsetHeight+60&&(t.listScroll2=t.$refs.listul2.offsetHeight-t.$refs.playlist.offsetHeight+60),t.$refs.listul2.style.top=-t.listScroll2+"px")}},firstGet:function(){this.$refs.audio.src=this.musicData[0].url,this.$refs.showname.innerHTML=this.musicData[0].name+" - "+this.musicData[0].singer;var t=this;this.$refs.audio.addEventListener("canplaythrough",function(){t.timeActive()}),this.getLrcFile(this.musicData[0].name)},timeActive:function(){var t=parseInt(this.$refs.audio.duration%60),e=parseInt(this.$refs.audio.duration/60);t<=9&&(t="0"+t),e<=9&&(e="0"+e),this.$refs.alltime.innerHTML=e+":"+t;var s=parseInt(this.$refs.audio.currentTime%60),i=parseInt(this.$refs.audio.currentTime/60);s<=9&&(s="0"+s),i<=9&&(i="0"+i),this.$refs.curtime.innerHTML=i+":"+s},getMusicTime:function(){var t=document.getElementById("audio"),e=document.getElementsByClassName("music-drag")[0],s=document.getElementsByClassName("music-bar")[0],i=document.getElementsByClassName("music-plan")[0],l=this;t.addEventListener("timeupdate",function(){l.curTime=Math.round(t.currentTime),l.planScales=t.currentTime/t.duration,i.style.width=s.offsetWidth*l.planScales+"px",e.style.left=s.offsetWidth*l.planScales+"px",l.timeActive(),"纯音乐,请欣赏"==l.lrcData&&"未找到歌词"==l.dragLrc||l.lrcScroll()})},lrcScroll:function(){if("false"==this.$refs.listul2.getAttribute("myplay")){var t=0;if("true"==this.$refs.lrcul.getAttribute("move"))for(var e=this.$refs.lrcul.children,s=0;s<e.length;s++){var i=0;if(e[s].getAttribute("time")==this.curTime&&"false"==e[s].getAttribute("ifchoose")){for(var l=0;l<e.length;l++)e[l].setAttribute("class","");t++,1===t&&(e[s].setAttribute("class","playing"),e[s].setAttribute("ifchoose","true"),i=e[s-1].offsetHeight),2===t&&(e[s].setAttribute("class","playing"),e[s-1].setAttribute("class","playing"),e[s].setAttribute("ifchoose","true"),e[s-1].setAttribute("ifchoose","true"),i=e[s-1].offsetHeight+e[s-2].offsetHeight,i/=2),3===t&&(e[s].setAttribute("class","playing"),e[s-1].setAttribute("class","playing"),e[s-2].setAttribute("class","playing"),e[s].setAttribute("ifchoose","true"),e[s-1].setAttribute("ifchoose","true"),e[s-2].setAttribute("ifchoose","true"),i=e[s-1].offsetHeight+e[s-2].offsetHeight+e[s-3].offsetHeight,i/=2),4===t&&(e[s].setAttribute("class","playing"),e[s-1].setAttribute("class","playing"),e[s-2].setAttribute("class","playing"),e[s-3].setAttribute("class","playing"),e[s].setAttribute("ifchoose","true"),e[s-1].setAttribute("ifchoose","true"),e[s-2].setAttribute("ifchoose","true"),e[s-3].setAttribute("ifchoose","true"),i=e[s-1].offsetHeight+e[s-2].offsetHeight+e[s-3].offsetHeight+e[s-4].offsetHeight);var a=parseInt(this.$refs.lrcul.style.transform.substring(11)),r=a-i;this.$refs.lrcul.style.transform="translateY("+r+"px)"}}}},dragScroll:function(){if("false"==this.$refs.listul2.getAttribute("myplay")){for(var t=document.getElementsByClassName("lrc-ul")[0].children,e=document.getElementsByClassName("lrc-ul")[0],s=document.getElementsByClassName("music-lrc")[0],i=0,l=0,a=0;a<t.length;a++)t[a].setAttribute("class","");if(1==t.length);else{i=0,l=0;for(var r=0;r<t.length;r++)t[r].getAttribute("time")<=this.curTime&&(i++,l+=t[r].offsetHeight,t[r].setAttribute("class",""));if(0==i){var n=this.$refs.musiclrc.offsetHeight/2+50;e.style.transform="translateY("+n+"px)"}else{var u=s.offsetHeight/2-l+40;e.style.transform="translateY("+u+"px)",i<3?1==i?t[0].getAttribute("time")==t[1].getAttribute("time")?(u=s.offsetHeight/2-l+100,e.style.transform="translateY("+u+"px)",t[0].setAttribute("class","playing"),t[1].setAttribute("class","playing")):(u=this.$refs.musiclrc.offsetHeight/2+50,e.style.transform="translateY("+u+"px)",t[0].setAttribute("class","playing")):2==i&&(u=s.offsetHeight/2-l+100,e.style.transform="translateY("+u+"px)",t[0].setAttribute("class","playing"),t[1].setAttribute("class","playing")):t[i-1].getAttribute("time")==t[i-2].getAttribute("time")?(t[i-1].setAttribute("class","playing"),t[i-2].setAttribute("class","playing"),u=s.offsetHeight/2-l+60,e.style.transform="translateY("+u+"px)"):t[i-1].getAttribute("time")==t[i].getAttribute("time")?(t[i-1].setAttribute("class","playing"),t[i].setAttribute("class","playing"),u=s.offsetHeight/2-l+60,e.style.transform="translateY("+u+"px)"):t[i-1].setAttribute("class","playing")}}}},musicEndsPlay:function(){if("false"==this.$refs.listul2.getAttribute("myplay")){document.getElementById("audio").src=this.musicData[this.playNum].url,this.$refs.listul.children[this.playNum].setAttribute("class","playing"),this.$refs.showname.innerHTML=this.musicData[this.playNum].name+" - "+this.musicData[this.playNum].singer,this.getMusicTime(),this.ifPlay=!0,this.playMusic(),this.getLrcFile(this.musicData[this.playNum].name)}else{document.getElementById("audio").src=this.dragData[this.dragNum].url,this.$refs.listul2.children[this.dragNum].setAttribute("class","playing"),this.$refs.showname.innerHTML=this.dragData[this.dragNum].name+" - "+this.dragData[this.dragNum].singer,this.getMusicTime(),this.ifPlay=!0,this.playMusic()}},whatKind:function(){var t=this;if("false"==t.$refs.listul2.getAttribute("myplay")){for(var e=0;e<this.musicData.length;e++)t.$refs.listul.children[e].setAttribute("class","");0==t.ifCut?(t.playNum+=1,t.playNum>=t.musicData.length-1&&(t.playNum=t.musicData.length-1),t.musicEndsPlay()):1==t.ifCut?(t.playNum=parseInt(Math.random()*t.musicData.length),t.musicEndsPlay()):2==t.ifCut?t.musicEndsPlay():(t.playNum+=1,t.playNum>=t.musicData.length&&(t.playNum=0),t.musicEndsPlay())}else{for(var e=0;e<t.$refs.listul2.children.length;e++)"addmy"==t.$refs.listul2.children[e].getAttribute("class")||t.$refs.listul2.children[e].setAttribute("class","");0==t.ifCut?(t.dragNum+=1,t.dragNum>=t.dragData.length-1&&(t.dragNum=t.dragData.length-1),t.musicEndsPlay()):1==t.ifCut?(t.dragNum=parseInt(Math.random()*t.dragData.length),t.musicEndsPlay()):2==t.ifCut?t.musicEndsPlay():(t.dragNum+=1,t.dragNum>=t.dragData.length&&(t.dragNum=0),t.musicEndsPlay())}},whatKind2:function(){var t=this;if("false"==t.$refs.listul2.getAttribute("myplay")){for(var e=0;e<this.musicData.length;e++)t.$refs.listul.children[e].setAttribute("class","");0==t.ifCut?(t.playNum-=1,t.playNum<=0&&(t.playNum=0),t.musicEndsPlay()):1==t.ifCut?(t.playNum=parseInt(Math.random()*t.musicData.length),t.musicEndsPlay()):2==t.ifCut?t.musicEndsPlay():(t.playNum-=1,t.playNum<0&&(t.playNum=t.musicData.length-1),t.musicEndsPlay())}else{for(var e=0;e<t.$refs.listul2.children.length;e++)"addmy"==t.$refs.listul2.children[e].getAttribute("class")||t.$refs.listul2.children[e].setAttribute("class","");0==t.ifCut?(t.dragNum-=1,t.dragNum<=0&&(t.dragNum=0),t.musicEndsPlay()):1==t.ifCut?(t.dragNum=parseInt(Math.random()*t.dragData.length),t.musicEndsPlay()):2==t.ifCut?t.musicEndsPlay():(t.dragNum-=1,t.dragNum<0&&(t.dragNum=thatdragData.length-1),t.musicEndsPlay())}},headerClick:function(){0==this.ifHeader?(this.$refs.headerul.style.display="block",this.ifHeader=1):(this.$refs.headerul.style.display="none",this.ifHeader=0)},showList1:function(){this.ifMy=0,this.$refs.headerul.children[1].setAttribute("class",""),this.$refs.headerul.children[0].setAttribute("class","choose"),this.$refs.listul.style.left="0",this.$refs.listul2.style.left="-230px",this.$refs.listul2.setAttribute("myplay","false"),this.listNum()},showList2:function(){this.ifMy=1,this.$refs.headerul.children[0].setAttribute("class",""),this.$refs.headerul.children[1].setAttribute("class","choose"),this.$refs.listul2.style.left="0",this.$refs.listul.style.left="-230px",this.$refs.listul2.setAttribute("myplay","true"),this.listNum()},listClick:function(){var t=document.getElementById("audio").src,e=document.getElementById("audio"),s=event.currentTarget;e.setAttribute("dataNum",s.getAttribute("num")),this.playNum=s.getAttribute("num")-0,this.audioUrl=this.musicData[this.playNum].url,this.$refs.listul2.setAttribute("myplay","false");for(var i=0;i<this.$refs.listul2.children.length;i++)"addmy"==this.$refs.listul2.children[i].getAttribute("class")||this.$refs.listul2.children[i].setAttribute("class","");if(t==this.audioUrl)s.setAttribute("class","playing"),this.playMusic();else{for(var i=0;i<this.musicData.length;i++)this.$refs.listul.children[i].setAttribute("class","");e.src=this.audioUrl,this.ifPlay=!0,this.$refs.showname.innerHTML=this.musicData[this.playNum].name+" - "+this.musicData[this.playNum].singer,s.setAttribute("class","playing"),this.playMusic()}this.getLrcFile(this.musicData[this.playNum].name)},listClick2:function(){var t=document.getElementById("audio").src,e=document.getElementById("audio"),s=event.currentTarget,i=s.getAttribute("num")-0;this.audioUrl=this.dragData[i].url,this.$refs.listul2.setAttribute("myplay","true"),this.dragNum=i;for(var l=0;l<this.musicData.length;l++)this.$refs.listul.children[l].setAttribute("class","");if(t==this.audioUrl)s.setAttribute("class","playing"),this.playMusic();else{for(var l=0;l<this.$refs.listul2.children.length;l++)"addmy"==this.$refs.listul2.children[l].getAttribute("class")||this.$refs.listul2.children[l].setAttribute("class","");e.src=this.audioUrl,this.ifPlay=!0,this.$refs.showname.innerHTML=this.dragData[i].name+" - "+this.dragData[i].singer,s.setAttribute("class","playing"),this.playMusic()}this.getLrcFile(this.dragData[this.dragNum].name)},listNum:function(){var t=document.getElementsByClassName("music-list-img")[0];0==this.ifMy?t.innerHTML=this.musicData.length:t.innerHTML=this.dragData.length},removeLi:function(){var t=event.currentTarget,e=t.parentNode,s=e.getAttribute("num");this.dragData.splice(s,1),window.localStorage.clear(),this.saveMusic()},saveMusic:function(){},Visualizer:function(){function t(){var s=n.width,i=n.height-2,a=s/20,f=(Math.ceil(2*Math.random()),new Uint8Array(r.frequencyBinCount));r.getByteFrequencyData(f),r.fftSize=4096;var m=Math.round(f.length/a);l.clearRect(0,0,s,i);for(var h=0;h<a;h++){var d=f[h*m];o.length<Math.round(a)&&o.push(d),l.fillStyle=h%5==0?e.c1:h%2==0?e.c2:e.c3,d<o[h]?l.fillRect(20*h,i- --o[h],u,c+5):(l.fillRect(20*h,i-d,u,c+5),o[h]=d,0==d&&l.fillRect(20*h,i-d+c-20,u,c+9)),l.fillStyle=h%5==0?e.c1:h%2==0?e.c2:e.c3,l.fillRect(20*h,i-d+c+15,u,i)}requestAnimationFrame(t)}var e=this,s=document.getElementById("audio"),i=window.AudioContext||window.webkitAudioContext,l=new i,a=l.createMediaElementSource(s),r=l.createAnalyser();a.connect(r),r.connect(l.destination);var n=document.getElementById("canvas"),u=18,c=5,o=[],l=n.getContext("2d"),f=l.createLinearGradient(0,0,0,300);f.addColorStop(1,"#0f0"),f.addColorStop(.5,"#ff0"),f.addColorStop(0,"#f00"),t()}},mounted:function(){function t(t,s,i){e.c1=t,e.c2=s,e.c3=i}this.getMusicData(),this.dragMusic(),this.listWell(),this.listWell2(),this.getMusicTime(),this.saveMusic();var e=this,s=document.getElementById("audio"),i=document.getElementsByClassName("music-play-list")[0],l=document.getElementsByClassName("imgurl"),a=(document.getElementsByClassName("list-ul")[0].children,document.getElementsByClassName("list-bar-wrap")[0]);if(window.localStorage.length>=3)for(var r=window.localStorage,n=0;n<r.length/3;n++)e.dragData.push({name:r["name"+n],singer:r["singer"+n],url:r["url"+n]});for(var n=0;n<l.length;n++)l[n].index=n,l[n].addEventListener("click",function(){for(var e=0;e<l.length;e++)l[e].classList.remove("current");this.classList.add("current");var s=this.getAttribute("imgurl");document.body.style.backgroundImage="url("+s+")",0===this.index?t("rgb(203,203,221)","rgb(51,47,70)","rgb(64,60,68)"):1===this.index?t("rgb(105,214,215)","rgb(93,162,255)","rgb(160,185,254)"):2===this.index?t("rgb(237,199,188)","rgb(207,197,209)","rgb(98,67,49)"):3===this.index?t("rgb(78,55,47)","rgb(31,48,56)","rgb(252,147,90)"):4===this.index?t("rgb(94,192,162)","rgb(125,92,57)","rgb(106,217,222)"):5===this.index&&t("rgb(235,170,216)","rgb(202,249,254)","rgb(188,120,211)")});document.onkeydown=function(t){t&&32==t.keyCode&&e.playMusic()},document.addEventListener("click",function(){e.$refs.headerul.style.display="none",e.ifHeader=0}),function(){e.$refs.playlist.style.height=window.innerHeight-75+"px",a.style.height=window.innerHeight-75-61+"px",e.$refs.musictop.style.width=window.innerWidth+"px",e.$refs.musiclrc.style.height=window.innerHeight-85-95+"px",e.$refs.musiclrc.style.height=e.$refs.musiclrc.offsetHeight+50+"px",e.$refs.musicwave.style.height=window.innerHeight-85-200+"px",e.$refs.musicwave.style.height=e.$refs.musicwave.offsetHeight+50+"px",e.waveWidth=e.$refs.musicwave.offsetWidth,e.waveHeight=e.$refs.musicwave.offsetHeight}(),window.addEventListener("resize",function(){"1"==i.getAttribute("ifshow")?(e.$refs.musictop.style.width=window.innerWidth-232+"px",e.$refs.musiclrc.style.height=window.innerHeight-85-95+"px",e.$refs.musicwave.style.height=window.innerHeight-85-200+"px",e.waveWidth=e.$refs.musicwave.offsetWidth,e.waveHeight=e.$refs.musicwave.offsetHeight,e.showLrc(),e.dragScroll()):(e.$refs.musictop.style.width=window.innerWidth+"px",e.$refs.musiclrc.style.height=window.innerHeight-85-95+"px",e.$refs.musiclrc.style.height=e.$refs.musiclrc.offsetHeight+50+"px",e.$refs.musicwave.style.height=window.innerHeight-85-200+"px",e.$refs.musicwave.style.height=e.$refs.musicwave.offsetHeight+50+"px",e.waveWidth=e.$refs.musicwave.offsetWidth,e.waveHeight=e.$refs.musicwave.offsetHeight,e.showLrc(),e.dragScroll())}),s.addEventListener("timeupdate",function(){if(s.ended)if("false"==e.$refs.listul2.getAttribute("myplay")){for(var t=0;t<e.musicData.length;t++)e.$refs.listul.children[t].setAttribute("class","");0==e.ifCut?(e.playNum+=1,e.playNum>=e.musicData.length-1&&(e.playNum=e.musicData.length-1),e.musicEndsPlay()):1==e.ifCut?(e.playNum=parseInt(Math.random()*e.musicData.length),e.musicEndsPlay()):2==e.ifCut?e.musicEndsPlay():(e.playNum+=1,e.playNum>=e.musicData.length&&(e.playNum=0),e.musicEndsPlay())}else{for(var t=0;t<e.$refs.listul2.children.length;t++)"addmy"==e.$refs.listul2.children[t].getAttribute("class")||e.$refs.listul2.children[t].setAttribute("class","");0==e.ifCut?(e.dragNum+=1,e.dragNum>=e.dragData.length-1&&(e.dragNum=e.dragData.length-1),e.musicEndsPlay()):1==e.ifCut?(e.dragNum=parseInt(Math.random()*e.dragData.length),e.musicEndsPlay()):2==e.ifCut?e.musicEndsPlay():(e.dragNum+=1,e.dragNum>=e.dragData.length&&(e.dragNum=0),e.musicEndsPlay())}})},watch:{musicData:function(t,e){var s=this;s.firstGet(),s.Visualizer(),document.oncontextmenu=function(t){s.showList()},s.listNum()}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(12),l=s(11),a=s.n(l),r=s(2),n=s.n(r),u=s(10),c=s.n(u),o=s(3);s.n(o);i.a.config.productionTip=!1,i.a.use(c.a,n.a),new i.a({el:"#app",template:"<App/>",components:{App:a.a}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("vuemusic")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"music-wrap"}},[s("div",{staticClass:"music"},[s("audio",{ref:"audio",attrs:{id:"audio",crossOrigin:"anonymous",dataNum:"0"}}),t._v(" "),s("input",{staticClass:"hidden file",attrs:{type:"file",accept:"audio/mp3",id:"input-file"}}),t._v(" "),s("div",{staticClass:"show-title show-title-hide",attrs:{id:"show-title"}},[t._v("\n        顺序播放\n      ")]),t._v(" "),s("div",{staticClass:"music-wrap"},[s("div",{staticClass:"music-btn"},[s("a",{staticClass:"c-btn prev",attrs:{id:"prev",title:"上一首"},on:{click:function(e){t.whatKind2()}}}),t._v(" "),s("a",{staticClass:"c-btn",class:t.ifPlay?"play":"pause",attrs:{title:"播放/暂停"},on:{click:function(e){t.playMusic()}}}),t._v(" "),s("a",{staticClass:"c-btn next",attrs:{id:"next",title:"下一首"},on:{click:function(e){t.whatKind()}}})]),t._v(" "),s("div",{staticClass:"music-show"},[s("div",{staticClass:"music-name"},[s("div",{ref:"showname",staticClass:"music-show-name"}),t._v(" "),s("div",{staticClass:"music-time"},[s("span",{ref:"curtime",staticClass:"time-second"},[t._v("00:00")]),s("span",{staticClass:"time-gang"},[t._v(" / ")]),s("span",{ref:"alltime",staticClass:"time-all"},[t._v("00:00")])])]),t._v(" "),s("div",{staticClass:"music-bar",on:{click:t.planClick}},[s("div",{staticClass:"music-plan"}),t._v(" "),s("div",{staticClass:"music-drag",on:{mousedown:function(e){e.stopPropagation(),t.planDrag(e)}}})])]),t._v(" "),s("div",{staticClass:"music-order"},[s("a",{staticClass:"c-btn order-play",class:this.orderClass,on:{click:function(e){t.cutOrder()}}})]),t._v(" "),s("div",{staticClass:"music-vol"},[s("a",{staticClass:"c-btn vol-btn",class:t.ifVol?"vol-close":"vol-btn",on:{click:t.closeVol}}),t._v(" "),s("div",{staticClass:"vol-bar",on:{click:function(e){e.stopPropagation(),t.volClick(e)}}},[s("div",{staticClass:"vol-plan"}),t._v(" "),s("div",{staticClass:"vol-bar-btn",on:{mousedown:function(e){e.stopPropagation(),t.volDrag(e)}}})])]),t._v(" "),s("div",{staticClass:"music-list"},[s("a",{staticClass:"music-list-img",on:{click:function(e){t.showList()}}})])])]),t._v(" "),s("div",{ref:"playlist",staticClass:"music-play-list",attrs:{ifshow:"0"}},[s("div",{staticClass:"play-list-header",on:{click:function(e){e.stopPropagation(),t.headerClick()}}},[t._v("Play List\n      ")]),t._v(" "),s("div",{staticClass:"list-bar-wrap"},[s("div",{staticClass:"list-bar",attrs:{id:"list-bar"},on:{mousedown:t.listBar}})]),t._v(" "),s("ul",{ref:"headerul",staticClass:"list-header-ul"},[s("li",{staticClass:"choose",on:{click:function(e){t.showList1()}}},[t._v("推荐音乐")]),t._v(" "),s("li",{on:{click:function(e){t.showList2()}}},[t._v("我的音乐")])]),t._v(" "),s("ul",{ref:"listul",staticClass:"play-list-ul list-ul"},t._l(t.musicData,function(e,i){return s("li",{attrs:{num:i,musicName:e.name},on:{click:function(e){t.listClick()}}},[s("span",[t._v(t._s(i+1)+".")]),t._v(t._s(e.name)+" - "+t._s(e.singer)+"\n        ")])})),t._v(" "),s("ul",{ref:"listul2",staticClass:"list-ul list-ul2",attrs:{myplay:"false"}},[t._l(t.dragData,function(e,i){return s("li",{attrs:{num:i,musicName:e.name,datasrc:e.url},on:{click:function(e){e.stopPropagation(),t.listClick2()}}},[s("span",[t._v(t._s(i+1)+".")]),t._v(t._s(e.name)+" - "+t._s(e.singer)+"\n          "),s("div",{staticClass:"ul2-close",on:{click:function(e){e.stopPropagation(),t.removeLi()}}},[t._v("\n            ×\n          ")])])}),t._v(" "),s("li",{staticClass:"addmy"},[s("input",{staticClass:"file",attrs:{type:"file",accept:"audio/mp3",id:"input-file"},on:{change:function(e){t.getInput()}}}),t._v(" "),s("span",{staticClass:"myline b-topleft add-tranition"}),t._v(" "),s("span",{staticClass:"myline b-bottomleft add-tranition"}),t._v(" "),s("span",{staticClass:"myline b-topright add-tranition"}),t._v(" "),s("span",{staticClass:"myline b-bottomright add-tranition"}),t._v(" "),s("span",{staticClass:"shu add-tranition"}),t._v(" "),s("span",{staticClass:"hen add-tranition"})])],2)]),t._v(" "),s("div",{ref:"musictop",staticClass:"music-top"},[s("ul",[s("li",{staticClass:"top-one",on:{click:function(e){t.showLrcDiv()}}},[s("a",[t._v("是歌词哟")])]),t._v(" "),s("li",{staticClass:"top-two",on:{click:function(e){t.showWaveDiv()}}},[s("a",[t._v("是波形啦")])])]),t._v(" "),t._m(0),t._v(" "),s("div",{ref:"musiclrc",staticClass:"music-lrc"},[s("ul",{ref:"lrcul",staticClass:"lrc-ul"},[s("li",[t._v("请选择歌曲")])])]),t._v(" "),s("div",{ref:"musicwave",staticClass:"music-wave"},[s("canvas",{attrs:{id:"canvas",width:this.waveWidth+120,height:this.waveHeight}})])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"choose-img2 choose-img"},[s("ul",[s("li",{staticClass:"imgurl current",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m1.jpg"}}),t._v(" "),s("li",{staticClass:"imgurl",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m9.jpg"}}),t._v(" "),s("li",{staticClass:"imgurl",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m3.jpg"}}),t._v(" "),s("li",{staticClass:"imgurl",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m4.jpg"}}),t._v(" "),s("li",{staticClass:"imgurl",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m7.jpg"}}),t._v(" "),s("li",{staticClass:"imgurl",attrs:{imgurl:"http://p46wrelzu.bkt.clouddn.com/2018m6.jpg"}})])])}]}}],[32]);
//# sourceMappingURL=app.b3373d80d81d12dd3497.js.map