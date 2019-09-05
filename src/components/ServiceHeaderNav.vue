<template lang='pug'>
  div#header-nav
    div#header
      div#service-dropdown(class="ui pointing link icon dropdown")
        img.icon#header-logo(src='../assets/jager-logo.png')
        i(class="dropdown icon")
        div.menu
          div.header CONTROLLER
          div.divider
          div.item(@click='toAsk') ASK
          div.item(@click='toOwn') OWN QUESTIONS
          div.item(@click='toOthers') OTHERS QUESTIONS
          div.item(@click='toAccount') ACCOUNT
      VipMenuNav
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import VipMenuNav from '@/components/VipMenuNav.vue';
import axios from 'axios';
import jQuery from 'jquery';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');

@Component({
  components: {
    VipMenuNav,
  },
})
export default class ServiceHeaderNav extends Vue {
  private isDroped: boolean = false;

  private mounted() {
    ($('#service-dropdown') as any).dropdown({
      on: 'hover',
      onShow: () => {
        $('.content').css('z-index', '-3');
      },
      onHide: () => {
        $('.content').css('z-index', '0');
      },
    });
  }

  private toAsk(): void {
    this.$router.push({ name: 'service-ask' });
  }

  private toOwn(): void {
    this.$router.push({ name: 'service-own' });
  }

  private toOthers(): void {
    this.$router.push({ name: 'service-others' });
  }

  private toAccount(): void {
    this.$router.push({ name: 'service-account' });
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$menu-color: #ffffff77;

#header {
  display: flex;
  justify-content:space-between;
  -webkit-box-pack:justify;
}

#header-logo {
  margin-top: 17px;
  margin-left: 50px;
  height: 50px;
  cursor: pointer;
  opacity: .8;
}

.item {
  font-size: 12px !important;
}

.menu {
  background: (0, 0, 0, 0) !important;
  div {
    color: $menu-color !important;
  }
}

@media screen and (max-width: 768px){
  #header-logo {
    margin-top: 12px;
    margin-left: 20px;
    height: 40px;
  }

  .item {
    font-size: 10px !important;
  }
}

@media screen and (min-width: 768px){
}
</style>
