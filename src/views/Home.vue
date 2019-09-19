<template lang='pug'>
div#home
  video#jagermeister-video(muted playsinline)
    //- source(src='' type='application/x-mpegURL')
    //- source(src='../assets/jagermeister.mp4' type='video/mp4')
    //- source(src='' type='video/mp4')
    //- source(src='../assets/hls/index.m3u8', type='application/x-mpegURL')
  MainNav
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';
import BackImage from '@/components/BackImage.vue';
import Hls from 'hls.js';

@Component({
  components: {
    MainNav,
  },
})
export default class Home extends Vue {
  private mounted() {
    const video = document.getElementById('jagermeister-video') as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('https://express.management/hls/jagermeister/index.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://express.management/hls/jagermeister/index.m3u8';
      video.addEventListener('loadedmetadata', () => {
          video.play();
      });
    }
  }
}
</script>

<style scoped lang='scss'>
#home {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .8);
  animation-name: body-fadein;
  animation-duration: 1s;
}
 
#jagermeister-video {
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

@keyframes body-fadein {
  from {
      opacity: 0;
  }
  to {
      opacity: .8;
  }
}
</style>
