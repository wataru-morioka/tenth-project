<template lang='pug'>
  div#sauza
    video(id='sauza-video' autoplay muted playsinline)
      source(src='../assets/sauza.mp4' type='video/mp4')
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
export default class Sauza extends Vue {}
</script>

<style scoped lang='scss'>
#sauza {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .8);
  animation-name: body-fadein;
  animation-duration: 0.5s;
}
 
#sauza-video {
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
      transform: translateX(200px);
  }
  to {
      opacity: 1;
      transform: translateX(0);
  }
}
</style>
