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
            button(class='ui inverted orange button', @click='saveAricle()') Save
    div.article-list(class='ui comments', v-for='(article, index) in articleArray', :key='article.id')
      input(type='hidden', :value='setArticleId(article.id)')
      div.comment
        a.avatar
          img.avatar(:src='setThumbnail(article.id)')
        div.content
          a.author {{ article.contributorName }}
          div.metadata
            span.date {{ article.createdDatetime }}
          div.article.history
            div.toolbar-container
            div.editor
            button(class='ui inverted orange button', @click='saveAricle($event, article.id)') Save
          hr.comment-border
          div.input-comment-wrap
            div.comment-icon(@click='showInputComment($event)')
              i(class='pencil alternate icon') 
                span comment
            form(class='ui reply form')
              div.field
                textarea.comment-text
              button(class='ui inverted primary button', type='button', @click='sendComment($event, article.id)') Send a Comment
            div(style='height: 150px;')
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

  private fadein(): void {
    const offset = 60;
    const effectPos = $(window).height()! - offset;
    $('.article-list').each( function() {
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

  private created() {
    this.articleArray = this.$store.state.articleArray;
  }

  private mounted() {
    this.setEditor();
    this.fadein();
    $('.contents').scroll(() => {
      this.fadein();
    });
  }

  private updated() {
    this.fadein();
    this.resetEditor();
  }

  private async sendComment(event: any, id: number): Promise<void> {
    const form = $(event.currentTarget).parents('form')[0];
    const textArea = $(form).find('textarea')[0];
    const comment: string = $(textArea).val() as string;

    if (comment.length === 0) {
      alert('コメントを入力してください');
      return;
    }

    if (comment.length > 1000) {
      alert('最大文字数は1000文字です');
      return;
    }

    this.confirmMessage = 'will you send a comment really?';
    ($('#confirm-modal') as any).modal({
      closable: false,
      onApprove: async (el: any) => {
        ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            setTimeout(async () => {
              const body = {
                articleId: id,
                body: comment,
              };

              await axios.post('https://django.service/api/service/comment', body, {
                headers: this.$store.state.authHeader,
              })
              .then(async (res) => {
                if (!res.data.result) {
                  alert('コメント送信に失敗しました');
                  return;
                }

                $(textArea).val('');
                $(form).hide(300);

                await this.$store.dispatch('getArticles').then(() => {
                  this.articleArray = this.$store.state.articleArray;
                });
                alert('送信しました');
              })
              .catch((err) => {
                console.log(err);
                alert('コメント送信に失敗しました');
              });

              ($('.modal') as any).modal('hide');
            }, 500);
          },
        }).modal('show');
      },
    }).modal('show');
  }

  private showInputComment(event: any): void {
    const parent = $(event.currentTarget).closest('.input-comment-wrap');
    const form = $(parent).children('form')[0];
    if ($(form).css('display') === 'none') {
      $(form).slideToggle(300);
    } else {
      $(form).hide(300);
    }
  }

  private setArticleId(id: number): number {
    return id;
  }

  private setEditor(): void {
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
      console.log(err);
      console.error( err.stack );
    });

    $('.article.history').each((index, element) => {
      const toolbarElement = $(element).children('.toolbar-container')[0];
      const editorElement = $(element).children('.editor')[0];
      const inputElement = $(element).parents('.article-list').children('input')[0];
      const articleId: string = $(inputElement).val() as string;
      DecoupledEditor
      .create( editorElement, {
        ckfinder: {
          uploadUrl: 'https://django.service/api/service/image',
        },
      })
      .then( (editor: any) => {
        this.editors.set(articleId, editor);
        const toolbarContainer = toolbarElement;
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );

        const target: any = this.articleArray.filter((x) => {
          return (x as any).id === Number(articleId);
        });
        editor.setData(target[0].body);
      })
      .catch( (err: any) => {
        console.error( err.stack );
      });
    });
  }

  private resetEditor(): void {
    this.editors.get('new').destroy();
    DecoupledEditor
    .create( document.querySelector('#editor'), {
      ckfinder: {
        uploadUrl: 'https://django.service/api/service/image',
      },
    })
    .then( (editor: any) => {
      // (window as any).editor = editor;
      this.editors.set('new', editor);
      editor.setData('<p>Write an article.</p>');
    })
    .catch( (err: any) => {
      console.error( err.stack );
    });

    $('.article.history').each((index, element) => {
      const toolbarElement = $(element).children('.toolbar-container')[0];
      const editorElement = $(element).children('.editor')[0];
      const inputElement = $(element).parents('.article-list').children('input')[0];
      const articleId: string = $(inputElement).val() as string;
      const target: any = this.articleArray.filter((x) => {
        return (x as any).id === Number(articleId);
      });

      if (this.editors.get(articleId)) {
        this.editors.get(articleId).destroy();
        DecoupledEditor
        .create( editorElement, {
          ckfinder: {
            uploadUrl: 'https://django.service/api/service/image',
          },
        })
        .then(async (editor: any) => {
          this.editors.set(articleId, editor);
          await editor.setData(target[0].body);
        })
        .catch( (err: any) => {
          console.log(err);
          console.error( err.stack );
        });
      } else {
        DecoupledEditor
        .create( editorElement, {
          ckfinder: {
            uploadUrl: 'https://django.service/api/service/image',
          },
        })
        .then(async (editor: any) => {
          this.editors.set(articleId, editor);
          const toolbarContainer = toolbarElement;
          toolbarContainer.appendChild( editor.ui.view.toolbar.element );
          await editor.setData(target[0].body);
        })
        .catch( (err: any) => {
          console.log(err);
          console.error( err.stack );
        });
      }
    });
  }

  private async saveAricle(event: any, articleId: number = 0): Promise<void> {
    await ($('#loading-modal') as any).modal({
      closable: false,
    }).modal('show');

    setTimeout(async () => {
      if (articleId === 0) {
        const body = {
          body: this.editors.get('new').getData(),
        };
        await axios.post('https://django.service/api/service/article', body, {
          headers: this.$store.state.authHeader,
        })
        .then((res) => {
          if (!res.data.result) {
            alert('保存に失敗しました');
            return;
          }
          alert('保存しました');
          this.showPostInputArea();
        })
        .catch((err) => {
          console.log(err);
          alert('保存に失敗しました');
        });
      } else {
        const target: any = this.articleArray.filter((x) => {
          return (x as any).id === articleId;
        });
        console.log(target);
        const body = {
          articleId: target[0].id,
          body: this.editors.get(String(target[0].id)).getData(),
        };
        console.log(body);
        await axios.put('https://django.service/api/service/article', body, {
          headers: this.$store.state.authHeader,
        })
        .then(async (res) => {
          if (!res.data.result) {
            alert('保存に失敗しました');
            return;
          }
          await this.$store.dispatch('getArticles').then(() => {
            this.articleArray = this.$store.state.articleArray;
          });
          alert('保存しました');
        })
        .catch((err) => {
          console.log(err);
          alert('保存に失敗しました');
        });
      }
      ($('.modal') as any).modal('hide');
    }, 500);
  }

  private setThumbnail(articleId: number = 0): string {
    if (articleId === 0) {
      const thumbnail = this.$store.state.thumbnail;
      if (thumbnail === null) {
        return '';
      }
      const buffer = Buffer.from(thumbnail);
      const blob = new Blob([buffer], {type: thumbnail.mimetype});
      const blobURL = window.URL.createObjectURL(blob);
      return blobURL;
    }

    const target: any = this.articleArray.filter((x) => {
        return (x as any).id === articleId;
      });
    const thumbnail2 = target[0].thumbnail;
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
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin: auto;
}

::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
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
  margin-bottom: 50px;
  width: 50%;
  max-width: 100% !important;
  opacity: 0;
  transform: translate(0px, 60px) translate3d(0, 0, 0);
  transition: 1.5s;
  -ms-filter: blur(50px);
  filter: blur(50px);

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
        font-size: 12px;
      }
    }

    .comment-border {
      height: 1px;
      background-color: #ffffff77;
      border: none;
    }

    .input-comment-wrap {
      .comment-icon {
        margin: 10px;
        text-align: center;
      }

      .comment-icon:hover {
        cursor: pointer;
      }

      form {
        display: none;

        textarea {
          height: 15px;
        }

        button {
          font-size: 10px;
        }
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