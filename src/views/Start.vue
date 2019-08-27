
<template lang='pug'>
  div#start
    button#to-home-bt(@click='toHome')
    div(class="ui indicating progress")
      div(class="bar")
      div(class="label")
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jquery';

// history.pushState(null, 'null');
// window.addEventListener('popstate', (e) => {
//   window.location.reload();
// });

window.onload = () => {
  const $progress = $('.ui.progress');
  window.fakeProgress = setInterval(() => {
    $progress.progress('increment');
    if($progress.progress('is complete')) {
      setTimeout(() => {
        const bt = document.getElementById('to-home-bt');
        if (bt == null) {
          return;
        }
        bt.click();
      }, 400);
    }
  // }, 50);
  }, 5);
};

@Component
export default class Start extends Vue {
  private mounted() {
    $('.ui.progress').progress({
      duration : 400,
      total    : 100,
      text     : {
        active: '{value} %',
      },
    });
  }

  private toHome(): void {
    this.$router.push({ name: 'home', params: { user: 'admin' } });
  }
}
</script>

<style scoped lang='scss'>
#start {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, .9);
  animation-name: body-fadein;
  animation-duration: 2s;
}

.ui.progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height:2px;
}

.ui.progress .bar {
  height: 2px;
}

.ui.indicating .label {
  color: #ffffff70 !important; 
}

#to-home-bt {
  display: none;
}
</style>
