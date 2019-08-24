<template lang='pug'>
  div#center
    div.icon-wrap
      img.slide-icon(src='../assets/prev.png', @click='toAbout')
    div.icon-wrap
      img.slide-icon(src='../assets/next.png', @click='toAbout')
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');

@Component
export default class CenterNav extends Vue {
  // @Prop() private msg!: string;

  private toAbout(): void {
    this.$router.push({ name: 'about', params: { user: 'admin' } });
  }

  private toProject(): void {
    this.$router.push({ name: 'project', params: { user: 'admin' } });
  }

  private toMember(): void {
    this.$router.push({ name: 'member', params: { user: 'admin' } });
  }

  private toContact(): void {
    this.$router.push({ name: 'contact', params: { user: 'admin' } });
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$menu-color: #ffffff;

#center {
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

.icon-wrap {
  cursor: pointer;
  margin-left: 15px;
  margin-right: 15px;
  transition: 0.7s ;
}

.icon-wrap:hover {
  transform: rotateX( 360deg );
}

.slide-icon {
  width: 20px;
}
</style>