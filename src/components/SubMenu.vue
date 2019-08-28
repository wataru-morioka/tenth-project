<template lang='pug'>
  div#sub-menu(style='transition-delay: 2s;')
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 0s')
        span J
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span G
      p(style='animation-delay: 1.3s')
        span E
      p(style='animation-delay: 1.4s')
        span R
      p(style='animation-delay: 1.5s')
        span M
      p(style='animation-delay: 1.6s')
        span I
      p(style='animation-delay: 1.6s')
        span S
      p(style='animation-delay: 1.6s')
        span T
      p(style='animation-delay: 1.6s')
        span E
      p(style='animation-delay: 1.6s')
        span R
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span S
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span U
      p(style='animation-delay: 1.3s')
        span Z
      p(style='animation-delay: 1.4s')
        span A
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span M
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span L
      p(style='animation-delay: 1.3s')
        span I
      p(style='animation-delay: 1.4s')
        span B
      p(style='animation-delay: 1.4s')
        span U
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span C
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span M
      p(style='animation-delay: 1.3s')
        span P
      p(style='animation-delay: 1.4s')
        span A
      p(style='animation-delay: 1.4s')
        span L
      p(style='animation-delay: 1.4s')
        span I
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span S
      p(style='animation-delay: 1.1s')
        span K
      p(style='animation-delay: 1.2s')
        span Y
      p(style='animation-delay: 1.2s')
        span Y
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span B
      p(style='animation-delay: 1.1s')
        span E
      p(style='animation-delay: 1.2s')
        span E
      p(style='animation-delay: 1s')
        span F
      p(style='animation-delay: 1.1s')
        span E
      p(style='animation-delay: 1.2s')
        span A
      p(style='animation-delay: 1.2s')
        span T
      p(style='animation-delay: 1.2s')
        span E
      p(style='animation-delay: 1.2s')
        span R
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span M
      p(style='animation-delay: 1.1s')
        span I
      p(style='animation-delay: 1.2s')
        span D
      p(style='animation-delay: 1s')
        span O
      p(style='animation-delay: 1.1s')
        span R
      p(style='animation-delay: 1.2s')
        span I
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span S
      p(style='animation-delay: 1.1s')
        span K
      p(style='animation-delay: 1.2s')
        span Y
      p(style='animation-delay: 1.2s')
        span Y
      p(style='animation-delay: 1s')
        span &nbsp;
      p(style='animation-delay: 1s')
        span B
      p(style='animation-delay: 1.1s')
        span L
      p(style='animation-delay: 1.2s')
        span U
      p(style='animation-delay: 1.2s')
        span E
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span M
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span C
      p(style='animation-delay: 1s')
        span A
      p(style='animation-delay: 1.1s')
        span L
      p(style='animation-delay: 1.2s')
        span L
      p(style='animation-delay: 1.2s')
        span A
      p(style='animation-delay: 1.2s')
        span N
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span J
      p(style='animation-delay: 1.1s')
        span I
      p(style='animation-delay: 1.2s')
        span M
      p(style='animation-delay: 1s')
        span &nbsp;
      p(style='animation-delay: 1.1s')
        span B
      p(style='animation-delay: 1.2s')
        span E
      p(style='animation-delay: 1.2s')
        span A
      p(style='animation-delay: 1.2s')
        span M
    a(href='#', @click.stop.prevent='test')
      p(style='animation-delay: 1s')
        span L
      p(style='animation-delay: 1.1s')
        span A
      p(style='animation-delay: 1.2s')
        span P
      p(style='animation-delay: 1s')
        span H
      p(style='animation-delay: 1.1s')
        span R
      p(style='animation-delay: 1.2s')
        span O
      p(style='animation-delay: 1.2s')
        span A
      p(style='animation-delay: 1.2s')
        span I
      p(style='animation-delay: 1.2s')
        span G
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';

const fadein = () => {
  $('#sub-menu').css({
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  opacity: 0;
  transform: translate(0px, 50px);
  transition: 2s;
  z-index: -1;

  a {
    cursor: pointer;
  }

  p {
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    color: #ffffff8a;
    animation-name: content-fadein;
    animation-duration: 2s;
  }
}

@media screen and (max-width: 768px){
  #sub-menu {
    display: none;
  }
}
</style>
