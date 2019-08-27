<template lang='pug'>
  div#nav
    HeaderNav
    //- FooterNav
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HeaderNav from '@/components/HeaderNav.vue';
// import FooterNav from '@/components/FooterNav.vue';

@Component({
  components: {
    HeaderNav,
    // FooterNav,
  },
})
export default class MainNav extends Vue {}
</script>

<style scoped lang='scss'>
#nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100vh;
  overflow: hidden;
  min-height: 100%;
  animation-name: fadein;
  animation-duration: 5s;
  // z-index: 10;
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
