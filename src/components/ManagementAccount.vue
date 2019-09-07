<template lang='pug'>
  div.content
    div#account-list-wrap
      h5 Account
      div(class='ui search')
        div(class='ui icon input', :class='{ loading: isLoading }')
          input(class='prompt' type='text' placeholder='account or name...', maxlength=20, v-model='searchString')
          i(class='circular search link icon', @click='search')
      div.subject
        p 全 {{ totalCount }} 件中 {{ accountList.length }} 件
        i(class='redo icon', @click='redo')
      table(class='ui selectable inverted table')
        thead
          tr
            th.edit edit
            th.webrtc webrtc
            th.admin admin
            th.account account
            th.loginCount.pointer(@click='sort(0)') loginCount
              i(class='sort icon', v-if='!sortedLoginCount')
              i(class='sort icon', v-if='sortedLoginCount', :class='{ down: isDescLoginCount, up: !isDescLoginCount }')
            th.latestLogin.pointer(@click='sort(1)') latestLogin
              i(class='sort icon', v-if='!sortedLatestLogin')
              i(class='sort icon', v-if='sortedLatestLogin', :class='{ down: isDescLatestLogin, up: !isDescLatestLogin }')
            th.name name
            th.state state
            th.createdDatetime created
              i.created-sort(class='sort icon down', v-if='!sortedCreated')
            th.modifiedDatetime.pointer(@click='sort(2)') modified
              i(class='sort icon', v-if='!sortedModified')
              i(class='sort icon', v-if='sortedModified', :class='{ down: isDescModified, up: !isDescModified }')
            th.delete delete
        tbody
          tr(v-for='account in accountList', :key='account.uid')
            td.edit
              input(type="text" name="public", hidden, :value='account.uid')
              button(type=button class='ui inverted primary button', @click='edit($event)') edit
              button(type=button class='ui inverted secondary button', @click='confirm($event)', :disabled='isLoading') confirm
            td.webrtc
              div(class="ui toggle checkbox")
                input(type="checkbox" name="public", :checked='account.webrtcFlag', disabled)
                label 
            td.admin
              div(class="ui toggle checkbox")
                input(type="checkbox" name="public", :checked='account.adminFlag', disabled)
                label 
            td.account {{ account.account }}
            td.loginCount {{ account.loginCount }}
            td.latestLogin {{ account.latestLogin }}
            td.name {{ account.name }}
            td.state {{ account.state }}
            td.createdDatetime {{ account.createdDatetime }}
            td.modifiedDatetime {{ account.modifiedDatetime }}
            td.delete
              div(class="ui toggle checkbox")
                input(type="checkbox" name="public", :checked='account.deleteFlag', disabled)
                label 
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import jQuery from 'jQuery';
import axios from 'axios';
import firebase from 'firebase/app';

enum OrderEnum {
  LoginCount = 0,
  LatestLogin,
  Modified,
}

class AccountInfo {
  public uid: string;
  public deleteFlag: boolean;
  public webrtcFlag: boolean;
  public adminFlag: boolean;
  public account: string;
  public name: string;
  public state: string;
  public loginCount: number;
  public latestLogin: string;
  public createdDatetime: string;
  public modifiedDatetime: string;

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

class Result {
  public accountList: AccountInfo[];
  public totalCount: number;

  constructor() {
    this.accountList = [];
    this.totalCount = 0;
  }
}

const getAccountList = (searchString: string = '', orderBy: number = -1, orderType: boolean = true) => {
  return new Promise<Result>(async (resolve, reject) => {
    const result = new Result();
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get('https://django.service:443/api/service/account', {
        headers: header,
        params: {
          search: searchString,
          order: orderBy,
          type: orderType,
        },
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('accountリスト取得に失敗しました');
        reject();
        return;
      }
      console.log('accountリスト取得');
      result.totalCount = res.data.totalCount;
      const list = res.data.accountList;
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
        result.accountList.push(account);
      });
      resolve(result);
    })
    .catch((err) => {
      console.log('accountリスト取得に失敗しました');
      reject();
    });
  });
};

@Component
export default class ManagementAccount extends Vue {
  private accountList: AccountInfo[] = [];
  private totalCount: number = 0;
  private searchString: string = '';
  private isLoading: boolean = false;
  private isDescLoginCount: boolean = false;
  private isDescLatestLogin: boolean = false;
  private isDescModified: boolean = false;
  private sortedLoginCount: boolean = false;
  private sortedLatestLogin: boolean = false;
  private sortedModified: boolean = false;
  private sortedCreated: boolean = false;

  private async beforeCreate() {
    await getAccountList(this.searchString).then((result) => {
      this.accountList = result.accountList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // private mounted() {
  // }

  private resetFlag(): void {
    this.isDescLoginCount = false;
    this.isDescLatestLogin = false;
    this.isDescModified = false;
    this.sortedLoginCount = false;
    this.sortedLatestLogin = false;
    this.sortedModified = false;
    this.sortedCreated = false;
  }

  private async search(): Promise<void> {
    this.isLoading = true;
    this.resetFlag();
    await getAccountList(this.searchString).then((result) => {
      this.accountList = result.accountList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
    this.isLoading = false;
  }

  private async redo(): Promise<void> {
    this.isLoading = true;
    this.resetFlag();
    this.searchString = '';
    await getAccountList().then((result) => {
      this.accountList = result.accountList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
    this.isLoading = false;
  }

  private async sort(order: number): Promise<void> {
    this.isLoading = true;
    let orderType = false;
    this.resetFlag();
    this.sortedCreated = true;
    switch (order) {
      case OrderEnum.LoginCount:
        this.sortedLoginCount = true;
        this.isDescLoginCount = !this.isDescLoginCount;
        orderType = this.isDescLoginCount;
        break;
      case OrderEnum.LatestLogin:
        this.sortedLatestLogin = true;
        this.isDescLatestLogin = !this.isDescLatestLogin;
        orderType = this.isDescLatestLogin;
        break;
      case OrderEnum.Modified:
        this.sortedModified = true;
        this.isDescModified = !this.isDescModified;
        orderType = this.isDescModified;
        break;
      default:
        break;
    }

    await getAccountList(this.searchString, order, orderType).then((result) => {
      this.accountList = result.accountList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
    this.isLoading = false;
  }

  private edit(event: any): void {
    const target = event.currentTarget;
    const parent = $(target).closest('tr');
    const next = $(target).next('button');

    if ($(target).hasClass('secondary')) {
      $(target).removeClass('secondary');
      $(target).addClass('primary');
      $(next).removeClass('orange');
      $(next).addClass('secondary');
      $(target).text('edit');
      $(parent).find('input').prop('disabled', true);
    } else {
      $(target).removeClass('primary');
      $(target).addClass('secondary');
      $(next).removeClass('secondary');
      $(next).addClass('orange');
      $(target).text('cancel');
      $(parent).find('input').prop('disabled', false);
    }
  }

  private async confirm(event: any): Promise<void> {
    const target = event.currentTarget;
    const parent = $(target).closest('tr');
    const prev = $(target).prev('button');

    if ($(target).hasClass('secondary')) {
      alert('編集中ではありません');
      return;
    }
    // ローディング
    $(target).addClass('loading');
    this.isLoading = true;

    // update
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      uid: $(parent).children('.edit').find('input').val(),
      webrtc: $(parent).children('.webrtc').find('input').prop('checked'),
      admin: $(parent).children('.admin').find('input').prop('checked'),
      delete: $(parent).children('.delete').find('input').prop('checked'),
    };

    console.log(body);

    await axios.put('https://django.service:443/api/service/account', body, {
        headers: header,
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('account更新に失敗しました');
        return;
      }
      console.log('account更新');
    })
    .catch((err) => {
      console.log('account更新に失敗しました');
    });

    this.isLoading = false;
    $(target).removeClass('loading');
    $(target).removeClass('orange');
    $(target).addClass('secondary');
    $(prev).removeClass('secondary');
    $(prev).addClass('primary');
    $(prev).text('edit');
    $(parent).find('input').prop('disabled', true);
  }
}
</script>

<style scoped lang='scss'>
.content {
  position: fixed;
  top: 54px; right: 0; bottom: 80px; left: 0;
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

.pointer:hover {
  cursor: pointer;
}

.ui.search {
  .prompt {
    background: rgba($color: #000000, $alpha: 0) !important;
    color: #ffffff !important;
  }

  i {
    color: #ffffff;
    z-index: 10;
  }

  i:hover {
    cursor: pointer !important;
  }
}

.subject {
  display: flex;
   -webkit-justify-content: space-between;
  justify-content: space-between;

  p {
    margin-bottom: 3px;
  }

  .redo:hover {
    cursor: pointer;
  }
}

#account-list-wrap {
  width: 90%;
  bottom: 50px;

  h5 {
    // text-align: left;
    font-size: 10px;
    color: #ffffff;
  }

  table::after {
    content: '表示最大件数 100件';
    display: flex;
    justify-content: flex-end;
    font-size: 11px;
    color: #b14c2d;
  }

  table {
    height: auto;
    width: 100%;
    margin: 0em 0;

    thead, tbody {
      display: block;
    }

    th {
      color: #b14c2d !important;
      text-align: left;
      font-size: 13px;
      padding: 3px;

      .sort {
        color: #ffffff;
      }

      .created-sort {
        color: #ffffff78;
      }
    }

    tbody {
      overflow-y: scroll;
      height: 75vh;
      -webkit-overflow-scrolling: touch;

      tr {
        animation-name: content-fadein;
        animation-duration: 2s;

        button {
          font-size: 10px;
        }
      }

      td {
        color: #ffffff;
        text-align: left;
        font-size: 12px;
        word-break : break-all;
      }
    }
  }

  p {
    font-size: 11px;
    text-align: left;
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

      tbody {
        height: 40vh;
      }

      th, td {
        font-size: 11px !important;
      }

      p {
        font-size: 8px;
      }
    }
  }
}

@keyframes content-fadein {
  from {
      opacity: 0;
      transform: translateY(40px);
      -ms-filter: blur(20px);
       filter: blur(20px);
  }
  to {
      transform: translateY(0);
      -ms-filter: blur(0px);
       filter: blur(0px);
  }
}
</style>