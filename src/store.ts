import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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

class Result {
  public photoMultiArray: PhotoInfo[][];
  public projectTitleMap: Map<number, string>;

  constructor() {
    this.photoMultiArray = [];
    this.projectTitleMap = new Map<number, string>();
  }
}

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
    uid: '',
    idToken: '',
    email: '',
    displayName: '',
    state: '',
    thumbnail: new ArrayBuffer(0),
    currentViewIndex: 0,
    photoMultiArray: new Array<PhotoInfo[]>(),
    projectTitleMap: new Map<number, string>(),
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
    },

    setViewIndex(state, payload) {
      state.currentViewIndex = payload.index;
    },

    setPhotoMutiArray(state, payload) {
      state.photoMultiArray = payload.photoMultiArray;
      // state.photoMultiArray = [];
      // state.photoMultiArray = state.photoMultiArray.concat(payload.photoMultiArray);
      state.projectTitleMap = payload.projectTitleMap;
      // state.projectTitleMap = new Map<number, string>();
      // Object.assign(state.projectTitleMap, payload.projectTitleMap);
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

    async login({ commit, state, rootState }) {
      console.log('test');
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
              const bin = atob(thumbnailBase64.replace(/^.*,/, ''));
              const buffer = new Uint8Array(bin.length);
              for (let i = 0; i < bin.length; i++) {
                  buffer[i] = bin.charCodeAt(i);
              }

              this.dispatch('setUserInfo', {
                isLoginAuth: true,
                isAnonymousAuth: false,
                thumbnailData: buffer,
                region: res.data.state,
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
          state: '',
        });
      });
    },

    async setUserInfo({ commit, state, rootState }, { isLoginAuth, isAnonymousAuth, thumbnailData, region } ) {
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
        state: region
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
