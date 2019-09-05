<template lang='pug'>
  div#service
    BackImage
    div.subject
      p(style='animation-delay: 1s')
        span S
      p(style='animation-delay: 1.1s')
        span E
      p(style='animation-delay: 1.2s')
        span R
      p(style='animation-delay: 1.3s')
        span V
      p(style='animation-delay: 1.4s')
        span I
      p(style='animation-delay: 1.5s')
        span C
      p(style='animation-delay: 1.6s')
        span E
    div.nav
      ServiceHeaderNav
    router-view
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import BackImage from '@/components/BackImage.vue';
import FooterNav from '@/components/FooterNav.vue';
import ServiceHeaderNav from '@/components/ServiceHeaderNav.vue';
import jQuery from 'jQuery';

@Component({
  components: {
    BackImage,
    FooterNav,
    ServiceHeaderNav,
  },
})
export default class Service extends Vue {
  // private mounted() {
  // }
}
</script>

<style scoped lang='scss'>
#service {
  position: relative;
  width: 100%;
  height: 100vh;
  animation-name: body-fadein;
  animation-duration: 2s;
}

.subject {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 60px;
  transform: translateY(0px);
  opacity: .2;
  z-index: -3;

   p {
    animation-name: content-fadein;
    animation-duration: 2s;
    margin-left: 1px;
    margin-right: 1px;
    margin-bottom: 0;
  }
}
.nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100vh;
  overflow: hidden;
  min-height: 100%;
  animation-name: content-fadein;
  animation-duration: 2s;
  will-change: transform;
}

@media screen and (max-width: 768px){
  .subject {
    font-size: 30px;
  }
}

@keyframes body-fadein {
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}

@keyframes content-fadein {
  from {
      opacity: 0;
      transform: translateY(40px);
  }
  to {
      // opacity: .2;
      transform: translateY(0);
  }
}
</style>