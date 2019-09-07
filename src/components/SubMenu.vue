<template lang='pug'>
  div#sub-menu
    div.menu-item(v-for='(title, index) in projectTitleArray', :key='index', :style='transitionDelay(2, 0.02, index)')
      a(href='#', @click.stop.prevent='play')
        p(v-for='(char, charIndex) in Array.from(title)', :key='charIndex', :style='transitionDelay(0, 0.02, charIndex)')
          span {{ char }}
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
  private projectTitleArray: string[] = [];
  private mounted() {
    fadein();
  }

  private created() {
    this.projectTitleArray = this.$store.getters.getProjectTitles;
    console.log(this.projectTitleArray);
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

@media screen and (max-width: 768px){
  // #sub-menu {
  //   display: none;
  // }
}
</style>
