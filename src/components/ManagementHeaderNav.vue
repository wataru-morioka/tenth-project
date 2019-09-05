<template lang='pug'>
  div#header-nav
    div#header
      div#management-dropdown(class="ui pointing link icon dropdown")
        img.icon#header-logo(src='../assets/jager-logo.png')
        i(class="dropdown icon")
        div.menu
          div.header CONTROLLER
          div.divider
          div.item(@click='toAccount') ACCOUNT
          div.item(@click='toUpload') UPLOAD
          div.item(@click='toContact') CONTACT
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
export default class ManagementHeaderNav extends Vue {
  private isDroped: boolean = false;

  private mounted() {
    ($('#management-dropdown') as any).dropdown({
      on: 'hover',
      onShow: () => {
        $('.content').css('z-index', '-3');
      },
      onHide: () => {
        $('.content').css('z-index', '0');
      },
    });
  }

  private toAccount(): void {
    this.$router.push({ name: 'management-account' });
  }

  private toUpload(): void {
    this.$router.push({ name: 'management-upload' });
  }

  private toContact(): void {
    this.$router.push({ name: 'management-contact' });
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
  margin-top: 7px;
  margin-left: 10px;
  height: 50px;
  cursor: pointer;
  opacity: .8;
}

.menu {
  background: (0, 0, 0, 0) !important;
  div {
    color: $menu-color !important;
  }

  .item {
    font-size: 12px !important;
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
