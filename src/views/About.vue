<template lang='pug'>
  div#about
    BackImage
    SubNav
    div.subject
      p(style='animation-delay: 1s')
        span A
      p(style='animation-delay: 1.1s')
        span B
      p(style='animation-delay: 1.2s')
        span O
      p(style='animation-delay: 1.3s')
        span U
      p(style='animation-delay: 1.4s')
        span T
    AboutContent
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import BackImage from '@/components/BackImage.vue';
import SubNav from '@/components/SubNav.vue';
import AboutContent from '@/components/AboutContent.vue';

@Component({
  components: {
    BackImage,
    SubNav,
    AboutContent,
  },
})
export default class About extends Vue {}
</script>

<style scoped lang='scss'>
#about {
  position: relative;
  animation-name: body-fadein;
  animation-duration: 4s;
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
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 768px){
  .subject {
    font-size: 30px;
  }
  .subject p {
    margin-left: 2px;
    margin-right: 2px;
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
      transform: translateY(60px);
  }
  to {
      // opacity: .2;
      transform: translateY(0);
  }
}
</style>
