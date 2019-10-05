import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jQuery from 'jQuery';
import firebase from 'firebase/app';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');
// tslint:disable-next-line:no-var-requires
const https = require('https');

Vue.use(Vuex);

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

class Article {
  public id: number;
  public contributorName: string;
  public body: string;
  public thumbnail: Uint8Array;
  public createdDatetime: string;
  public modifiedDatetime: string;

  constructor(id: number, contributorName: string, body: string, thumbnail: Uint8Array,
              createdDatetime: string, modifiedDatetime: string) {
    this.id = id;
    this.contributorName = contributorName;
    this.body = body;
    this.thumbnail = thumbnail;
    this.createdDatetime = createdDatetime;
    this.modifiedDatetime = modifiedDatetime;
  }
}

class ArticleInfo {
  public id: number;
  public contributorName: string;
  public body: string;
  public thumbnail: Uint8Array;
  public createdDatetime: string;
  public modifiedDatetime: string;
  public commentatorName: string;
  public commentatorThumbnail: Uint8Array;
  public commentBody: string;
  public commentCreatedDatetime: string;

  constructor(id: number, contributorName: string, body: string, thumbnail: Uint8Array,
              createdDatetime: string, modifiedDatetime: string, commentatorName: string,
              commentatorThumbnail: Uint8Array, commentBody: string, commentCreatedDatetime: string) {
    this.id = id;
    this.contributorName = contributorName;
    this.body = body;
    this.thumbnail = thumbnail;
    this.createdDatetime = createdDatetime;
    this.modifiedDatetime = modifiedDatetime;
    this.commentatorName = commentatorName;
    this.commentatorThumbnail = commentatorThumbnail;
    this.commentBody = commentBody;
    this.commentCreatedDatetime = commentCreatedDatetime;
  }
}

class Result {
  public photoMultiArray: PhotoInfo[][];
  public projectTitleMap: Map<number, string>;

  constructor() {
    this.photoMultiArray = [];
    this.projectTitleMap = new Map<number, string>();
  }
}

const getDistinctArticleMap = (articleList: ArticleInfo[]): Map<number, Article> => {
  return new Map<number, Article>(
    articleList.map((article) => [
        article.id,
        new Article(
          article.id,
          article.contributorName,
          article.body,
          article.thumbnail,
          article.createdDatetime,
          article.modifiedDatetime,
        ),
      ],
    ),
  );
};

const getArticleList = (currentArticleId: number, additional: boolean) => {
  return new Promise<ArticleInfo[]>(async (resolve, reject) => {
    const articleArray: ArticleInfo[] = [];
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };

    await axios.get('https://django.service/api/service/article', {
        headers: header,
        params: {
          current_article_id: currentArticleId,
          additional_flag: additional,
        },
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('articleリスト取得に失敗しました');
        reject();
        return;
      }
      console.log('articleリスト取得');
      const resArray = res.data.articleList;
      let article: ArticleInfo;
      resArray.forEach((el: any) => {
        let thumbnailBase64 = el.thumbnail;
        let buffer = new Uint8Array();
        if (thumbnailBase64 !== null) {
          const bin = atob(thumbnailBase64.replace(/^.*,/, ''));
          buffer = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
          }
        }
        thumbnailBase64 = el.commentator_thumbnail;
        let commentBuffer = new Uint8Array();
        if (thumbnailBase64 !== null) {
          const bin = atob(thumbnailBase64.replace(/^.*,/, ''));
          commentBuffer = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) {
            commentBuffer[i] = bin.charCodeAt(i);
          }
        }

        article = new ArticleInfo(
          el.id,
          el.contributor_name,
          el.body,
          buffer,
          el.created_datetime,
          el.modified_datetime,
          el.commentator_name,
          commentBuffer,
          el.comment_body,
          el.comment_created_datetime,
        );
        articleArray.push(article);
      });

      resolve(articleArray);
    })
    .catch((err) => {
      console.log('articleリスト取得に失敗しました');
      reject();
    });
  });
};

const getPhotoList = () => {
  return new Promise<Result>(async (resolve, reject) => {
    const result = new Result();
    const photoMultiArray: PhotoInfo[][] = [];
    const projectTitleMap: Map<number, string> = new Map<number, string>();
    let photoArray: PhotoInfo[] = [];
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };

    await axios.get('https://express.management/photographs', {
        headers: header,
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('photoリスト取得に失敗しました');
        reject();
        return;
      }
      console.log('photoリスト取得');
      const resArray = res.data.photoArray;
      let photo: PhotoInfo;
      let index = 0;
      resArray.forEach((el: any) => {
        photo = new PhotoInfo(
          el.id,
          el.sub_title,
          el.title,
          el.mimetype,
          el.fileName,
          el.size,
          el.data,
          el.created_datetime,
          el.modified_datetime,
        );
        const map = new Map<number, string>();
        projectTitleMap.set(photo.id, photo.title);
        photoArray.push(photo);
        if (index === 1) {
          photoMultiArray.push(photoArray);
          photoArray = [];
          index = 0;
          return;
        }
        index++;
      });

      if (resArray.length % 2 === 1) {
        photoMultiArray.push(photoArray);
      }

      result.photoMultiArray = photoMultiArray;
      result.projectTitleMap = projectTitleMap;
      resolve(result);
    })
    .catch((err) => {
      console.log('photoリスト取得に失敗しました');
      reject();
    });
  });
};

export default new Vuex.Store({
  state: {
    userName: 'wataru',
    isLogin: false,
    isAnonymous: false,
    isVip: false,
    isAdmin: false,
    uid: '',
    idToken: '',
    email: '',
    displayName: '',
    state: '',
    thumbnail: new ArrayBuffer(0),
    currentViewIndex: 0,
    photoMultiArray: new Array<PhotoInfo[]>(),
    projectTitleMap: new Map<number, string>(),
    articleArray: new Array<ArticleInfo>(),
    distinctArticleMap: new Map<number, Article>(),
    currentArticleId: 0,
    isVideoDisplay: false,
    isVideoPlaying: false,
    authHeader: {},
  },
  mutations: {
    setUser(state, payload) {
      state.userName = payload.name;
    },

    setDisplayName(state, payload) {
      state.displayName = payload.displayName;
    },

    setUserInfo(state, payload) {
      state.isLogin = payload.isLogin;
      state.isAnonymous = payload.isAnonymous;
      state.thumbnail = payload.thumbnail;
      state.state = payload.state;
      state.isVip = payload.isVip;
      state.isAdmin = payload.isAdmin;
    },

    setViewIndex(state, payload) {
      state.currentViewIndex = payload.index;
    },

    setPhotoMutiArray(state, payload) {
      state.photoMultiArray = payload.photoMultiArray;
      state.projectTitleMap = payload.projectTitleMap;
    },

    setInitVideoFlag(state, payload) {
      state.isVideoDisplay = false;
      state.isVideoPlaying = false;
    },

    setIsDisplay(state, payload) {
      state.isVideoDisplay = payload.isVideoDisplay;
    },

    setIsPlaying(state, payload) {
      state.isVideoPlaying = payload.isVideoPlaying;
    },

    setHeader(state, payload) {
      state.authHeader = payload.authHeader;
      state.displayName = payload.displayName;
      state.idToken = payload.idToken;
      state.uid = payload.uid;
      state.email = payload.email;
    },
    setArticleArray(state, payload) {
      if (state.currentArticleId === 0 || !payload.additionalFlag) {
        state.distinctArticleMap = payload.distinctArticleMap;
      } else {
        Array.from(payload.distinctArticleMap as Map<number, ArticleInfo>).map(([key, value]) => {
          state.distinctArticleMap.set(key, value);
        });
      }

      if (!payload.additionalFlag) {
        state.articleArray = payload.articleArray;
      } else {
        state.articleArray = state.articleArray.concat(payload.articleArray);
      }

      state.currentArticleId = payload.currentArticleId;
    },
  },
  actions: {
    async test({ commit, state, rootState }) {
      await axios.get('https://flask.site:443/user',
      // , {
      //     httpsAgent: new https.Agent({
      //       // keepAlive: true,
      //     }),
      //   }
      )
      .then((res) => {
        commit('setUser', {
          name: res.data.name,
        });
      });
    },

    async getPhotos({ commit, state, rootState }) {
      await getPhotoList().then((result) => {
        this.commit('setPhotoMutiArray', {
          photoMultiArray: result.photoMultiArray,
          projectTitleMap: result.projectTitleMap,
        });
      }).catch((err) => {
        alert('err');
      });
    },

    async getArticles({ commit, state, rootState }, { additional }) {
      await getArticleList(state.currentArticleId, additional).then((articleList) => {
        if (articleList.length === 0) {
          alert('これ以上記事はありません');
          return;
        }
        const distinctArticleMaps = getDistinctArticleMap(articleList);
        const maxIdArticle = articleList.reduce((a, b) => {
          return a.id > b.id ? b : a;
        });
        this.commit('setArticleArray', {
          additionalFlag: additional,
          currentArticleId: maxIdArticle.id,
          articleArray: articleList,
          distinctArticleMap: distinctArticleMaps,
        });
      }).catch((err) => {
        alert('err');
      });
    },

    async login({ commit, state, rootState }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      console.log(provider);
      await firebase.auth().signInWithPopup(provider)
      .then(async (result) => {
        console.log('google認証');
        // DBにアカウント登録
        await this.dispatch('getHeader');
        const body = {
          name: state.displayName,
        };
        await axios.post('https://django.service:443/api/service/account', body, {
          headers: state.authHeader,
        })
        .then((res) => {
          if (!res.data.result) {
            console.log('サーバのログイン処理に失敗しました');
          }
          console.log('ログインしました');
        })
        .catch((err) => {
          console.log('サーバのログイン処理に失敗しました');
        });
      }).catch((error) => {
        console.log(error);
        console.log('ログインに失敗しました');
      });
    },

    async logout({ commit, state, rootState }) {
      await firebase.auth().signOut()
      .then((result) => {
        console.log('ログアウト');
      })
      .catch((err) => {
        console.log('ログアウトに失敗しました');
      });
    },

    checkLoginStatus({ commit, state, rootState }) {
      firebase.auth().onAuthStateChanged( async (user) => {
        if (user) {
          this.dispatch('getPhotos');
          this.dispatch('getArticles', {
            additional: false,
          });
          await this.dispatch('getHeader');

          if (user.email != null && user.email.length > 0) {
            console.log('google認証済み');
            const body = {};
            await axios.put('https://django.service:443/api/service/account', body, {
              headers: state.authHeader,
            })
            .then((res) => {
              if (!res.data.result) {
                console.log('サーバのログイン処理に失敗しました');
                return;
              }
              console.log('ログイン');
              const thumbnailBase64 = res.data.thumbnail;
              let buffer = null;
              if (thumbnailBase64 !== null) {
                const bin = atob(thumbnailBase64.replace(/^.*,/, ''));
                buffer = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) {
                    buffer[i] = bin.charCodeAt(i);
                }
              }

              console.log(res.data);

              this.dispatch('setUserInfo', {
                isLoginAuth: true,
                isAnonymousAuth: false,
                thumbnailData: buffer,
                region: res.data.state,
                isVipAccount: res.data.isVip,
                isAdminAccount: res.data.isAdmin,
              });
            })
            .catch((err) => {
              console.log('サーバのログイン処理に失敗しました');
            });
            return;
          }
        } else {
          console.log('匿名認証');
          firebase.auth().signInAnonymously().catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(error.message);
          });
        }
        console.log('匿名認証済み');
        this.dispatch('setUserInfo', {
          isLoginAuth: false,
          isAnonymousAuth: true,
          thumbnailData: null,
          region: '',
          isVipAccount: false,
          isAdminAccount: false,
        });
      });
    },

    async setUserInfo({ commit, state, rootState },
                      { isLoginAuth, isAnonymousAuth, thumbnailData, region, isVipAccount, isAdminAccount } ) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser == null) {
        return;
      }
      const token = await currentUser.getIdToken(true).catch((err) => {
        console.log(err);
      });
      this.commit('setUserInfo', {
        isLogin: isLoginAuth,
        isAnonymous: isAnonymousAuth,
        thumbnail: thumbnailData,
        state: region,
        isVip: isVipAccount,
        isAdmin: isAdminAccount,
      });
    },

    async getHeader({ commit, state, rootState }) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser == null) {
        return;
      }
      const token = await currentUser.getIdToken(true).catch((err) => {
        console.log(err);
      });
      const header = {
        Authorization: `Bearer ${token}`,
      };

      this.commit('setHeader', {
        authHeader: header,
        displayName: currentUser.displayName,
        idToken: token,
        uid: currentUser.uid,
        email: currentUser.email,
      });
    },
  },
  getters: {
    getName: (state, getters) => {
      return state.userName;
    },
    isLogin: (state, getters) => {
      return state.isLogin;
    },
    getPhotos: (state, getters) => {
      return state.photoMultiArray;
    },
    getProjectTitleMap: (state, getter) => {
      return state.projectTitleMap;
    },
    isVideoDisplay: (state, getters) => {
      return state.isVideoDisplay;
    },
    isVideoPlaying: (state, getters) => {
      return state.isVideoPlaying;
    },
  },
});
