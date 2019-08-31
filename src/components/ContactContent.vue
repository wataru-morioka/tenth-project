<template lang='pug'>
  div.content
    div(class="ui two column divided grid")
      div.row
        div.column(style='transition-delay: 2s;')
          form#ask-form(class="ui form")
            h5(class="ui dividing header") お問い合わせ
            div.field.thin
              label Name
              div(class="four fields")
                div.field
                  input(type="text" name="shipping[name]" placeholder="Last Name")
                div.field
                  input(type="text" name="shipping[name]" placeholder="First Name")
            div.thin(class="four fields")
              div.field
                label Type
                select(class="ui fluid dropdown")
                  option(value="private") private
                  option(value="companies") companies
            div.thin(class="four fields")
              div.field
                label State
                input(type="text" placeholder="State")
            div(class="two fields")
              div.field
                label Email
                input(type="text" placeholder="Email") 
            div.thin(class="three fields")
              div.field
                label Phone
                input(type="text" placeholder="Phone")
            div.field
              label Message
              textarea(rows="17")
            button(class="ui inverted orange basic button") Submit
        div.column(style='transition-delay: 2.2s;')
          div#office-info
            h5 Our Office
            table
              tr
                td.title
                  p name
                td.value
                  p (株) Example Corporation
              tr
                td.title
                  p founded
                td.value
                  p Since 2019/08/31
              tr
                td.title
                  p ceo
                td.value
                  p Wataru Morioka
              tr
                td.title
                  p phone
                td.value
                  p 03-0000-0000
              tr
                td.title
                  p e-mail
                td.value
                  p example@gmail.com
              tr
                td.title
                  p address
                td.value
                  p 
                    span 〒111-1111
                    br
                    span 東京都渋谷区恵比寿新天地 暫定ビルディング 15F
            br
            div.icon-wrap
              img.icon(src='../assets/icn_fb.png')
              img.icon(src='../assets/icn_insta.png')
              img.icon(src='../assets/icn_tw.png')
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';

const fadein = () => {
  const offset = - 60;
  // const scrollTop = $(window).scrollTop()!;
  // const scrollBtm = scrollTop + $(window).height()!;
  const effectPos = $(window).height()! - offset;
  $('.column').each( function() {
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
};

@Component
export default class ContactContent extends Vue {
  private mounted() {
    fadein();
    $('.content').scroll(() => {
      fadein();
    });
  }

  private created() {
    setTimeout(() => {
      $('.content').css('top', '60px');
    }, 1);
  }
}
</script>

<style scoped lang='scss'>
.content {
  position: fixed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: auto;
  // width: 100%;
  top: 60px; right: 0; bottom: 0; left: 0;
}

::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
}

.grid {
  width: 100%;
}

.column {
  min-width: 50%;
  opacity: 0;
  transform: translate(0px, 60px) translate3d(0, 0, 0);
  transition: 1s;
  -ms-filter: blur(30px);
  filter: blur(30px);
}

h5 {
  text-align: left;
  color: #ffffff !important;
  font-size: 12px !important;
}

label {
  text-align: left;
  color: #ffffff77 !important;
  font-size: 11px !important;
}
  
input, select {
  height: 30px !important; 
}

.button {
  display: block;
  text-align: left;
}

#office-info {
  display: inline-block;

  tr {
    height: 30px;
    td {
      text-align: left;
      font-size: 12px;
    }
  }

  .value {
    padding-left: 50px;
    color: #ffffff;
  }

  .icon-wrap {
    text-align: left;
    .icon {
      cursor: pointer;
      height: 15px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}

#ask-form {
  width: 80%;
  margin: auto;
}

@media screen and (max-width: 768px){
  .content {
    justify-content: flex-start;
  }

  .column {
    text-align: center;
    min-width: 100%;
    padding-left: 0px;
  }

  table {
    margin: auto;
  }

  #ask-form {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 50px;

    .thin {
      width: 50%;
    }

    input, select {
      font-size: 12px;
      height: 25px !important;
    }

    .button, textarea {
      font-size: 12px;
    }

    h5 {
      font-size: 10px !important;
    }

    label {
      font-size: 8px !important;
    }
  }

  #office-info {
    margin-bottom: 50px;
    tr td {
      font-size: 9px;
    }
  }
}
</style>
