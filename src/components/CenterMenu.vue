<template lang='pug'>
  div#center-menu
    div.menu-item(style='transition-delay: 0s;')
      a(href='#', @click.stop.prevent='toHome')
        p(style='transition-delay: 0s')
          span H
        p(style='transition-delay: 0.02s')
          span O
        p(style='transition-delay: 0.04s')
          span M
        p(style='transition-delay: 0.06s')
          span E
    div.menu-item(style='transition-delay: 0.05s;')
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
    div.menu-item(style='transition-delay: 0.1s;')
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
    div.menu-item(style='transition-delay: 0.15s;')
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
    div.menu-item(style='transition-delay: 0.2s;')
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
          span C
        p(style='transition-delay: 0.12s')
          span T
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';
import { mapState } from 'vuex';

const fadein = () => {
  $('.menu-item').css({
    opacity: 1,
    transform: 'translate(0px, 0px)',
  });
};

@Component({
  computed: mapState({
    isMenuDisplay: 'isMenuDisplay',
  }),
})
export default class CenterMenu extends Vue {
  private setIsMenuDisplay(): void {
    this.$store.commit('setIsMenuDisplay', {
      condition: false,
    });
  }

  private toHome(): void {
    this.$store.commit('setViewIndex', {
      index: 0,
    });
    this.setIsMenuDisplay();
    this.$router.push({ name: 'home', params: { user: 'admin' } });
  }

  private toAbout(): void {
    this.setIsMenuDisplay();
    this.$router.push({ name: 'about', params: { user: 'admin' } });
  }

  private toProject(): void {
    this.setIsMenuDisplay();
    this.$router.push({ name: 'project', params: { user: 'admin' } });
  }

  private toMember(): void {
    this.setIsMenuDisplay();
    this.$router.push({ name: 'member', params: { user: 'admin' } });
  }

  private toContact(): void {
    this.setIsMenuDisplay();
    this.$router.push({ name: 'contact', params: { user: 'admin' } });
  }
}
</script>

<style scoped lang='scss'>
#center-menu {
  position: fixed;
  top: 50vh;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  z-index: -1;
  transition: 1.5s;

  .menu-item {
    opacity: 0;
    -ms-filter: blur(30px);
    filter: blur(30px);
    transition: 2s;
    margin:8px 0px;
    
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
    // cursor: pointer;
    display: inline-block;
    font-size: 12px;
    color: #ffffffff;
  }
}

@media screen and (max-width: 768px){
  #center-menu {
    p {
      font-size: 10px;
    }
  }
}
</style>
