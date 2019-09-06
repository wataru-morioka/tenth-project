<template lang='pug'>
  div.content
    div#contact-list-wrap
      h5 contact
      div(class='ui search')
        div(class='ui icon input', :class='{ loading: isLoading }')
          input(class='prompt' type='text' placeholder='fullTextSearch...', maxlength=20, v-model='searchString')
          i(class='circular search link icon', @click='search')
      div.subject
        p 全 {{ totalCount }} 件中 {{ contactList.length }} 件
        i(class='redo icon', @click='redo')
      table(class='ui selectable inverted table')
        thead
          tr
            i.accordion-icon.accordion-head(class='angle down icon')
            th.created.pointer(@click='sort') created
              i(class='sort icon', :class='{ down: isDescCreated, up: !isDescCreated }')
            th.account account
            th.name name
            th.organization org
            th.state state
            th.email email
            th.phone phone
            th.message message
        tbody
          div.row-wrap(v-for='contact in contactList', :key='contact.id')
            //- i.accordion-icon.accordion-body(class='angle down icon')
            tr.overview(@click='showDetail($event)')
              i.accordion-icon.accordion-body(class='angle down icon')
              td.created  {{ contact.createdDatetime }}
                input(type="text" name="public", hidden, :value='contact.id')
              td.account {{ contact.account }}
              td.name {{ contact.name }}
              td.organization {{ contact.organization }}
              td.state {{ contact.state }}
              td.email {{ contact.email }}
              td.phone {{ contact.phone }}
              td.message {{ contact.message.slice(0, 50) + '.....' }}
            div.detail
              tr
                p message detail:
                td {{ contact.message }}
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import jQuery from 'jQuery';
import axios from 'axios';
import firebase from 'firebase/app';

class ContactInfo {
  public id: number;
  public createdDatetime: string;
  public account: string;
  public name: string;
  public organization: string;
  public state: string;
  public email: string;
  public phone: string;
  public message: string;

  constructor(id: number, createdDatetime: string, account: string, name: string, organization: string, state: string,
              email: string, phone: string, message: string) {
    this.id = id;
    this.createdDatetime = createdDatetime,
    this.account = account;
    this.name = name;
    this.organization = organization;
    this.state = state;
    this.email = email;
    this.phone = phone;
    this.message = message;
  }
}

class Result {
  public contactList: ContactInfo[];
  public totalCount: number;

  constructor() {
    this.contactList = [];
    this.totalCount = 0;
  }
}

const getContactList = (searchString: string = '', orderType: boolean = true) => {
  return new Promise<Result>(async (resolve, reject) => {
    const result = new Result();
    const currentUser = firebase.auth().currentUser!;
    const token = await currentUser.getIdToken(true);
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get('https://express.management/contact', {
        headers: header,
        params: {
          search: searchString,
          type: orderType,
        },
    })
    .then((res) => {
      if (!res.data.result) {
        console.log('contactリスト取得に失敗しました');
        reject();
        return;
      }
      console.log('contactリスト取得');
      result.totalCount = res.data.totalCount;
      const list = res.data.contactList;
      console.log(list);
      let contact: ContactInfo;
      list.forEach((el: any) => {
        contact = new ContactInfo(
          el.id,
          el.created_datetime,
          el.account,
          el.name,
          el.organization,
          el.state,
          el.email,
          el.phone,
          el.message,
        );
        result.contactList.push(contact);
      });
      resolve(result);
    })
    .catch((err) => {
      console.log('contactリスト取得に失敗しました');
      reject();
    });
  });
};

@Component
export default class ManagementContact extends Vue {
  private contactList: ContactInfo[] = [];
  private totalCount: number = 0;
  private searchString: string = '';
  private isLoading: boolean = false;
  private isDescCreated: boolean = true;

  private async beforeCreate() {
    await getContactList(this.searchString).then((result) => {
      this.contactList = result.contactList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  private mounted() {
    // ($('.ui.search') as any).search({
    //   onSearchQuery: (query: any) => {
    //     alert(query);
    //   },
    // });
  }

  private resetFlag(): void {
    this.isDescCreated = true;
  }

  private async search(): Promise<void> {
    this.isLoading = true;
    this.resetFlag();
    await getContactList(this.searchString).then((result) => {
      this.contactList = result.contactList;
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
    await getContactList().then((result) => {
      this.contactList = result.contactList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
    this.isLoading = false;
  }

  private async sort(order: number): Promise<void> {
    this.isLoading = true;
    this.isDescCreated = !this.isDescCreated;
    await getContactList(this.searchString, this.isDescCreated).then((result) => {
      this.contactList = result.contactList;
      this.totalCount = result.totalCount;
    })
    .catch((err) => {
      console.log(err);
    });
    this.isLoading = false;
  }

  private showDetail(event: any): void {
    const target = event.currentTarget;
    const parent = $(target).closest('.row-wrap');
    const icon = $(parent).find('.accordion-icon');
    const detail = $(parent).find('.detail');

    if (icon.hasClass('up')) {
      $(icon).removeClass('up');
      $(icon).addClass('down');
      $(detail).css({
        display: 'none',
     });
    } else {
      $(icon).removeClass('down');
      $(icon).addClass('up');
      $(detail).css({
        display: 'block',
      });
    }
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

#contact-list-wrap {
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

    .accordion-icon {
      vertical-align: middle;
      color: #ffffff;
    }

    .accordion-head {
       color: #ffffff78;
    }

    .detail {
      display: none;

      p {
        margin-left: 10px;
      }

      td {
        white-space: pre;
      }
    }

    .detail:hover {
      cursor: default;
    }

    th {
      color: #b14c2d !important;
      text-align: left;
      font-size: 13px;
      padding: 3px;

      .sort {
        color: #ffffff;
      }
    }

    tbody {
      overflow-y: scroll;
      height: 75vh;
      -webkit-overflow-scrolling: touch;

      tr.overview {
        animation-name: content-fadein;
        animation-duration: 2s;
      }

      tr.overview:hover {
        cursor: pointer;
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

.created {
  width: 10%;
}

.account {
  width: 10%;
}

.name {
  width: 5%;
}

.organization {
  width: 5%;
}

.state {
  width: 5%;
}

.email {
  width: 10%;
}

.phone {
  width: 10%;
}

.message {
  width: 70%;
}

@media screen and (max-width: 768px){
  .content {
    padding-top: 0px;

    #contact-list-wrap {
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