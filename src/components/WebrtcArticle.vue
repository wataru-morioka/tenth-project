<template lang='pug'>
  div.contents#edit-article-content
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
            div.button-wrap
              button(class='ui inverted orange button', @click='saveAricle($event)') Save
            div#toolbar-container
            div#editor
              p Write an article.
    div.article-list(class='ui comments', v-for='([key, value], index) in Array.from(this.$store.state.distinctArticleMap)', :key='key')
      input(type='hidden', :value='setArticleId(key)')
      div.comment
        a.avatar
          img.avatar(:src='setThumbnail(key)')
        div.content
          a.author {{ value.contributorName }}
          div.metadata
            span.date {{ value.createdDatetime }}
          div.article.history
            div.button-wrap
              button(class='ui inverted primary button', @click='editAricle($event, key)') Edit
              button(class='ui inverted secondary button', @click='saveAricle($event, key)') Save
            div.toolbar-container
            div.editor
              span(v-html='setBody(value.body)')
          hr.comment-border
          div.input-comment-wrap
            div.comment-icon(@click='showInputComment($event)')
              i(class='pencil alternate icon') 
                span comment
            form(class='ui reply form')
              div.field
                textarea.comment-text
              button(class='ui inverted green button', type='button', @click='sendComment($event, key)') Send a Comment
            div(class='ui comments')
              div.comment.history(v-for='(comment, index) in commentArray(key)', :key='index')
                a.avatar
                  img.avatar(:src='setCommentThumbnail(comment.thumbnail)')
                div.content
                  a.author {{ comment.name }}
                  div.metadata
                    span.date {{ comment.createdDatetime }}
                  p {{ comment.body }}
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
// const SimpleUploadAdapter = require('@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter');

class Comment {
  public name: string;
  public body: string;
  public thumbnail: Uint8Array;
  public createdDatetime: string;

  constructor(name: string, body: string, thumbnail: Uint8Array, createdDatetime: string) {
    this.name = name;
    this.body = body;
    this.thumbnail = thumbnail;
    this.createdDatetime = createdDatetime;
  }
}

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
  private distinctArticleMap = null;
  private isEditing: boolean = false;
  // private commentMessage: string = '';

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
    this.distinctArticleMap = this.$store.state.distinctArticleMap;
  }

  private mounted() {
    this.setEditor();
    this.fadein();
    $('.contents').scroll( async () => {
      this.fadein();
      const doch = document.querySelector('#edit-article-content')!.scrollHeight + 120;
      const winh = $(window).innerHeight()!;
      const bottom = doch - winh;
      if (bottom <= $('#edit-article-content').scrollTop()!) {
        await ($('#loading-modal') as any).modal({
          closable: false,
          onVisible: async () => {
            await this.$store.dispatch('getArticles', {
              additional: true,
            });
            await ($('.modal') as any).modal({
              closable: false,
            }).modal('hide');
          },
        }).modal('show');
      }
    });
  }

  private updated() {
    this.fadein();
    this.resetEditor();
  }

  private setBody(body: string): string {
    return body;
  }

  private commentArray(articleId: number): Comment[] {
    const targetArray = this.$store.state.articleArray.filter((article: any) => {
      return article.id === articleId && article.commentatorName != null;
    });
    const commentArray = targetArray.map((article: any) => {
      return new Comment(
        article.commentatorName,
        article.commentBody,
        article.commentatorThumbnail,
        article.commentCreatedDatetime,
      );
    });
    return commentArray;
  }

  private async sendComment(event: any, id: number): Promise<void> {
    const form = $(event.currentTarget).parents('form')[0];
    const commnetArea = $(form).find('textarea')[0];
    let comment = $(commnetArea).val() as string;
    comment = comment.replace(/^\s+/, '').replace(/\s+$/, '');

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

                // this.commentMessage = '';
                $(commnetArea).val('');
                $(form).hide(300);

                await this.$store.dispatch('getArticles', {
                  additional: false,
                }).then(() => {
                  this.articleArray = this.$store.state.articleArray;
                  this.distinctArticleMap = this.$store.state.distinctArticleMap;
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
      // plugins: [ SimpleUploadAdapter ],
      // simpleUpload: {
      //   uploadUrl: 'https://django.service/api/service/image',
      //   headers: this.$store.state.authHeader,
      // },
      // simpleUpload: {
      //   uploadUrl: {
      //     url: 'https://django.service/api/service/image',
      //      headers: this.$store.state.authHeader,
      //   },
      // },
    })
    .then( (editor: any) => {
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
        // plugins: [ SimpleUploadAdapter ],
        // simpleUpload: {
        //   uploadUrl: 'https://django.service/api/service/image',
        //   headers: this.$store.state.authHeader,
        // },
        // simpleUpload: {
        //   uploadUrl: {
        //     url: 'https://django.service/api/service/image',
        //     headers: this.$store.state.authHeader,
        //   },
        // },
      })
      .then( (editor: any) => {
        this.editors.set(articleId, editor);
        editor.isReadOnly = true;

        const target: any = this.$store.state.articleArray.filter((x: any) => {
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
      // plugins: [ SimpleUploadAdapter ],
      // simpleUpload: {
      //   uploadUrl: 'https://django.service/api/service/image',
      //   headers: this.$store.state.authHeader,
      // },
      // simpleUpload: {
      //   uploadUrl: {
      //     url: 'https://django.service/api/service/image',
      //      headers: this.$store.state.authHeader,
      //   },
      // },
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
      const target: any = this.$store.state.articleArray.filter((x: any) => {
        return (x as any).id === Number(articleId);
      });

      if (this.editors.get(articleId)) {
        this.editors.get(articleId).destroy();
        DecoupledEditor
        .create( editorElement, {
          ckfinder: {
            uploadUrl: 'https://django.service/api/service/image',
          },
          // plugins: [ SimpleUploadAdapter ],
          // simpleUpload: {
          //   uploadUrl: 'https://django.service/api/service/image',
          //   headers: this.$store.state.authHeader,
          // },
          // simpleUpload: {
          //   uploadUrl: {
          //     url: 'https://django.service/api/service/image',
          //     headers: this.$store.state.authHeader,
          //   },
          // },
        })
        .then(async (editor: any) => {
          editor.isReadOnly = true;
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
          // plugins: [ SimpleUploadAdapter ],
          // simpleUpload: {
          //   uploadUrl: 'https://django.service/api/service/image',
          //   headers: this.$store.state.authHeader,
          // },
          // simpleUpload: {
          //   uploadUrl: {
          //     url: 'https://django.service/api/service/image',
          //     headers: this.$store.state.authHeader,
          //   },
          // },
        })
        .then(async (editor: any) => {
          editor.isReadOnly = true;
          this.editors.set(articleId, editor);
          await editor.setData(target[0].body);
        })
        .catch( (err: any) => {
          console.log(err);
          console.error( err.stack );
        });
      }
    });
  }

  private editAricle(event: any, articleId: number = 0): void {
    const target = $(event.currentTarget);
    const saveButton = $(target).next();
    const parent = $(target).parents('.article.history')[0];
    const toolbarElement = $(parent).children('.toolbar-container')[0];
    const editorElement = $(parent).children('.editor')[0];
    const span = $(editorElement).children('span')[0];
    const editor = this.editors.get(String(articleId));

    if ($(target).hasClass('secondary')) {
      this.isEditing = false;

      $(saveButton).removeClass('orange');
      $(saveButton).addClass('secondary');
      $(target).removeClass('secondary');
      $(target).addClass('primary');
      $(target).text('Edit');

      // ckeditor解除
      $(span).css('display', 'block');
      editor.isReadOnly = true;
      $(toolbarElement).empty();
      return;
    }

    if (this.isEditing) {
      alert('他に編集中の記事があります');
      return;
    }

    this.isEditing = true;
    $(target).addClass('loading');

    // ckeditorセット
    const toolbarContainer = toolbarElement;
    toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    editor.isReadOnly = false;

    $(span).css('display', 'none');
    $(target).removeClass('loading');
    $(target).removeClass('primary');
    $(target).addClass('secondary');
    $(saveButton).removeClass('secondary');
    $(saveButton).addClass('orange');
    $(target).text('Cancel');
  }

  private async saveAricle(event: any, articleId: number = 0): Promise<void> {
    const target = event.currentTarget;
    const editButton = $(target).prev();
    const parent = $(target).parents('.article.history')[0];
    const toolbarElement = $(parent).children('.toolbar-container')[0];
    const editorElement = $(parent).children('.editor')[0];
    const span = $(editorElement).children('span')[0];

    if ($(target).hasClass('secondary')) {
      alert('編集中ではありません');
      return;
    }

    await ($('#loading-modal') as any).modal({
      closable: false,
    }).modal('show');

    let result: boolean = false;

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
          result = true;
          this.showPostInputArea();
        })
        .catch((err) => {
          console.log(err);
          alert('保存に失敗しました');
        });
      } else {
        const article: any = this.$store.state.articleArray.filter((x: any) => {
          return (x as any).id === articleId;
        });
        console.log(article);
        const editor = this.editors.get(String(article[0].id));
        const body = {
          articleId: article[0].id,
          body: editor.getData(),
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
          result = true;
          editor.isReadOnly = true;
        })
        .catch((err) => {
          console.log(err);
          alert('保存に失敗しました');
        });
      }

      if (result) {
        await this.$store.dispatch('getArticles', {
            additional: false,
          }).then(() => {
          this.articleArray = this.$store.state.articleArray;
          this.distinctArticleMap = this.$store.state.distinctArticleMap;
        });

        this.isEditing = false;

        $(target).removeClass('orange');
        $(target).addClass('secondary');
        $(editButton).removeClass('secondary');
        $(editButton).addClass('primary');
        $(editButton).text('Edit');

        // ckeditor解除
        $(span).css('display', 'block');
        const editor = this.editors.get(String(articleId));
        $(toolbarElement).empty();

        alert('保存しました');
      }
      ($('.modal') as any).modal('hide');
    }, 500);
  }

  private setCommentThumbnail(thumbnail: Uint8Array): string {
    const buffer = Buffer.from(thumbnail);
    const blob = new Blob([buffer], {type: (thumbnail as any).mimetype});
    const blobURL = window.URL.createObjectURL(blob);
    return blobURL;
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

    const target: any = this.$store.state.articleArray.filter((x: any) => {
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

#post-new {
  margin-bottom: 50px;
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
  width: 60%;
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

    .article {
      margin-top: 10px;

      #editor, .editor {
        color: #ffffff;
      }

      .button-wrap {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;

        button {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 12px;
        }
      }
    }

    .comment-border {
      height: 1px;
      background-color: #ffffff77;
      border: none;
      margin-top: 10px;
      margin-bottom: 5px;
    }

    .input-comment-wrap {
      .comment-icon {
        margin: 10px;
        // text-align: center;
        span {
          margin-left: 10px;
        }
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

    .comment.history {
      margin-bottom: 20px;
      p {
        white-space:pre-wrap;
        color: #ffffff;
      }
    }
  }

  img {
    max-width: 100% !important;
  }
}

@media screen and (max-width: 768px){
  .contents {
    bottom: 0px;
  }

  .article-list {
    width: 98%;

    .avatar {
      width: 30px !important;
      height: 30px !important;
    }
  }
}
</style>