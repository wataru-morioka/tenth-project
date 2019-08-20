<template lang='pug'>
  div.management
    h1 Management
    HelloWorld
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Management extends Vue {}
</script>
