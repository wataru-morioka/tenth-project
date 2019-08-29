<template lang='pug'>
  div#header-nav
    div#header
      div
        img#header-logo(src='../assets/jagermeister.png', @click='toHome')
      div#header-menu
        div
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
            a(href='#', @click.stop.prevent='toAbout')
              p(style='transition-delay: 0s')
                span A
              p(style='transition-delay: 0.02s')
                span B
              p(style='transition-delay: 0.04s')
                span O
              p(style='transition-delay: 0.06s')
                span U
              p(style='transition-delay: 0.08s')
                span T
          div.rotate-menu
            a(href='#', @click.stop.prevent='toProject')
              p(style='transition-delay: 0s')
                span P
              p(style='transition-delay: 0.02s')
                span R
              p(style='transition-delay: 0.04s')
                span O
              p(style='transition-delay: 0.06s')
                span J
              p(style='transition-delay: 0.08s')
                span E
              p(style='transition-delay: 0.10s')
                span C
              p(style='transition-delay: 0.12s')
                span T
          div.rotate-menu
            a(href='#', @click.stop.prevent='toMember')
              p(style='transition-delay: 0s')
                span M
              p(style='transition-delay: 0.02s')
                span E
              p(style='transition-delay: 0.04s')
                span M
              p(style='transition-delay: 0.06s')
                span B
              p(style='transition-delay: 0.08s')
                span E
              p(style='transition-delay: 0.10s')
                span R
          div.rotate-menu
            a(href='#', @click.stop.prevent='toContact')
              p(style='transition-delay: 0s')
                span C
              p(style='transition-delay: 0.02s')
                span O
              p(style='transition-delay: 0.04s')
                span N
              p(style='transition-delay: 0.06s')
                span T
              p(style='transition-delay: 0.08s') 
                span A
              p(style='transition-delay: 0.10s')
                span C
              p(style='transition-delay: 0.12s')
                span T
        div#menu-dropdown(class="ui pointing link icon dropdown", @mouseover= 'drop', @click='drop', @mouseleave= 'leave')
          div.text MENU
          i(class="large bars icon")
          div.menu
            div.header MENU
            div.divider
            div.item(@click='toHome') HOME
            div.item(@click='toAbout') ABOUT
            div.item(@click='toProject') PROJECT
            div.item(@click='toMember') MEMBER
            div.item(@click='toContact') CONTACT
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import jQuery from 'jquery';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');

@Component
export default class HeaderNav extends Vue {
  // @Prop() private msg!: string;
  // private isDropdownShow: boolean = false;

  private mounted() {
    ($('#menu-dropdown') as any).dropdown({
      on: 'hover',
    });
  }

  private drop(): void {
    // $('.content').css('transform', 'translateY(300px)');
    $('.content').css('top', '320px');
  }

  private leave(): void {
    // $('.content').css('transform', 'translateY(0px)');
    $('.content').css('top', '80px');
  }

  private toHome(): void {
    this.$store.commit('setViewIndex', {
      index: 0,
    });
    this.$router.push({ name: 'home', params: { user: 'admin' } });
  }

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

// #header-nav {
//   // position: fixed;
//   // top: 0;
//   // left: 0;
//   // right: 0;
//   // z-index: 10;
//   // flex-grow: 1;
//   // margin-bottom: 300px;
// }

#header {
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

#header-logo {
  margin-top: 20px;
  margin-left: 50px;
  height: 40px;
  cursor: pointer;
  opacity: .8;
}

#header-menu {
  margin-top: 30px;
  // width: 20%;
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

a {
  font-size: 11px;
  color: $menu-color;
}

.menu {
  background: (0, 0, 0, 0) !important;
  div {
    color: #ffffff !important;
  }
}

@media screen and (max-width: 768px){
  .rotate-menu {
    display:none;
  }

  #header-logo {
    margin-top: 10px;
    margin-left: 20px;
  }

  #header-menu {
    margin-top: 20px;
  }

  .bars {
    margin-right: 20px !important;
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

@keyframes rotate_anime {
    0% {
        transform:rotateX(0deg);/* アニメーションの進みが0%の時の状態 */
    }
    100% {
        transform:rotateX(360deg);/* アニメーションの進みが100%の時の状態 */
    }
}
</style>
