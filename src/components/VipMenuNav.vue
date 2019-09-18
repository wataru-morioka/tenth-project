<template lang='pug'>
  div#header-menu
    div.pc-menu
      div.rotate-menu
        a(href='#', @click.stop.prevent='toHome')
          p(style='transition-delay: 0s')
            span H
          p(style='transition-delay: 0.02s')
            span O
          p(style='transition-delay: 0.04s')
            span M
          p(style='transition-delay: 0.06s')
            span E
      div.rotate-menu
        a(href='#', @click.stop.prevent='toManagement')
          p(style='transition-delay: 0s')
            span M
          p(style='transition-delay: 0.02s')
            span A
          p(style='transition-delay: 0.04s')
            span N
          p(style='transition-delay: 0.06s')
            span A
          p(style='transition-delay: 0.08s')
            span G
          p(style='transition-delay: 0.10s')
            span E
          p(style='transition-delay: 0.12s')
            span M
          p(style='transition-delay: 0.14s')
            span E
          p(style='transition-delay: 0.16s')
            span N
          p(style='transition-delay: 0.18s')
            span T
      div.rotate-menu
        a(href='#', @click.stop.prevent='toService')
          p(style='transition-delay: 0s')
            span S
          p(style='transition-delay: 0.02s')
            span E
          p(style='transition-delay: 0.04s')
            span R
          p(style='transition-delay: 0.06s')
            span V
          p(style='transition-delay: 0.08s')
            span I
          p(style='transition-delay: 0.10s')
            span C
          p(style='transition-delay: 0.12s')
            span E
      div.rotate-menu
        a(href='#', @click.stop.prevent='toWebrtc')
          p(style='transition-delay: 0s')
            span W
          p(style='transition-delay: 0.02s')
            span E
          p(style='transition-delay: 0.04s')
            span B
          p(style='transition-delay: 0.06s')
            span R
          p(style='transition-delay: 0.08s')
            span T
          p(style='transition-delay: 0.10s')
            span C
    div#menu-dropdown(class="ui pointing link icon dropdown")
      i(class="large bars icon")
      div.menu
        div.header MENU
        div.divider
        div.item(@click='toHome') HOME
        div.item(@click='toManagement') MANAGEMENT
        div.item(@click='toService') SERVICE
        div.item(@click='toWebrtc') WEBRTC
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import jQuery from 'jquery';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');

@Component
export default class VipMenuNav extends Vue {
  private isDroped: boolean = false;

  private mounted() {
    ($('#menu-dropdown') as any).dropdown({
      on: 'hover',
      onShow: () => {
        $('.content').css('z-index', '-3');
      },
      onHide: () => {
        $('.content').css('z-index', '0');
      },
    });
  }

  private toHome(): void {
    this.$store.commit('setViewIndex', {
      index: 0,
    });
    this.$router.push({ name: 'home' });
  }

  private toManagement(): void {
    this.$router.push({ name: 'management-account' });
  }

  private toService(): void {
    this.$router.push({ name: 'service' });
  }

  private toWebrtc(): void {
    this.$router.push({ name: 'webrtc' });
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$menu-color: #42b983;

#header-menu {
  margin-top: 20px;
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
  position: relative;
  z-index: 12px !important;
}

a {
  font-size: 11px;
  color: $menu-color;
  p {
    color: $menu-color;
  }
}

.menu {
  background: (0, 0, 0, 0) !important;
  div {
    color: $menu-color !important;
  }
}

.item {
  font-size: 12px !important;
}

@media screen and (max-width: 768px){
  .pc-menu {
    display:none;
  }

  #header-menu {
    margin-top: 20px;
  }

  .bars {
    margin-right: 20px !important;
  }

  .item {
    font-size: 10px !important;
  }
}

@media screen and (min-width: 768px){
  .rotate-menu {
    margin-right: 80px;
    display: inline-block;
  }
}

a {
  p {
    display: inline-block;
    transition: 0.7s;
    will-change: transform;
  }
} 

a:hover {
  p {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
} 

.bars {
  margin-right: 50px;
  cursor: pointer;
}
</style>
