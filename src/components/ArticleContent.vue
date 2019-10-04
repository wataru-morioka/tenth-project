<template lang='pug'>
  div#article-content.contents
    Modal
    ConfirmModal(:confirmMessage='confirmMessage')
    div.article-list(class='ui comments', v-for='([articleId, articleInfo], index) in Array.from(this.$store.state.distinctArticleMap)', :key='articleId')
      input(type='hidden', :value='setArticleId(articleId)')
      div.comment
        a.avatar
          img.avatar(:src='setThumbnail(articleId)')
        div.content
          a.author {{ articleInfo.contributorName }}
          div.metadata
            span.date {{ articleInfo.createdDatetime }}
          div.article.history
            div.button-wrap
            div.toolbar-container
            div.editor
              span(v-html='setBody(articleInfo.body)')
          hr.comment-border
          div.input-comment-wrap
            div.comment-icon(v-if='isVip', @click='showInputComment($event)')
              i(class='pencil alternate icon') 
                span comment
            form(class='ui reply form')
              div.field
                textarea.comment-text(v-model='commentMessage')
              button(class='ui inverted green button', type='button', @click='sendComment($event, articleId)') Send a Comment
            div(class='ui comments')
              div.comment.history(v-for='(comment, index) in commentArray(articleId)', :key='index')
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
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Modal from '@/components/Modal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import jQuery from 'jQuery';
import axios from 'axios';
// tslint:disable-next-line:no-var-requires
const DecoupledEditor = require('@ckeditor/ckeditor5-build-decoupled-document');

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
  computed: mapState({
    isVip: 'isVip',
  }),
})
export default class ArticleContent extends Vue {
  private confirmMessage: string = '';
  private inputPostDisplay: boolean = false;
  private editors: Map<string, any> = new Map<string, any>();
  private articleArray = [];
  private distinctArticleMap = null;
  private isEditing: boolean = false;
  private commentMessage: string = '';

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
    // this.fadein();
    setTimeout(() => {
      this.fadein();
      console.log(this.$store.state.distinctArticleMap);
    }, 2500);

    $('.contents').scroll(async () => {
      this.fadein();
      const doch = document.querySelector('#article-content')!.scrollHeight + 130;
      const winh = $(window).innerHeight()!;
      const bottom = doch - winh;
      if (bottom <= $('#article-content').scrollTop()!) {
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

  private setBody(body: string): string {
    return body;
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
    const comment = this.commentMessage.replace(/^\s+/, '').replace(/\s+$/, '');

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

                this.commentMessage = '';
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

  private setArticleId(id: number): number {
    return id;
  }

  private setEditor(): void {
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
  align-items: center;
  margin: auto;
}

::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
}

.article-list {
  width: 60%;
  max-width: 100% !important;
  opacity: 0;
  transform: translate(0px, 60px) translate3d(0, 0, 0);
  transition: 1.5s;
  -ms-filter: blur(50px);
  filter: blur(50px);
  // transition-delay: 2.3s;

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
  .article-list {
    width: 98%;

    .avatar {
      width: 30px !important;
      height: 30px !important;
    }
  }
}
</style>
