<template lang='pug'>
  div#sub-menu(style='transition-delay: 4s')
    div.menu-item(v-for='[id, title] in this.$store.state.projectTitleMap', :key='id')
      a(href='#', @click.stop.prevent='play(id)')
        p(v-for='(char, charIndex) in Array.from(title)', :key='charIndex', :style='transitionDelay(0, 0.02, charIndex)')
          span {{ char }}

    //- div.menu-item(style='transition-delay: 2s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span G
    //-     p(style='transition-delay: 0.06s')
    //-       span E
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span M
    //-     p(style='transition-delay: 0.12s')
    //-       span I
    //-     p(style='transition-delay: 0.14s')
    //-       span S
    //-     p(style='transition-delay: 0.16s')
    //-       span T
    //-     p(style='transition-delay: 0.18s')
    //-       span E
    //-     p(style='transition-delay: 0.20s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.02s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span U
    //-     p(style='transition-delay: 0.06s')
    //-       span Z
    //-     p(style='transition-delay: 0.08s')
    //-       span A
    //- div.menu-item(style='transition-delay: 2.04s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span L
    //-     p(style='transition-delay: 0.06s')
    //-       span I
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span U
    //- div.menu-item(style='transition-delay: 2.06s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span C
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span P
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.08s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //- div.menu-item(style='transition-delay: 2.10s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span B
    //-     p(style='transition-delay: 0.02s')
    //-       span E
    //-     p(style='transition-delay: 0.04s')
    //-       span E
    //-     p(style='transition-delay: 0.06s')
    //-       span F
    //-     p(style='transition-delay: 0.08s')
    //-       span E
    //-     p(style='transition-delay: 0.10s')
    //-       span A
    //-     p(style='transition-delay: 0.12s')
    //-       span T
    //-     p(style='transition-delay: 0.14s')
    //-       span E
    //-     p(style='transition-delay: 0.16s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.12s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span D
    //-     p(style='transition-delay: 0.06s')
    //-       span O
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.14s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //-     p(style='transition-delay: 0.08s')
    //-       span &nbsp;
    //-     p(style='transition-delay: 0.10s')
    //-       span B
    //-     p(style='transition-delay: 0.12s')
    //-       span L
    //-     p(style='transition-delay: 0.14s')
    //-       span U
    //-     p(style='transition-delay: 0.16s')
    //-       span E
    //- div.menu-item(style='transition-delay: 2.16s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span C
    //-     p(style='transition-delay: 0.06s')
    //-       span A
    //-     p(style='transition-delay: 0.08s')
    //-       span L
    //-     p(style='transition-delay: 0.10s')
    //-       span L
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span N
    //- div.menu-item(style='transition-delay: 2.18s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span &nbsp;
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span E
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span M
    //- div.menu-item(style='transition-delay: 2.20s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span L
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span P
    //-     p(style='transition-delay: 0.06s')
    //-       span H
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span O
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span I
    //-     p(style='transition-delay: 0.16s')
    //-       span G
    //- div.menu-item(style='transition-delay: 2.22s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span G
    //-     p(style='transition-delay: 0.06s')
    //-       span E
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span M
    //-     p(style='transition-delay: 0.12s')
    //-       span I
    //-     p(style='transition-delay: 0.14s')
    //-       span S
    //-     p(style='transition-delay: 0.16s')
    //-       span T
    //-     p(style='transition-delay: 0.18s')
    //-       span E
    //-     p(style='transition-delay: 0.20s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.24s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span U
    //-     p(style='transition-delay: 0.06s')
    //-       span Z
    //-     p(style='transition-delay: 0.08s')
    //-       span A
    //- div.menu-item(style='transition-delay: 2.26s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span L
    //-     p(style='transition-delay: 0.06s')
    //-       span I
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span U
    //- div.menu-item(style='transition-delay: 2.28s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span C
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span P
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.30s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //- div.menu-item(style='transition-delay: 2.32s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span B
    //-     p(style='transition-delay: 0.02s')
    //-       span E
    //-     p(style='transition-delay: 0.04s')
    //-       span E
    //-     p(style='transition-delay: 0.06s')
    //-       span F
    //-     p(style='transition-delay: 0.08s')
    //-       span E
    //-     p(style='transition-delay: 0.10s')
    //-       span A
    //-     p(style='transition-delay: 0.12s')
    //-       span T
    //-     p(style='transition-delay: 0.14s')
    //-       span E
    //-     p(style='transition-delay: 0.16s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.34s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span D
    //-     p(style='transition-delay: 0.06s')
    //-       span O
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';
// import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';
import axios from 'axios';
import firebase from 'firebase/app';
import VideoMixin from '@/components/VideoMixin.vue';

@Component
export default class SubMenu extends Mixins<VideoMixin>(VideoMixin) {
  private fadein() {
    $('#sub-menu').css({
      opacity: 1,
      transform: 'translate(0px, 0px)',
    });
  }

  private async mounted() {
    this.fadein();
  }

  private transitionDelay(diff: number, rate: number, index: number): string {
    const delay = diff + rate * index;
    return 'transition-delay: ' + delay + 's';
  }
}
</script>

<style scoped lang='scss'>
#sub-menu {
  display: inline-block;
  height: 270px;
  width: 100px;
  opacity: 0;
  transform: translate(0px, 50px);
  transition: 2s;

  #update-menu-bt {
    display: none;
  }

  .menu-item {
    a p {
      transition: 0.6s;
      will-change: transform;
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
    font-size: 11px;
    color: #ffffff8a;
  }
}
</style>
