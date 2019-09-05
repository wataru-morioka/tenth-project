<template lang='pug'>
  div.content
    div#contact-list

</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';

@Component
export default class ManagementContact extends Vue {

}
</script>

<style scoped lang='scss'>
.content {
  position: fixed;
  top: 54px; right: 0; bottom: 100px; left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  animation-name: content-fadein;
  animation-duration: 2s;
  z-index: -1;
}

#contact-list {
  width: auto;
  height: 80%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

@media screen and (max-width: 768px){
  .content {
    bottom: 0px;
  }
}

@keyframes content-fadein {
  from {
      opacity: 0;
      transform: translateY(40px);
  }
  to {
      // opacity: .2;
      transform: translateY(0);
  }
}
</style>