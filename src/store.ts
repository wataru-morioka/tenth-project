import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase/app';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');
// tslint:disable-next-line:no-var-requires
const https = require('https');

Vue.use(Vuex);

export class PhotoInfo {
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

class Result {
  public photoMultiArray: PhotoInfo[][];
  public projectTitleArray: string[];

  constructor() {
    this.photoMultiArray = [];
    this.projectTitleArray = [];
  }
}

const getPhotoList = () => {
  return new Promise<Result>(async (resolve, reject) => {
    const result = new Result();
    const photoMultiArray: PhotoInfo[][] = [];
    const projectTitleArray: string[] = [];
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
        projectTitleArray.push(photo.title);
        photoArray.push(photo);
        if (index === 1) {
          photoMultiArray.push(photoArray);
          photoArray = [];
          index = 0;
          return;
        }
        index++;
      });
      result.photoMultiArray = photoMultiArray;
      result.projectTitleArray = projectTitleArray;
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
    currentViewIndex: 0,
    photoMultiArray: [],
    projectTitleArray: [],
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
      state.uid = payload.uid;
      state.idToken = payload.idToken;
      state.email = payload.email;
    },

    changeStatus(state, payload) {
      state.isLogin = payload.status;
    },

    setViewIndex(state, payload) {
      state.currentViewIndex = payload.index;
    },

    setPhotoMutiArray(state, payload) {
      state.photoMultiArray = payload.photoMultiArray;
      state.projectTitleArray = payload.projectTitleArray;
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

    async post_test({ commit, state, rootState }) {
      const body = {
        idToken: this.state.idToken,
      };
      await axios.get('https://django.service/api/service/user')
      .then((res) => {
        commit('setDisplayName', {
          displayName: res.data.name,
        });
      });
    },

    async getPhotos({ commit, state, rootState }) {
      getPhotoList().then((result) => {
        this.commit('setPhotoMutiArray', {
          photoMultiArray: result.photoMultiArray,
          projectTitleArray: result.projectTitleArray,
        });
      }).catch((err) => {
        alert('err');
      });
    },

    async login({ commit, state, rootState }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider)
      .then(async (result) => {
        console.log('google認証');
        // DBにアカウント登録
        const currentUser = firebase.auth().currentUser!;
        const token = await currentUser.getIdToken(true);
        const header = {
          Authorization: `Bearer ${token}`,
        };
        const body = {
          name: currentUser.displayName,
        };

        await axios.post('https://django.service:443/api/service/account', body, {
          headers: header,
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

          if (user.email != null && user.email.length > 0) {
            console.log('google認証済み');
            // TODO ログインカウントインクリメント
            const token = await user.getIdToken(true);
            const header = {
              Authorization: `Bearer ${token}`,
            };
            const body = {};
            await axios.put('https://django.service:443/api/service/account', body, {
              headers: header,
            })
            .then((res) => {
              if (!res.data.result) {
                console.log('サーバのログイン処理に失敗しました');
              }
              console.log('ログイン');
            })
            .catch((err) => {
              console.log('サーバのログイン処理に失敗しました');
            });

            this.dispatch('setUserInfo', {
              isLoginAuth: true,
              isAnonymousAuth: false,
            });
            return;
          }
        } else {
          console.log('匿名認証済み');
          firebase.auth().signInAnonymously().catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(error.message);
          });
        }
        this.dispatch('setUserInfo', {
          isLoginAuth: false,
          isAnonymousAuth: true,
        });
      });
    },

    async setUserInfo({ commit, state, rootState }, { isLoginAuth, isAnonymousAuth } ) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser == null) {
        return;
      }

      const token = await currentUser.getIdToken(true);
      this.commit('setUserInfo', {
        isLogin: isLoginAuth,
        isAnonymous: isAnonymousAuth,
        uid: currentUser.uid,
        idToken: token,
        email: currentUser.email,
        displayName: currentUser.displayName,
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
    getProjectTitles: (state, getter) => {
      return state.projectTitleArray;
    }
  },
});
