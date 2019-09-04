<template lang='pug'>
  div.content
    div#account-list-wrap
      h5 Account
      table(class='ui selectable inverted table')
        thead
          tr
            th.edit edit
            th.webrtc webrtc
            th.admin admin
            th.account account
            th.loginCount loginCount
            th.latestLogin latestLogin
            th.name name
            th.state state
            th.createdDatetime created
            th.modifiedDatetime modified
            th.delete delete
        tbody#account-list
          tr(v-for='account in accountList', :key='account.uid')
            td.edit
              button(type=button) edit
            td.webrtc {{ account.webrtcFlag }}
            td.admin {{ account.adminFlag }}
            td.account {{ account.account }}
            td.loginCount {{ account.loginCount }}
            td.latestLogin {{ account.latestLogin }}
            td.name {{ account.name }}
            td.state {{ account.state }}
            td.createdDatetime {{ account.createdDatetime }}
            td.modifiedDatetime {{ account.modifiedDatetime }}
            td.delete {{ account.deleteFlag }}

</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import jQuery from 'jQuery';
import axios from 'axios';
import firebase from 'firebase/app';

export class AccountInfo {
    private uid: string;
    private deleteFlag: boolean;
    private webrtcFlag: boolean;
    private adminFlag: boolean;
    private account: string;
    private name: string;
    private state: string;
    private loginCount: number;
    private latestLogin: string;
    private createdDatetime: string;
    private modifiedDatetime: string;

    constructor(uid: string, deleteFlag: boolean, webrtcFlag: boolean, adminFlag: boolean, account: string,
                name: string, state: string, loginCount: number, latestLogin: string,
                createdDatetime: string, modifiedDatetime: string) {
      this.uid = uid;
      this.deleteFlag = deleteFlag;
      this.webrtcFlag = webrtcFlag;
      this.adminFlag = adminFlag;
      this.account = account;
      this.name = name;
      this.state = state;
      this.loginCount = loginCount;
      this.latestLogin = latestLogin;
      this.createdDatetime = createdDatetime;
      this.modifiedDatetime = modifiedDatetime;
    }
}

@Component
export default class ManagementAccount extends Vue {
  private accountList: AccountInfo[] = [];

  private beforeCreate() {
    (async () => {
      const currentUser = firebase.auth().currentUser!;
      const token = await currentUser.getIdToken(true);
      const header = {
        Authorization: `Bearer ${token}`,
      };

      await axios.get('https://django.service:443/api/service/account', {
        headers: header,
      })
      .then((res) => {
        if (!res.data.result) {
          console.log('accountリスト取得に失敗しました');
        }
        console.log('accountリスト取得');
        // console.log(res.data.list);
        const list = res.data.list;
        let account: AccountInfo;
        list.forEach((el: any) => {
          account = new AccountInfo(
            el.uid,
            el.delete_flag,
            el.webrtc_flag,
            el.admin_flag,
            el.account,
            el.name,
            el.state,
            el.login_count,
            el.latest_login,
            el.created_datetime,
            el.modified_datetime,
          );
          this.accountList.push(account);
        });

        console.log(this.accountList);

      })
      .catch((err) => {
        console.log('accountリスト取得に失敗しました');
      });
    })();
  }

  private mounted() {
    $('.horizontal-array, #footer-icon2').css({
      display: 'none',
    });
    $('#user-account').css({
      margin: '0 0 0em',
    });
  }
}
</script>

<style scoped lang='scss'>
.content {
  position: fixed;
  top: 54px; right: 0; bottom: 50px; left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
  align-items: center;
  margin: auto;
  animation-name: content-fadein;
  animation-duration: 2s;
}

// ::-webkit-scrollbar {
//   display: none;
//   -webkit-appearance: none;
// }

h5 {
  text-align: left;
}

#account-list-wrap {
  width: 90%;
  // height: 90%;
  display: fixed;
  bottom: 50px;

  th {
    color: #b14c2d !important;
    text-align: left;
    font-size: 13px;
  }
}

table {
  // height: 95%;
  height: auto;
}

thead, tbody {
  display: block;
}

#account-list {
  overflow-y: scroll;
  height: 77vh;
  -webkit-overflow-scrolling: touch;
  td {
    color: #ffffff;
    text-align: left;
    font-size: 13px;
  }
}

.edit {
  width: 10%;
}

.webrtc {
  width: 5%;
}

.admin {
  width: 5%;
}

.account {
  width: 15%;
}

.loginCount {
  width: 10%;
}

.latestLogin {
  width: 12%;
}

.name {
  width: 10%;
}

.state {
  width: 10%;
}

.createdDatetime {
  width: 12%;
}

.modifiedDatetime {
  width: 12%;
}

.delete {
  width: 5%;
}

@media screen and (max-width: 768px){
  .content {
    padding-top: 0px;

    #account-list-wrap {
      // width: 90%;
      height: 100%;
    }

    #account-list {
      height: 40vh;
    }

    th, td {
      font-size: 11px !important;
    }
  }
}

@keyframes content-fadein {
  from {
      opacity: 0;
      transform: translateY(40px);
  }
  to {
      // opacity: .2;
      transform: translateY(0);
  }
}
</style>