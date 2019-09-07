<template lang='pug'>
div
  Modal
  ConfirmModal(:confirmMessage='confirmMessage')
  div#sub-menu-wrap
    SubMenu
  video(controls playsinline)
    source(:src='videoSrc' type='video/mp4')
  div#add-image
    button(type=button class='ui inverted orange button', @click='addImage($event)') add image
    input#add-input(type='file', @change='onChangeAdd($event)')
    button(type=button class='ui inverted orange button', @click='addVideo($event)') add video
    input#add-video-input(type='file', @change='onChangeAddVideo($event)')
  div.content(class="ui two column divided grid", @click='stop')
    div.row(v-for='(photoArray, index) in photoMultiArray', :key='index', :style='firstChildRow(index)')
      div.column.left(:style='transitionDelay(0.2, index * 2)')
        div.content-box.box-left(@click='play(photoArray[0].id)')
          div.image
            i.huge.play.icon
            img(:src='setPhoto(index, 0)')
          div.subject
            p {{ photoArray[0].subTitle }}
            h4 
              p(v-for='(char, charIndex) in Array.from(photoArray[0].title)', :key='charIndex', :style='transitionDelay(0.02, charIndex)')
                span {{ char }}
      div.column(:style='transitionDelay(0.2, index * 2 + 1)')
        div.content-box.box-right(@click='play(photoArray[1].id)')
          div.image
            i.huge.play.icon
            img(:src='setPhoto(index, 1)')
          div.subject
            p {{ photoArray[1].subTitle }}
            h4 
              p(v-for='(char, charIndex) in Array.from(photoArray[1].title)', :key='charIndex', :style='transitionDelay(0.02, charIndex)')
                span {{ char }}
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Modal from '@/components/Modal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import SubMenu from '@/components/SubMenu.vue';
import axios from 'axios';
import jQuery from 'jQuery';
import firebase from 'firebase/app';

class PhotoInfo {
  public id: number;
  public subTitle: string;
  public title: string;
  public mimetype: string;
  // public fileName: string;
  // public size: number;
  public data: Buffer;
  public createdDatetime: string;
  // public modifiedDatetime: string;

  constructor(id: number, subTitle: string, title: string, mimetype: string, fileName: string,
              size: number, data: Buffer, createdDatetime: string, modifiedDatetime: string) {
    this.id = id;
    this.subTitle = subTitle;
    this.title = title;
    this.mimetype = mimetype;
    // this.fileName = file_ame;
    // this.size = size;
    this.data = data;
    this.createdDatetime = createdDatetime;
    // this.modifiedDatetime = modifiedDatetime;
  }
}

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

const getVideo = () => {
  return new Promise<VideoInfo>(async (resolve, reject) => {
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get('https://express.management/video', {
        headers: header,
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

@Component({
  components: {
    Modal,
    ConfirmModal,
    SubMenu,
  },
})
export default class ManagementUpload extends Vue {
  private isDisplay: boolean = false;
  private isPlaying: boolean = false;
  private confirmMessage: string = '';
  private photoMultiArray: PhotoInfo[][] = [];
  private videoSrc: string = '';

  private transitionDelay(rate: number, index: number): string {
    const delay = rate * index;
    return 'transition-delay: ' + delay + 's';
  }

  private firstChildRow(index: number): string {
    if (index === 0) {
      return 'margin-top: 70px;';
    }
    return 'margin-top: auto;';
  }

  private setPhoto(indexX: number, indexY: number): string {
    const buffer = Buffer.from(this.photoMultiArray[indexX][indexY].data);
    const blob = new Blob([buffer], {type: this.photoMultiArray[indexX][indexY].mimetype});
    const blobURL = window.URL.createObjectURL(blob);
    return blobURL;
  }

  private mounted() {
    this.fadein();
    $('.content').scroll(() => {
      this.fadein();
      this.stop();
    });

    $('.project-row').each((index) => {
      if (index === 0) {
        console.log($(this));
        $(this).css({
          'padding-top': '70px !important',
        });
      }
    });
  }

  private created() {
    this.photoMultiArray = this.$store.getters.getPhotos;
  }

  private fadein(): void {
    const offset = 30;
    const effectPos = $(window).height()! - offset;
    $('.column').each( function() {
      const thisPos = $(this).offset()!.top;
      if ( effectPos > thisPos ) {
        $(this).css({
            'opacity': 1,
            'transform': 'translate(0px, 0px)',
            '-ms-filter': 'blur(0px)',
            'filter': 'blur(0px)',
        });
      } else {
        $(this).css({
            'opacity': 0,
            'transition-delay': '0s',
        });
      }
    });
  }

  private addImage(event: any): void {
    $('#add-input').click();
  }

  private addVideo(event: any): void {
    $('#add-video-input').click();
  }

  private onChangeAdd(event: any): void {
    this.confirmMessage = 'will you add image really?';
    ($('.ui.basic.modal.confirm') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('.ui.basic.modal.loading') as any).modal({
            closable: false,
        }).modal('show');

        const params = new FormData();
        params.append('file', event.target.files[0]);
        await axios.post('https://express.management/image', params)
        .then((res) => {
          alert('success');
        })
        .catch((err) => {
          alert(err);
        });

        ($('.ui.basic.modal') as any).modal('hide');
        $('#add-input').val('');

        // TODO 画面更新



        alert('アップロードが完了しました');
      },
      onDeny: (el: any) => {
        $('#add-input').val('');
      },
    }).modal('show');
  }

  private onChangeAddVideo(event: any): void {
    this.confirmMessage = 'will you add video really?';
    ($('.ui.basic.modal.confirm') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('.ui.basic.modal.loading') as any).modal({
            closable: false,
        }).modal('show');

        const params = new FormData();
        params.append('file', event.target.files[0]);
        await axios.post('https://express.management/video', params)
        .then((res) => {
          alert('success');
        })
        .catch((err) => {
          alert(err);
        });

        ($('.ui.basic.modal') as any).modal('hide');
        $('#add-video-input').val('');

        // TODO 画面更新



        alert('アップロードが完了しました');
      },
      onDeny: (el: any) => {
        $('#add-video-input').val('');
      },
    }).modal('show');
  }

  private async play(id: number): Promise<void> {
    if ( this.isDisplay ) {
      this.stop();
      return;
    }

    ($('.ui.basic.modal.loading') as any).modal({
      closable: false,
    }).modal('show');

    await getVideo().then((videoInfo) => {
      const buffer = Buffer.from(videoInfo.data);
      const blob = new Blob([buffer], {type: videoInfo.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      document.querySelector('source')!.src = blobURL;
    }).catch((err) => {
      alert(err);
    });

    ($('.ui.basic.modal') as any).modal('hide');

    document.querySelector('video')!.play();
    this.isDisplay = true;
    this.isPlaying = true;

    $('.content, #sub-menu').css({
      opacity: 0,
    });

    $('video').css({
      'opacity': 1,
      'z-index': 10,
    });
  }

  private stop(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      return;
    }

    document.querySelector('video')!.pause();
    this.isDisplay = false;

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
.content {
  position: fixed;
  top: 54px; right: 0; bottom: 0; left: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: auto;
  margin: auto;
  transition: 1s;
  will-change: transform;
}

::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
}

#add-image {
  position: fixed;
  top: 54px; right: 0; bottom: 0; left: 0;
  margin-top: 0px !important;
  margin: auto;
  width: 200px;
  height: 20px;
  z-index: 10;

  button {
    font-size: 12px;
    // height: 20px;
  }

  input {
    height: 20px;
    display: none;
  }
}

#sub-menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100px;
  height: 270px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
}

video {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 40%;
  transition: 0.2s;
  z-index: -10;
}

.image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    position: fixed;
  }
}

img {
  width: 100%;
}

.box-left {
  margin-left: auto;
  margin-right: 150px;
}

.box-right {
  margin-top: 70px;
  margin-left: 150px;
  margin-bottom: 30px;
}
  
.row {
  // margin-top: -30px; 
}

.column {
  min-width: 50%;
  width: 100%;
  // height: 100%;
  // opacity: 0;
  transform: translate(0px, 30px) translate3d(0, 0, 0);
  transition: 2s;
  will-change: transform;
  -ms-filter: blur(30px);
  filter: blur(30px);
  
  .content-box {
    // position: relative;
    width: 340px;
    cursor: pointer;
    // z-index: 5;

    .subject {
      text-align: left;
      margin-top: 10px;
      p {
        font-size: 12px;
        margin-bottom: 0px;
      }
      h4 {
        margin-top: 0px;
        color: #ffffff;
        p {
          font-size: 16px;
          display: inline-block;
          transition: 0.6s
        }
      }
    }
  }
}

.content-box:hover {
  h4 p {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}

@media screen and (max-width: 768px){
  .content {
    top: 90px;

    .row {
      margin: auto !important;
      padding-top: 0px;
    }
  }

  #sub-menu-wrap {
    display: none;
  }

  video {
    width: 100%;
  }

  .box-left {
    margin: auto;
  }

  .box-right {
    margin: auto;
  }

  .column {
    min-width: 100%;
    margin-bottom: 30px !important;
    .content-box {
      width: 80%;

      .subject {
        margin-top: 0px;

        p {
          font-size: 6px;
        }

        h4 p {
          padding-top: 0px;
          font-size: 13px;
        }
      }
    }
  }

  .column.left {
    margin-bottom: 60px !important;
  }
}
</style>
