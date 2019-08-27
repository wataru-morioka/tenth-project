<template lang='pug'>
  div#jagermeister
    video(id='jagermeister-video' autoplay muted playsinline)
      source(src='../assets/jager.mp4' type='video/mp4')
    MainNav
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';

@Component({
  components: {
    MainNav,
  },
})
export default class Jagermeister extends Vue {}
</script>

<style scoped lang='scss'>
#jagermeister {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .8);
  animation-name: body-fadein;
  animation-duration: 4s;
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
      // transform: translateX(300px);
  }
  to {
      opacity: .8;
      // transform: translateX(0);
  }
}
</style>