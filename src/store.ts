import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase/app';
// tslint:disable-next-line:no-var-requires
const fs = require('fs');
// tslint:disable-next-line:no-var-requires
const https = require('https');

Vue.use(Vuex);

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
  },
});
