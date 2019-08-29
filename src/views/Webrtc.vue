<template lang='pug'>
  div.webrtc
    BackImage
    h1 Webrtc
    p （仮）VIPアカウント用SNS（videoチャットや、リアルタイム双方向ファイル交換サービス）ページ

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
export default class Webrtc extends Vue {}
</script>