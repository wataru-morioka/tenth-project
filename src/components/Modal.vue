<template lang='pug'>
  div#modal
    div(class="ui basic modal")
      div.content
        div(class="ui active inverted loader")
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {}
</script>

<style scoped lang='scss'>
#modal {
  position: fixed;
}

.content {
  text-align: center;

  p {
    font-size: 14px;
  }
}
</style>
