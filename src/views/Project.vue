<template lang='pug'>
  div#project
    BackImage
    SubNav
    div.subject
      p(style='animation-delay: 1s')
        span P
      p(style='animation-delay: 1.1s')
        span R
      p(style='animation-delay: 1.2s')
        span O
      p(style='animation-delay: 1.3s')
        span J
      p(style='animation-delay: 1.4s')
        span E
      p(style='animation-delay: 1.5s')
        span C
      p(style='animation-delay: 1.6s')
        span T
    SubMenu
    video(controls playsinline)
      source(src='../assets/jager.mp4' type='video/mp4')
    ProjectContent
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import BackImage from '@/components/BackImage.vue';
import SubNav from '@/components/SubNav.vue';
import SubMenu from '@/components/SubMenu.vue';
import ProjectContent from '@/components/ProjectContent.vue';

@Component({
  components: {
    BackImage,
    SubNav,
    SubMenu,
    ProjectContent,
  },
})
export default class Project extends Vue {}
</script>

<style scoped lang='scss'>
#project {
  position: relative;
  animation-name: body-fadein;
  animation-duration: 2s;
  height: 100vw;
}

video {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  transition: 1s;
  z-index: -10;
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
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 0;
  }
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
      transform: translateY(0);
  }
}
</style>
