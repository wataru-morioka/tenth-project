<template lang='pug'>
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
import HeaderNav from '@/components/HeaderNav.vue';
import CenterNav from '@/components/CenterNav.vue';
import FooterNav from '@/components/FooterNav.vue';

@Component({
  components: {
    HeaderNav,
    CenterNav,
    FooterNav,
  },
})
export default class MainNav extends Vue {
  private beforeCreate() {
    this.$store.dispatch('checkLoginStatus');
    // alert(this.$store.state.isLogin);
  }
}
</script>

<style scoped lang='scss'>
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
