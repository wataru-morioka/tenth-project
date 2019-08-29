<template lang='pug'>
  div.service
    BackImage
    h1 Service
    p （仮）VIPアカウント用サービスページ
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import BackImage from '@/components/BackImage.vue';

@Component({
  components: {
    BackImage,
  },
})
export default class Service extends Vue {}
</script>