<template lang='pug'>
  div#header
    div
      img#header-logo(src='../assets/jagermeister.png', @click='toHome')
    div#header-menu
      div
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
              spanA
            p(style='transition-delay: 0.10s')
              span C
            p(style='transition-delay: 0.12s')
              span T
      div#menu-dropdown(class="ui pointing link icon dropdown")
        div.text MENU
        i(class="large bars icon")
        div.menu
          div.header MENU
          div.divider
          div.item ABOUT
          div.item PROJECT
          div.item MEMBER
          div.item CONTACT
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import jQuery from 'jquery';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');
// declare let $.fn.dropdown;

@Component
export default class HeaderNav extends Vue {
  // @Prop() private msg!: string;

  private mounted() {
    $('#menu-dropdown').dropdown({
      on: 'hover',
    });
  }

  private toHome(): void {
    // $('#menu-dropdown').dropdown();
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

#header {
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

#header-logo {
  margin-top: 40px;
  margin-left: 50px;
  height: 40px;
  cursor: pointer;
  transition: 0.8s;
}

#header-logo:hover {
  -webkit-transform: rotateX(360deg);
  transform: rotateX(360deg);
}

#header-menu {
  margin-top: 50px;
  // width: 20%;
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

a {
  font-size: 11px;
  color: $menu-color;
}

.rotate-menu {
  margin-right: 80px;
  display: inline-block;
}

a p {
  display: inline-block;
  transition: 0.7s;
}

a:hover p {
  -webkit-transform: rotateX(360deg);
  transform: rotateX(360deg);
}

.bars {
  margin-right: 50px;
  cursor: pointer;
}

.menu {
  background: rgba(0, 0, 0, .3);
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
