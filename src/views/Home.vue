<template lang='pug'>
div#home
  video(id='home-video' autoplay muted playsinline)
    source(src='../assets/jagermeister.mp4' type='video/mp4')
  MainNav
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';
import BackImage from '@/components/BackImage.vue';

@Component({
  components: {
    MainNav,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang='scss'>
#home {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .6);
  animation-name: body-fadein;
  animation-duration: 1s;
}
 
#home-video {
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
