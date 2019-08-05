import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// import firebase from 'firebase/app';
import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/messaging';

const ua = window.navigator.userAgent;

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyBb1EQB5F7Q7O9n8BH1Fy929XhH7tRy6OM',
  authDomain: 'seventhproject-248123.firebaseapp.com',
  databaseURL: 'https://seventhproject-248123.firebaseio.com',
  projectId: 'seventhproject-248123',
  storageBucket: 'seventhproject-248123.appspot.com',
  messagingSenderId: '663686156877',
};

firebase.initializeApp(firebaseConfig);

if (ua.indexOf('Safari') !== -1) {
  const messaging = firebase.messaging();
  messaging
  .usePublicVapidKey('BH21Cxu2dV1d1gHd0nU-JzziDnfg-gtUIQEoSJKN6zsOcjThn7IVuVdsAtaVvF7ETjtW4SFvlvWZubj6-nHzrVg');
  // 通知の受信許可
  messaging.requestPermission().then(async () => {
    console.log('Notification permission granted.');
    // トークン取得
    await messaging.getToken().then((token) => {
      console.log('トークン取得：' + token);
      if (token) {
        // 本来ここでサーバにトークン送る処理
        //sendTokenToServer(currentToken);
    } else {
        // トークン無い場合
        alert('通知の許可をしていません。「通知を許可する」を押してください。');
    }
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
