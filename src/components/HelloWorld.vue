<template lang="pug">
  div.hello
    input(type='file', @change='onDrop($event)')
    button(@click='getImage') 画像ダウンロード
    input(type='file', @change='minify($event)')
    img#asakura
    br
    button(@click='getName') 取得します
    button(@click='login', v-show='!$store.state.isLogin') ログイン
    button(@click='logout', v-show='$store.state.isLogin') ログアウト
    br
    a(href='/temp', target='_blank', v-if='$store.state.isLogin', @click.stop.prevent='toManagement') management
    br
    a(href='http://vuejs-templates.github.io/webpack/', target='_blank', v-if='$store.state.isLogin') service
    br
    a(href='http://vuejs-templates.github.io/webpack/', target='_blank', v-if='$store.state.isLogin') rtc
    p(v-if='$store.state.isLogin') {{ $store.state.email }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { url } from 'inspector';
import axios from 'axios';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private getName(): void {
    this.$store.dispatch('post_test')
    .then(() => {
      alert(this.$store.state.displayName);
    });
  }

  private login(): void {
   this.$store.dispatch('login');
  }

  private logout(): void {
    this.$store.dispatch('logout');
  }

  // private beforeCreate() {
  //   this.$store.dispatch('checkLoginStatus');
  // }

  private toManagement(): void {
    this.$router.push({ name: 'management', params: { user: 'admin' } });
  }

  private onDrop(event: any): void {
    const params = new FormData();
    params.append('file', event.target.files[0]);
    axios.post('https://express.management/image', params)
    .then((res) => {
      alert('success');
    })
    .catch((err) => {
      alert(err);
    });
  }

  private getImage(): void {
    const params = {id: 'test'};
    axios.post('https://express.management/download', params)
    .then((res) => {
      const buffer = Buffer.from(res.data.data);
      const blob = new Blob([buffer], {type: res.data.mimetype});
      const blobURL = window.URL.createObjectURL(blob);

      const img = document.getElementById('asakura') as HTMLImageElement;
      img.src = blobURL;

      const a = document.createElement('a');
      a.download = res.data.file_name;
      a.href = blobURL;
      a.click();
      alert('success');
    })
    .catch((err) => {
      alert(err);
    });
  }

  private minify(event: any): void {
    const params = new FormData();
    params.append('file', event.target.files[0]);

    axios({
      url: 'https://express.management/minify',
      method: 'POST',
      responseType: 'blob',
      data: params,
    }).then((res) => {
      // const buffer = Buffer.from(res.data);
      const blob = new Blob([res.data], {type: res.headers['content-type']});
      const blobURL = window.URL.createObjectURL(blob);

      const img = document.querySelector('#asakura');
      (img as HTMLImageElement).src = blobURL;

      const a = document.createElement('a');
      a.download = '圧縮後';
      a.href = blobURL;
      a.click();
      alert('success');
    })
    .catch((err) => {
      alert(err);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mes-color: #42b983;

button{
  margin: 10px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $mes-color;
}
</style>
