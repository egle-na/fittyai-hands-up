(function(e){function t(t){for(var r,o,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},s=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/fittyai-hands-up/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var p=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"35b8":function(e,t,n){e.exports=n.p+"media/Well_Done_sound.e8c2ad69.mp3"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{staticClass:"container"},[r("div",{staticClass:"side-wrapper"},[r("p",{attrs:{title:"Make sure your arms are visible to your camera"}},[e._v("Raise your arms!")]),r("p",[r("span",{class:{hidden:!e.leftHandUp}},[e._v("✋")]),r("span",{class:{hidden:!e.rightHandUp}},[e._v("🤚")])]),r("p",{staticClass:"success-msg",class:{hidden:!e.bothArmsUp}},[e._v("Well Done!")]),r("audio",{ref:"wellDoneAudio",attrs:{src:n("35b8"),type:"audio/mpeg"}})]),r("div",{staticClass:"video-wrapper"},[r("video",{ref:"video",attrs:{muted:"",autoplay:"",playsinline:""},domProps:{srcObject:e.videoStream,muted:!0}}),e.accessDenied?r("p",{staticClass:"no-camera-msg"},[e._v("Unable to access your camera.")]):e._e()])])},s=[],o=n("1da1"),i=(n("96cf"),n("96e5")),c=n("141c"),u={name:"App",data:function(){return{leftHandUp:!1,rightHandUp:!1,bothArmsUp:0,videoStream:!1,accessDenied:!1}},mounted:function(){this.accessCamera(),this.enableMpPose()},methods:{accessCamera:function(){var e=this;navigator.mediaDevices.getUserMedia({video:!0}).then((function(t){e.videoStream=t})).catch((function(t){console.error(t),e.accessDenied=!0}))},enableMpPose:function(){var e=this,t=this.$refs.video,n=new i["Pose"]({locateFile:function(e){return"https://cdn.jsdelivr.net/npm/@mediapipe/pose/".concat(e)}});n.setOptions({modelComplexity:1,smoothLandmarks:!0,enableSegmentation:!0,smoothSegmentation:!0,minDetectionConfidence:.5,minTrackingConfidence:.5}),n.onResults(this.onResults);var r=new c["Camera"](t,{onFrame:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.send({image:t});case 2:case"end":return e.stop()}}),e)})));function r(){return e.apply(this,arguments)}return r}(),width:1280,height:720});r.start().catch((function(){e.accessDenied=!0}))},onResults:function(e){e.poseLandmarks&&(this.leftArmRisen(e),this.rightArmRisen(e),this.leftHandUp&&this.rightHandUp?(this.bothArmsUp++,10===this.bothArmsUp&&this.playWellDoneAudio()):this.bothArmsUp=0)},leftArmRisen:function(e){this.leftHandUp=e.poseLandmarks[11].y>e.poseLandmarks[13].y&&e.poseLandmarks[13].y>e.poseLandmarks[15].y},rightArmRisen:function(e){this.rightHandUp=e.poseLandmarks[12].y>e.poseLandmarks[14].y&&e.poseLandmarks[13].y>e.poseLandmarks[16].y},playWellDoneAudio:function(){this.$refs.wellDoneAudio.play()}}},p=u,l=(n("034f"),n("2877")),d=Object(l["a"])(p,a,s,!1,null,null,null),f=d.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(f)}}).$mount("#app")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.964bc1ef.js.map