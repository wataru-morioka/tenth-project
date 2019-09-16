<template lang='pug'>
div
  Modal
  ConfirmModal(:confirmMessage='confirmMessage')
  div#sub-menu-wrap
    SubMenu
  video(controls playsinline)
    //- source(:src='videoSrc' type='video/mp4')
  div#add-image
    button(type=button class='ui inverted red button', @click='addPhoto($event)') add
    input#add-input(type='file', @change='onChangeAddPhoto($event)')
    //- button(type=button class='ui inverted orange button', @click='addVideo($event)', style='display: none') add video
    //- input#add-video-input(type='file', @change='onChangeAddVideo($event)')
  div.content(class="ui two column divided grid", @click='stop')
    div.row(v-for='(photoArray, index) in photoMultiArray', :key='index', :style='firstChildRow(index)')
      div.column.left(:style='transitionDelay(0.2, index * 2)')
        div.content-box.box-left
          div.edit-photo-wrap
            button(type=button class='ui inverted primary button', @click='editPhoto($event)') edit
            div.upload-wrap
              button(type=button class='ui inverted orange button', @click='uploadThumbnail($event)') thumbnail
              input.edit-thumbnail(type='file', @change='onChangeThumbnail($event, photoArray[0].id)')
              button(type=button class='ui inverted orange button', @click='uploadVideo($event)') video
              input.edit-video(type='file', @change='onChangeVideo($event, photoArray[0].id)')
          div.image(@click='play(photoArray[0].id)')
            i.huge.play.icon
            img(:src='setPhoto(index, 0)')
          div.subject
            //- p {{ photoArray[0].subTitle }}
            input.sub-title(type='text', readonly=true, :value='photoArray[0].subTitle')
            button(type=button class='ui inverted primary button', @click='editSubTitle($event, photoArray[0].id)') edit
            h4 
              //- p(v-for='(char, charIndex) in Array.from(photoArray[0].title)', :key='charIndex', :style='transitionDelay(0.02, charIndex)')
              //-   span {{ char }}
              //- span
              //-   button(type=button class='ui inverted primary button', @click='editTitle($event)') edit
              input.title(type='text', readonly=true, :value='photoArray[0].title')
              button(type=button class='ui inverted primary button', @click='editTitle($event, photoArray[0].id)') edit
            button(type=button class='ui inverted yellow button', @click='minify(photoArray[0].id)') minify
            button(type=button class='ui inverted green button', @click='download(photoArray[0].id)') download
            button(type=button class='ui inverted red button', @click='deletePhoto(photoArray[0].id)') delete
      div.column(v-if='existsPhoto(photoArray[1])', :style='transitionDelay(0.2, index * 2 + 1)')
        div.content-box.box-right
          div.edit-photo-wrap
            button(type=button class='ui inverted primary button', @click='editPhoto($event)') edit
            div.upload-wrap
              button(type=button class='ui inverted orange button', @click='uploadThumbnail($event)') thumbnail
              input.edit-thumbnail(type='file', @change='onChangeThumbnail($event, photoArray[1].id)')
              button(type=button class='ui inverted orange button', @click='uploadVideo($event)') video
              input.edit-video(type='file', @change='onChangeVideo($event, photoArray[1].id)')
          div.image(@click='play(photoArray[1].id)')
            i.huge.play.icon
            img(:src='setPhoto(index, 1)')
          div.subject
            //- p {{ photoArray[1].subTitle }}
            input.sub-title(type='text', readonly=true, :value='photoArray[1].subTitle')
            button(type=button class='ui inverted primary button', @click='editSubTitle($event, photoArray[1].id)') edit
            h4 
              //- p(v-for='(char, charIndex) in Array.from(photoArray[1].title)', :key='charIndex', :style='transitionDelay(0.02, charIndex)')
              //-   span {{ char }}
              //- span
              input.title(type='text', readonly=true, :value='photoArray[1].title')
              button(type=button class='ui inverted primary button', @click='editTitle($event, photoArray[1].id)') edit
            button(type=button class='ui inverted yellow button', @click='minify(photoArray[1].id)') minify
            button(type=button class='ui inverted green button', @click='download(photoArray[1].id)') download
            button(type=button class='ui inverted red button', @click='deletePhoto(photoArray[1].id)') delete
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
  public data: Buffer;
  public createdDatetime: string;

  constructor(id: number, subTitle: string, title: string, mimetype: string, fileName: string,
              size: number, data: Buffer, createdDatetime: string, modifiedDatetime: string) {
    this.id = id;
    this.subTitle = subTitle;
    this.title = title;
    this.mimetype = mimetype;
    this.data = data;
    this.createdDatetime = createdDatetime;
  }
}

class VideoInfo {
  public mimetype: string;
  public data: Buffer;

  constructor(mimetype: string, data: Buffer) {
    this.mimetype = mimetype;
    this.data = data;
  }
}

@Component({
  components: {
    Modal,
    ConfirmModal,
    SubMenu,
  },
})
export default class ManagementUpload extends Vue {
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

  private async mounted() {
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

    await this.$store.dispatch('getPhotos');
    this.photoMultiArray = this.$store.getters.getPhotos;
  }

  private created() {
    this.photoMultiArray = this.$store.getters.getPhotos;
    this.fadein();
    this.$store.commit('setInitVideoFlag');
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

  private getVideo(id: number) {
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
  }

   private async download(id: number): Promise<void> {
    axios.get('https://express.management/download', {
      headers: this.$store.state.authHeader,
      params: {
        photoId: id,
      },
    })
    .then((res: any) => {
      const photo = res.data.photoInfo;
      const buffer = Buffer.from(photo.data);
      const blob = new Blob([buffer], {type: photo.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = photo.file_name;
      a.href = blobURL;
      a.click();
    })
    .catch((err) => {
      alert(err);
    });
  }

  private async minify(id: number): Promise<void> {
    this.confirmMessage = 'will you minify thumbnail really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            await axios.get('https://express.management/minify', {
              headers: this.$store.state.authHeader,
              params: {
                photoId: id,
              },
            })
            .then((res: any) => {
              if (res.data.result) {
                alert('圧縮が完了しました');
              } else {
                alert('圧縮に失敗しました');
              }
            })
            .catch((err) => {
              alert(err);
            });

            await this.$store.dispatch('getPhotos');
            this.photoMultiArray = this.$store.getters.getPhotos;

            ($('.modal') as any).modal('hide');
          },
        }).modal('show');
      },
    }).modal('show');
  }

  private editPhoto(event: any): void {
    const target = event.currentTarget;
    const parent = $(target).closest('.edit-photo-wrap');
    const uploadArea = $(parent).children('.upload-wrap');
    if ($(target).hasClass('primary')) {
      (uploadArea).slideToggle(300);
      $(target).removeClass('primary');
      $(target).addClass('secondary');
      $(target).text('cancel');
      return;
    }
    $(uploadArea).hide(300);
    $(target).removeClass('secondary');
    $(target).addClass('primary');
    $(target).text('edit');
  }

  private async onChangeThumbnail(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    this.confirmMessage = 'will you change photograph really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            const body = new FormData();
            body.append('file', event.target.files[0]);
            body.append('photoId', String(id));
            await axios.put('https://express.management/photographs', body, {
              headers: this.$store.state.authHeader,
            })
            .then((res: any) => {
              if (res.data.result) {
                console.log('photoアップロードが完了');
              } else {
                alert('photoアップロードに失敗しました');
              }
            })
            .catch((err) => {
              alert(err);
            });

            alert('アップロードが完了しました');

            const parent = $(target).closest('.edit-photo-wrap');
            const uploadArea = $(parent).children('.upload-wrap');
            const editButton = $(parent).children('button')[0];

            $(uploadArea).hide(300);
            $(editButton).removeClass('secondary');
            $(editButton).addClass('primary');
            $(editButton).text('edit');

            await this.$store.dispatch('getPhotos');
            this.photoMultiArray = this.$store.getters.getPhotos;
            $('#update-menu-bt').click();

            ($('.modal') as any).modal('hide');
            $(target).val('');
          },
        }).modal('show');
      },
      onDeny: (el: any) => {
        $(target).val('');
      },
    }).modal('show');
  }

  private async onChangeVideo(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    this.confirmMessage = 'will you change video really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            const body = new FormData();
            body.append('file', event.target.files[0]);
            body.append('photoId', String(id));
            await axios.put('https://express.management/video', body, {
              headers: this.$store.state.authHeader,
            })
            .then((res: any) => {
              if (res.data.result) {
                console.log('photoアップロードが完了');
              } else {
                alert('photoアップロードに失敗しました');
              }
            })
            .catch((err) => {
              alert(err);
            });

            alert('アップロードが完了しました');

            const parent = $(target).closest('.edit-photo-wrap');
            const uploadArea = $(parent).children('.upload-wrap');
            const editButton = $(parent).children('button')[0];

            $(uploadArea).hide(300);
            $(editButton).removeClass('secondary');
            $(editButton).addClass('primary');
            $(editButton).text('edit');

            await this.$store.dispatch('getPhotos');
            this.photoMultiArray = this.$store.getters.getPhotos;

            ($('.modal') as any).modal('hide');
            $(target).val('');
          },
        }).modal('show');
      },
      onDeny: (el: any) => {
        $(target).val('');
      },
    }).modal('show');
  }

  private async uploadThumbnail(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    const parent = $(target).closest('.upload-wrap');
    const input = $(parent).children('.edit-thumbnail');
    $(input).click();
  }

  private async uploadVideo(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    const parent = $(target).closest('.upload-wrap');
    const input = $(parent).children('.edit-video');
    $(input).click();
  }

  private async editSubTitle(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    const parent = $(target).closest('.subject');
    const input = $(parent).children('.sub-title');
    if ($(target).hasClass('primary')) {
      $(input).prop('readonly', false);
      $(target).removeClass('primary');
      $(target).addClass('orange');
      $(target).text('confirm');
      return;
    }

    $(target).prop('disabled', true);
    $(target).addClass('loading');
    const body = {
      photoId: id,
      subTitle: $(input).val(),
    };
    await axios.put('https://express.management/photographs', body, {
      headers: this.$store.state.authHeader,
    })
    .then((res: any) => {
      if (res.data.result) {
        console.log('photo更新が完了');
      } else {
        alert('更新に失敗しました');
      }
    })
    .catch((err) => {
      alert(err);
    });

    await this.$store.dispatch('getPhotos');
    this.photoMultiArray = this.$store.getters.getPhotos;

    alert('更新が完了しました');
    $(target).prop('disabled', false);
    $(input).prop('readonly', true);
    $(target).removeClass('orange');
    $(target).removeClass('loading');
    $(target).addClass('primary');
    $(target).text('edit');
  }

  private async editTitle(event: any, id: number): Promise<void> {
    const target = event.currentTarget;
    const parent = $(target).closest('h4');
    const input = $(parent).children('.title');
    if ($(target).hasClass('primary')) {
      $(input).prop('readonly', false);
      $(target).removeClass('primary');
      $(target).addClass('orange');
      $(target).text('confirm');
      return;
    }

    $(target).prop('disabled', true);
    $(target).addClass('loading');
    const body = {
      photoId: id,
      title: $(input).val(),
    };
    await axios.put('https://express.management/photographs', body, {
      headers: this.$store.state.authHeader,
    })
    .then((res: any) => {
      if (res.data.result) {
        console.log('photo更新が完了');
      } else {
        alert('更新に失敗しました');
      }
    })
    .catch((err) => {
      alert(err);
    });

    await this.$store.dispatch('getPhotos');
    this.photoMultiArray = this.$store.getters.getPhotos;
    $('#update-menu-bt').click();

    alert('更新が完了しました');
    $(target).prop('disabled', false);
    $(input).prop('readonly', true);
    $(target).removeClass('loading');
    $(target).removeClass('orange');
    $(target).addClass('primary');
    $(target).text('edit');
  }

  private existsPhoto(photo: any): boolean {
    if (photo === undefined) {
      return false;
    }
    return true;
  }

  private addPhoto(event: any): void {
    $('#add-input').click();
  }

  private addVideo(event: any): void {
    $('#add-video-input').click();
  }

  private onChangeAddPhoto(event: any): void {
    this.confirmMessage = 'will you add photograph really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            const body = new FormData();
            body.append('file', event.target.files[0]);
            await axios.post('https://express.management/photographs', body, {
              headers: this.$store.state.authHeader,
            })
            .then((res) => {
              console.log('photoアップロードが完了');
            })
            .catch((err) => {
              alert(err);
            });

            await this.$store.dispatch('getPhotos');
            this.photoMultiArray = this.$store.getters.getPhotos;
            $('#update-menu-bt').click();

            ($('.modal') as any).modal('hide');
            $('#add-input').val('');
            alert('アップロードが完了しました');
          },
        }).modal('show');
      },
      onDeny: (el: any) => {
        $('#add-input').val('');
      },
    }).modal('show');
  }

  private deletePhoto(id: number) {
    this.confirmMessage = 'will you delete photograph really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            await axios.delete('https://express.management/photographs', {
              headers: this.$store.state.authHeader,
              params: {
                photoId: id,
              },
            })
            .then((res: any) => {
              console.log(res.data.result);
              if (res.data.result) {
                alert('削除が完了しました');
              } else {
                alert('削除に失敗しました');
              }
            })
            .catch((err) => {
              alert(err);
              return;
            });

            await this.$store.dispatch('getPhotos');
            this.photoMultiArray = this.$store.getters.getPhotos;
            $('#update-menu-bt').click();

            ($('.modal') as any).modal('hide');
          },
        }).modal('show');
      },
    }).modal('show');
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

    await this.getVideo(id).then((videoInfo) => {
      result = true;
      const buffer = Buffer.from(videoInfo.data);
      const blob = new Blob([buffer], {type: videoInfo.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      video.src = blobURL;
      video.load();
      video.play();
    }).catch((err) => {
      alert('videoがアップロードされていません');
      // ($('#loading-modal') as any).modal('hide');
    });

    // ($('#loading-modal') as any).modal('hide');
    ($('.modal') as any).modal('hide');

    if (!result) {
      return;
    }

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
  }

  input {
    height: 20px;
    display: none;
  }
}

.edit-thumbnail, .edit-video {
  display: none;
}

.edit-photo-wrap {
  flex-direction: column;
  display: flex;
  button {
    margin: auto;
    margin-left: 0px;
    margin-bottom: 2px;
    font-size: 10px !important;
  }
}

.upload-wrap {
  display: none;
  button {
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 2px;
    font-size: 10px !important;
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
  cursor: pointer;
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
  
.column {
  min-width: 50%;
  width: 100%;
  // height: 100%;
  opacity: 0;
  transform: translate(0px, 30px) translate3d(0, 0, 0);
  transition: 2s;
  will-change: transform;
  -ms-filter: blur(30px);
  filter: blur(30px);
  
  .content-box {
    // position: relative;
    width: 340px;
    // z-index: 5;

    .subject {
      cursor: default;
      text-align: left;
      margin-top: 10px;
      input {
        color: #ffffff;
        font-size: 12px;
        margin-bottom: 0px;
        background: (0, 0, 0, 0) !important;
      }

      .primary {
        // font-size: 10px;
        margin-left: 5px;
      }

      h4 {
        margin-top: 0px;
        input {
          color: #ffffff;
          font-size: 16px;
          display: inline-block;
          transition: 0.6s;
          background: (0, 0, 0, 0) !important;
        }

        button {
          // font-size: 10px;
          margin-left: 5px;
        }
      }

      button {
        font-size: 10px;
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
