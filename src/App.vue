<template>
  <main class="container">

    <div class="side-wrapper">
      <p>Raise your arms!</p>
      <p><span :class="{'hidden': !leftHandUp}">✋</span><span :class="{'hidden': !rightHandUp}">🤚</span></p>
      <p :class="{'hidden': !bothArmsUp}" class="success-msg">Well Done!</p>
      <audio ref="wellDoneAudio" src="./assets/sound/Well_Done_sound.mp3" type="audio/mpeg" />
    </div>

    <div class="video-wrapper">
      <canvas ref="canvas" />
      <video ref="video" :srcObject.prop="videoStream" muted autoplay playsinline />
      <p v-if="accessDenied" class="no-camera-msg">Unable to access your camera.</p>
    </div>


  </main>
</template>

<script>
// import {Pose } from "@mediapipe/pose";
import {Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import {Camera} from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks} from "@mediapipe/drawing_utils"

export default {
  name: 'App',
  data() {
    return {
      leftHandUp: false,
      rightHandUp: false,
      bothArmsUp: 0,

      videoStream: false,
      accessDenied: false,

      canvasElement: '',
      canvasCtx: ""
    }
  },
  mounted() {
    this.enableMpPose();
  },
  methods: {
    // accessCamera() {
    //   navigator.mediaDevices.getUserMedia({video:true}).then( stream => {
    //     this.videoStream = stream;
    //     console.log("got stream");
    //     console.log("got stream");
    //     console.log(stream);
    //     console.log(stream.getVideoTracks());
    //
    //   }).catch(error => {
    //     console.error(error);
    //     this.accessDenied = true;
    //   })
    // },

    enableMpPose(){
      const videoElement = this.$refs.video;
      this.canvasElement = this.$refs.canvas;
      this.canvasCtx = this.canvasElement.getContext('2d');

      const pose = new Pose({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }});
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      pose.onResults(this.onResults);

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({image: videoElement});
        },
        width: 1280,
        height: 720
      });
      camera.start().catch(() => {this.accessDenied = true} );
    },

    onResults(results) {
      if (!results.poseLandmarks) return;

      // Draw skeleton
      this.canvasCtx.save();
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#ffffff', lineWidth: 2});
      drawLandmarks(this.canvasCtx, results.poseLandmarks, {color: '#ffffff', fillColor: '#131d47',lineWidth: 2, radius: 3});
      this.canvasCtx.restore();

      this.leftArmRisen(results);
      this.rightArmRisen(results);
      if(this.leftHandUp && this.rightHandUp) {
        this.bothArmsUp ++;
        if(this.bothArmsUp === 10) this.playWellDoneAudio(); // 10 frames for accidents or errors
      } else this.bothArmsUp = 0;
    },

    leftArmRisen(results) {
      // 11 - wrist, 13 - elbow, 15 - wrist
      this.leftHandUp = results.poseLandmarks[11].y > results.poseLandmarks[13].y
          && results.poseLandmarks[13].y > results.poseLandmarks[15].y;
    },

    rightArmRisen(results) {
      // 12 - wrist, 14 - elbow, 16 - wrist
     this.rightHandUp = results.poseLandmarks[12].y > results.poseLandmarks[14].y
          && results.poseLandmarks[13].y > results.poseLandmarks[16].y;
    },

    playWellDoneAudio() {
      this.$refs.wellDoneAudio.play();
    }
  }
}
</script>

<style>
  * { box-sizing: border-box}

  body {
    background: #131d47;
    color: #fff;
    font-family: 'League Spartan', sans-serif;
  }

  main {
    padding-top: 3em;
    display: flex;
  }

  .container {
    width: 95%;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .video-wrapper {
    position: relative;
    background: #ffffff22;
  }

  video {
    width: 100%;
    display: block;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .no-camera-msg {
    margin: 0;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .side-wrapper {
    text-align: center;
    font-size: 1.4em;
  }

  .hidden {
    visibility: hidden;
  }

  @media (min-width: 720px) {
    .container{
      flex-direction: row;
      align-items: center;
    }
    .video-wrapper{
      width: 65%;
    }
    .side-wrapper{
      order: 1;
      width: 45%;
      font-size: 1.5em;
    }
  }

  @media (min-width: 1200px) {
    .side-wrapper {
      font-size: 2em;
    }
  }
</style>
