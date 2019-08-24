<template lang='pug'>
  div.home
    //- div#main
    //-   HelloWorld(msg='Welcome to Your Vue.js + TypeScript App')
    video(id='home-video' autoplay muted playsinline)
      source(src='../assets/jagermeister.mp4' type='video/mp4')
    div#nav
      div#header-nav
        HeaderNav
      div#center-nav
        CenterNav
      div#footer-nav
        FooterNav
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue';
import CenterNav from '@/components/CenterNav.vue';
import FooterNav from '@/components/FooterNav.vue';
import { mapState } from 'vuex';

@Component({
  components: {
    // HelloWorld,
    HeaderNav,
    CenterNav,
    FooterNav,
  },
})
export default class Home extends Vue {
  private beforeCreate() {
    this.$store.dispatch('checkLoginStatus');
    // alert(this.$store.state.isLogin);
  }
}
</script>

<style scoped lang='scss'>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .8);
  animation-name: body-fadein;
  animation-duration: 4s;
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
 
#nav {
  // background: rgba(0, 0, 0, .5);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100%;
  animation-name: fadein;
  animation-duration: 5s;
}

#header-nav {
  flex-grow: 1;
}

#center-nav {
  position: absolute;
  width: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  height: 50px;
}

#footer-nav {
  margin-top: auto;
}

@keyframes body-fadein {
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}

@keyframes fadein {
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}
</style>
