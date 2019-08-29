<template lang='pug'>
  div.management
    BackImage
    h1 Management
    //- HelloWorld
    p （仮）管理者用ページ
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import BackImage from '@/components/BackImage.vue';

@Component({
  components: {
    BackImage,
  },
})
export default class Management extends Vue {}
</script>
