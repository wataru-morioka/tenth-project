<template lang='pug'>
  div.contents
    Modal
    ConfirmModal(:confirmMessage='confirmMessage')
    div#post-new.article-list(class='ui comments')
      div.comment
        a.avatar
          img.avatar(:src='setThumbnail()')
        div.content
          a.author {{ this.$store.state.displayName }}
          div.metadata
          div#plus-post(@click='showPostInputArea()') 
            i(class='pencil alternate icon') 
            span POST
            hr
          div#input-post.article
            div#toolbar-container
            div#editor
              p Write an article.
            button(class='ui inverted primary button', @click='saveAricle()') Save
    div.article-list(class='ui comments', v-for='(article, index) in articleArray', :key='article.id')
      div.comment
        a.avatar
          img.avatar(:src='setThumbnail(index)')
        div.content
          a.author {{ article.contributorName }}
          div.metadata
            span.date {{ article.modifiedDatetime }}
          div.article.history
            div.toolbar-container
            div.editor
            button(class='ui inverted primary button', @click='saveAricle(index)') Save
    div#article-list

</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import jQuery from 'jQuery';
import axios from 'axios';
// tslint:disable-next-line:no-var-requires
const DecoupledEditor = require('@ckeditor/ckeditor5-build-decoupled-document');

@Component({
  components: {
    Modal,
    ConfirmModal,
  },
})
export default class WebrtcArticle extends Vue {
  private confirmMessage: string = '';
  private inputPostDisplay: boolean = false;
  private editors: Map<string, any> = new Map<string, any>();
  private articleArray = [];

  private created() {
    this.articleArray = this.$store.state.articleArray;
  }

  private mounted() {
    DecoupledEditor
    .create( document.querySelector('#editor'), {
      ckfinder: {
        uploadUrl: 'https://django.service/api/service/image',
      },
    })
    .then( (editor: any) => {
      // (window as any).editor = editor;
      this.editors.set('new', editor);
      const toolbarContainer = document.querySelector('#toolbar-container')!;
      toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    })
    .catch( (err: any) => {
      console.error( err.stack );
    });

    $('.article.history').each((index, element) => {
      const toolbarElement = $(element).children('.toolbar-container')[0];
      const editorElement = $(element).children('.editor')[0];
      DecoupledEditor
      .create( editorElement, {
        ckfinder: {
          uploadUrl: 'https://django.service/api/service/image',
        },
      })
      .then( (editor: any) => {
        const articleId = (this.articleArray[index] as any).id;
        this.editors.set(String(index), editor);
        const toolbarContainer = toolbarElement;
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        editor.setData((this.articleArray[index] as any).body);
      })
      .catch( (err: any) => {
        console.error( err.stack );
      });
    });
  }

  private async saveAricle(index: number = -1): Promise<void> {
    await ($('#loading-modal') as any).modal({
      closable: false,
    }).modal('show');

    setTimeout(async () => {
      if (index === -1) {
        const body = {
          body: this.editors.get('new').getData(),
        };
        await axios.post('https://django.service/api/service/article', body, {
          headers: this.$store.state.authHeader,
        })
        .then((res) => {
          if (!res.data.result) {
            console.log('保存に失敗しました');
            return;
          }
          alert('保存しました');
        })
        .catch((err) => {
          console.log(err);
          console.log('保存に失敗しました');
        });
      } else {
        const body = {
          articleId: (this.articleArray[index] as any).id,
          body: this.editors.get(String(index)).getData(),
        };
        console.log(body);
        await axios.put('https://django.service/api/service/article', body, {
          headers: this.$store.state.authHeader,
        })
        .then((res) => {
          if (!res.data.result) {
            console.log('保存に失敗しました');
            return;
          }
          alert('保存しました');
        })
        .catch((err) => {
          console.log(err);
          console.log('保存に失敗しました');
        });
      }
      this.$store.dispatch('getArticles');
      ($('.modal') as any).modal('hide');
    }, 1000);
  }

  private setThumbnail(index: number = -1): string {
    if (index === -1) {
      const thumbnail = this.$store.state.thumbnail;
      if (thumbnail === null) {
        return '';
      }
      const buffer = Buffer.from(thumbnail);
      const blob = new Blob([buffer], {type: thumbnail.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      return blobURL;
    }

    const thumbnail2 = (this.articleArray[index] as any).thumbnail;
    const buffer2 = Buffer.from(thumbnail2);
    const blob2 = new Blob([buffer2], {type: thumbnail2.mimetype});
    const blobURL2 = window.URL.createObjectURL(blob2);
    return blobURL2;
  }

  private showPostInputArea(): void {
    if (this.inputPostDisplay) {
      $('#input-post').hide(300);
    } else {
      $('#input-post').slideToggle(300);
    }
    this.inputPostDisplay = !this.inputPostDisplay;
  }
}
</script>

<style scoped lang='scss'>
.contents {
  position: fixed;
  top: 60px; right: 0; bottom: 60px; left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin: auto;
}

#plus-post:hover {
  cursor: pointer;
}

#plus-post {
  margin-top: 10px;

  i {
    width: 20px;
    height: 20px;
  }
}

#input-post {
  display: none;
}

.article-list {
  width: 50%;
  max-width: 100% !important;

  .avatar {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50% !important;
  }

  .avatar:hover {
    cursor: pointer;
  }

  .content {
    text-align: left;

    .author {
      color: #ffffff !important;
      font-size: 12px;
    }

    .metadata {
      color: #ffffff77 !important;
      margin-left: 20px;
    }

    .text {
      color: #ffffff !important;
    }

    .article {
      margin-top: 10px;

      #editor {
        color: #ffffff;
      }

      button {
        margin-top: 10px;
      }
    }
  }
}



@media screen and (max-width: 768px){
  .content {
    bottom: 0px;
  }
}

</style>