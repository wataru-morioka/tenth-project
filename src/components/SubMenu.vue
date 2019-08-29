<template lang='pug'>
  div#sub-menu
    div.menu-item(style='transition-delay: 2s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span J
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span G
        p(style='transition-delay: 0.06s')
          span E
        p(style='transition-delay: 0.08s')
          span R
        p(style='transition-delay: 0.10s')
          span M
        p(style='transition-delay: 0.12s')
          span I
        p(style='transition-delay: 0.14s')
          span S
        p(style='transition-delay: 0.16s')
          span T
        p(style='transition-delay: 0.18s')
          span E
        p(style='transition-delay: 0.20s')
          span R
    div.menu-item(style='transition-delay: 2.02s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span S
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span U
        p(style='transition-delay: 0.06s')
          span Z
        p(style='transition-delay: 0.08s')
          span A
    div.menu-item(style='transition-delay: 2.04s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span M
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span L
        p(style='transition-delay: 0.06s')
          span I
        p(style='transition-delay: 0.08s')
          span B
        p(style='transition-delay: 0.10s')
          span U
    div.menu-item(style='transition-delay: 2.06s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span C
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span M
        p(style='transition-delay: 0.06s')
          span P
        p(style='transition-delay: 0.08s')
          span R
        p(style='transition-delay: 0.10s')
          span I
    div.menu-item(style='transition-delay: 2.08s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span S
        p(style='transition-delay: 0.02s')
          span K
        p(style='transition-delay: 0.04s')
          span Y
        p(style='transition-delay: 0.06s')
          span Y
    div.menu-item(style='transition-delay: 2.10s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span B
        p(style='transition-delay: 0.02s')
          span E
        p(style='transition-delay: 0.04s')
          span E
        p(style='transition-delay: 0.06s')
          span F
        p(style='transition-delay: 0.08s')
          span E
        p(style='transition-delay: 0.10s')
          span A
        p(style='transition-delay: 0.12s')
          span T
        p(style='transition-delay: 0.14s')
          span E
        p(style='transition-delay: 0.16s')
          span R
    div.menu-item(style='transition-delay: 2.12s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span M
        p(style='transition-delay: 0.02s')
          span I
        p(style='transition-delay: 0.04s')
          span D
        p(style='transition-delay: 0.06s')
          span O
        p(style='transition-delay: 0.08s')
          span R
        p(style='transition-delay: 0.10s')
          span I
    div.menu-item(style='transition-delay: 2.14s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span S
        p(style='transition-delay: 0.02s')
          span K
        p(style='transition-delay: 0.04s')
          span Y
        p(style='transition-delay: 0.06s')
          span Y
        p(style='transition-delay: 0.08s')
          span &nbsp;
        p(style='transition-delay: 0.10s')
          span B
        p(style='transition-delay: 0.12s')
          span L
        p(style='transition-delay: 0.14s')
          span U
        p(style='transition-delay: 0.16s')
          span E
    div.menu-item(style='transition-delay: 2.16s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span M
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span C
        p(style='transition-delay: 0.06s')
          span A
        p(style='transition-delay: 0.08s')
          span L
        p(style='transition-delay: 0.10s')
          span L
        p(style='transition-delay: 0.12s')
          span A
        p(style='transition-delay: 0.14s')
          span N
    div.menu-item(style='transition-delay: 2.18s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span J
        p(style='transition-delay: 0.02s')
          span I
        p(style='transition-delay: 0.04s')
          span M
        p(style='transition-delay: 0.06s')
          span &nbsp;
        p(style='transition-delay: 0.08s')
          span B
        p(style='transition-delay: 0.10s')
          span E
        p(style='transition-delay: 0.12s')
          span A
        p(style='transition-delay: 0.14s')
          span M
    div.menu-item(style='transition-delay: 2.20s;')
      a(href='#', @click.stop.prevent='play')
        p(style='transition-delay: 0s')
          span L
        p(style='transition-delay: 0.02s')
          span A
        p(style='transition-delay: 0.04s')
          span P
        p(style='transition-delay: 0.06s')
          span H
        p(style='transition-delay: 0.08s')
          span R
        p(style='transition-delay: 0.10s')
          span O
        p(style='transition-delay: 0.12s')
          span A
        p(style='transition-delay: 0.14s')
          span I
        p(style='transition-delay: 0.16s')
          span G
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';

const fadein = () => {
  $('.menu-item').css({
    opacity: 1,
    transform: 'translate(0px, 0px)',
  });
};

@Component
export default class SubMenu extends Vue {
  private mounted() {
    fadein();
  }
}
</script>

<style scoped lang='scss'>
#sub-menu {
  position: relative;
  width: auto;
  display: inline-block;
  height: 230px;
  top: 50vh;
  transform: translateY(-50%);
  margin: 0 auto;
  overflow-y: scroll;
  z-index: 2;

  .menu-item {
    opacity: 0;
    transform: translate(0px, 50px);
    transition: 2s;
    a p {
      transition: 0.5s;
    }
  }

  .menu-item:hover {
    a p {
      -webkit-transform: rotateX(360deg);
      transform: rotateX(360deg);
    }
  }

  a {
    cursor: pointer;
  }

  p {
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    color: #ffffff8a;
  }
}

@media screen and (max-width: 768px){
  #sub-menu {
    display: none;
  }
}
</style>
