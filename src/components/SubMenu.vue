<template lang='pug'>
  div#sub-menu
    button#update-menu-bt(@click='updateMenuArray')
    div.menu-item(v-for='[id, title] in projectTitleMap', :key='id')
      a(href='#', @click.stop.prevent='play(id)')
        p(v-for='(char, charIndex) in Array.from(title)', :key='charIndex', :style='transitionDelay(0, 0.02, charIndex)')
          span {{ char }}

    //- div.menu-item(style='transition-delay: 2s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span G
    //-     p(style='transition-delay: 0.06s')
    //-       span E
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span M
    //-     p(style='transition-delay: 0.12s')
    //-       span I
    //-     p(style='transition-delay: 0.14s')
    //-       span S
    //-     p(style='transition-delay: 0.16s')
    //-       span T
    //-     p(style='transition-delay: 0.18s')
    //-       span E
    //-     p(style='transition-delay: 0.20s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.02s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span U
    //-     p(style='transition-delay: 0.06s')
    //-       span Z
    //-     p(style='transition-delay: 0.08s')
    //-       span A
    //- div.menu-item(style='transition-delay: 2.04s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span L
    //-     p(style='transition-delay: 0.06s')
    //-       span I
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span U
    //- div.menu-item(style='transition-delay: 2.06s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span C
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span P
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.08s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //- div.menu-item(style='transition-delay: 2.10s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span B
    //-     p(style='transition-delay: 0.02s')
    //-       span E
    //-     p(style='transition-delay: 0.04s')
    //-       span E
    //-     p(style='transition-delay: 0.06s')
    //-       span F
    //-     p(style='transition-delay: 0.08s')
    //-       span E
    //-     p(style='transition-delay: 0.10s')
    //-       span A
    //-     p(style='transition-delay: 0.12s')
    //-       span T
    //-     p(style='transition-delay: 0.14s')
    //-       span E
    //-     p(style='transition-delay: 0.16s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.12s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span D
    //-     p(style='transition-delay: 0.06s')
    //-       span O
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.14s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //-     p(style='transition-delay: 0.08s')
    //-       span &nbsp;
    //-     p(style='transition-delay: 0.10s')
    //-       span B
    //-     p(style='transition-delay: 0.12s')
    //-       span L
    //-     p(style='transition-delay: 0.14s')
    //-       span U
    //-     p(style='transition-delay: 0.16s')
    //-       span E
    //- div.menu-item(style='transition-delay: 2.16s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span C
    //-     p(style='transition-delay: 0.06s')
    //-       span A
    //-     p(style='transition-delay: 0.08s')
    //-       span L
    //-     p(style='transition-delay: 0.10s')
    //-       span L
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span N
    //- div.menu-item(style='transition-delay: 2.18s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span &nbsp;
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span E
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span M
    //- div.menu-item(style='transition-delay: 2.20s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span L
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span P
    //-     p(style='transition-delay: 0.06s')
    //-       span H
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span O
    //-     p(style='transition-delay: 0.12s')
    //-       span A
    //-     p(style='transition-delay: 0.14s')
    //-       span I
    //-     p(style='transition-delay: 0.16s')
    //-       span G
    //- div.menu-item(style='transition-delay: 2.22s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span J
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span G
    //-     p(style='transition-delay: 0.06s')
    //-       span E
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span M
    //-     p(style='transition-delay: 0.12s')
    //-       span I
    //-     p(style='transition-delay: 0.14s')
    //-       span S
    //-     p(style='transition-delay: 0.16s')
    //-       span T
    //-     p(style='transition-delay: 0.18s')
    //-       span E
    //-     p(style='transition-delay: 0.20s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.24s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span U
    //-     p(style='transition-delay: 0.06s')
    //-       span Z
    //-     p(style='transition-delay: 0.08s')
    //-       span A
    //- div.menu-item(style='transition-delay: 2.26s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span L
    //-     p(style='transition-delay: 0.06s')
    //-       span I
    //-     p(style='transition-delay: 0.08s')
    //-       span B
    //-     p(style='transition-delay: 0.10s')
    //-       span U
    //- div.menu-item(style='transition-delay: 2.28s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span C
    //-     p(style='transition-delay: 0.02s')
    //-       span A
    //-     p(style='transition-delay: 0.04s')
    //-       span M
    //-     p(style='transition-delay: 0.06s')
    //-       span P
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
    //- div.menu-item(style='transition-delay: 2.30s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span S
    //-     p(style='transition-delay: 0.02s')
    //-       span K
    //-     p(style='transition-delay: 0.04s')
    //-       span Y
    //-     p(style='transition-delay: 0.06s')
    //-       span Y
    //- div.menu-item(style='transition-delay: 2.32s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span B
    //-     p(style='transition-delay: 0.02s')
    //-       span E
    //-     p(style='transition-delay: 0.04s')
    //-       span E
    //-     p(style='transition-delay: 0.06s')
    //-       span F
    //-     p(style='transition-delay: 0.08s')
    //-       span E
    //-     p(style='transition-delay: 0.10s')
    //-       span A
    //-     p(style='transition-delay: 0.12s')
    //-       span T
    //-     p(style='transition-delay: 0.14s')
    //-       span E
    //-     p(style='transition-delay: 0.16s')
    //-       span R
    //- div.menu-item(style='transition-delay: 2.34s;')
    //-   a(href='#', @click.stop.prevent='play')
    //-     p(style='transition-delay: 0s')
    //-       span M
    //-     p(style='transition-delay: 0.02s')
    //-       span I
    //-     p(style='transition-delay: 0.04s')
    //-       span D
    //-     p(style='transition-delay: 0.06s')
    //-       span O
    //-     p(style='transition-delay: 0.08s')
    //-       span R
    //-     p(style='transition-delay: 0.10s')
    //-       span I
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';
import axios from 'axios';
import firebase from 'firebase/app';

class VideoInfo {
  // public id: number;
  public mimetype: string;
  // public fileName: string;
  // public size: number;
  public data: Buffer;
  // public createdDatetime: string;
  // public modifiedDatetime: string;

  constructor(mimetype: string, data: Buffer) {
    // this.id = id;
    this.mimetype = mimetype;
    // this.fileName = file_ame;
    // this.size = size;
    this.data = data;
    // this.createdDatetime = createdDatetime;
    // this.modifiedDatetime = modifiedDatetime;
  }
}

const fadein = () => {
  $('#sub-menu').css({
    opacity: 1,
    transform: 'translate(0px, 0px)',
  });
};

const getVideo = (id: number) => {
  return new Promise<VideoInfo>(async (resolve, reject) => {
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get('https://express.management/video', {
        headers: header,
        params: {
          photoId: id,
        },
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('video取得に失敗しました');
        reject();
        return;
      }
      console.log('video取得');
      const videoInfo = res.data.videoInfo;
      const video = new VideoInfo(
        videoInfo.mimetype,
        videoInfo.data,
      );
      resolve(video);
    })
    .catch((err) => {
      console.log('video取得に失敗しました');
      reject();
    });
  });
};

@Component
export default class SubMenu extends Vue {
  private projectTitleMap: Map<number, string> = new Map<number, string>();

  private mounted() {
    fadein();
  }

  private created() {
    this.projectTitleMap = this.$store.getters.getProjectTitleMap;
  }

  private transitionDelay(diff: number, rate: number, index: number): string {
    const delay = diff + rate * index;
    return 'transition-delay: ' + delay + 's';
  }

  private updateMenuArray(): void {
    this.projectTitleMap = this.$store.getters.getProjectTitleMap;
  }

  private async play(id: number): Promise<void> {
    const isDisplay = this.$store.getters.isVideoDisplay;
    if ( isDisplay ) {
      this.stop();
      return;
    }

    ($('#loading-modal') as any).modal({
      closable: false,
    }).modal('show');

    const video = document.querySelector('video')!;
    let result = false;

    await getVideo(id).then((videoInfo) => {
      result = true;
      const buffer = Buffer.from(videoInfo.data);
      const blob = new Blob([buffer], {type: videoInfo.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      video.src = blobURL;
      video.load();
    }).catch((err) => {
      alert('videoがアップロードされていません');
    });

    ($('.modal') as any).modal('hide');

    if (!result) {
      return;
    }

    video.play();
    this.$store.commit('setIsDisplay', {
      isVideoDisplay: true,
    });
    this.$store.commit('setIsPlaying', {
      isVideoPlaying: true,
    });

    $('.content, #sub-menu').css({
      opacity: 0,
    });

    $('video').css({
      'opacity': 1,
      'z-index': 10,
    });
  }

  private stop(): void {
    const isPlaying = this.$store.getters.isVideoPlaying;
    if (isPlaying) {
      this.$store.commit('setIsPlaying', {
        isVideoPlaying: false,
      });
    }

    document.querySelector('video')!.pause();
    this.$store.commit('setIsDisplay', {
      isVideoDisplay: false,
    });

    $('.content, #sub-menu').css({
      opacity: 1,
    });

    $('video').css({
      'opacity': 0,
      'z-index': -10,
    });
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

  #update-menu-bt {
    display: none;
  }

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
