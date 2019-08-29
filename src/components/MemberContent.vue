<template lang='pug'>
  div.content
    div(class="ui two column divided grid")
      div.row#mimber-1
        div.column.left(style='transition-delay: 2s;')
          img(src='../assets/member.jpg')
        div.column.right(style='transition-delay: 3s;')
          h5 Director
          table.profile
            tr
              td.title
                p name
              td.value
                p Watau Morioka
            tr
              td.title
                p skill
              td.value
                p direction photo 
            tr
              td.title
                p hobby
              td.value
                p 釣り  音楽鑑賞  
            tr
              td.title
                p phone
              td.value
                p 090-0000-0000
            tr
              td.title
                p mail
              td.value
                p example@gmail.com
          br
          img.icon(src='../assets/icn_fb.png')
          img.icon(src='../assets/icn_insta.png')
          img.icon(src='../assets/icn_tw.png')
      div.row#mimber-2
        div.column.left(style='transition-delay: 2.2s;')
          img(src='../assets/member.jpg')
        div.column.right(style='transition-delay: 3s;')
          h5 Video Photographer
          table.profile
            tr
              td.title
                p name
              td.value
                p Watau Morioka
            tr
              td.title
                p skill
              td.value
                p video photo edit
            tr
              td.title
                p hobby
              td.value
                p ライブ  飲み歩き  映画鑑賞  
            tr
              td.title
                p phone
              td.value
                p 090-0000-0000
            tr
              td.title
                p mail
              td.value
                p example@gmail.com
          br
          img.icon(src='../assets/icn_fb.png')
          img.icon(src='../assets/icn_insta.png')
          img.icon(src='../assets/icn_tw.png')
      div.row#mimber-3
        div.column.left(style='transition-delay: 2.4s;')
          img(src='../assets/member.jpg')
        div.column.right(style='transition-delay: 3s;')
          h5 Editor
          table.profile
            tr
              td.title
                p name
              td.value
                p Watau Morioka
            tr
              td.title
                p skill
              td.value
                p edit video 
            tr
              td.title
                p hobby
              td.value
                p 旅行  フットサル  読書  
            tr
              td.title
                p phone
              td.value
                p 090-0000-0000
            tr
              td.title
                p mail
              td.value
                p example@gmail.com
          br
          img.icon(src='../assets/icn_fb.png')
          img.icon(src='../assets/icn_insta.png')
          img.icon(src='../assets/icn_tw.png')
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import jQuery from 'jQuery';

const fadein = () => {
  const offset = 100;
  const scrollTop = $(window).scrollTop();
  const scrollBtm = scrollTop + $(window).height();
  const effectPos = scrollBtm - offset;
  $('.column').each( function() {
    const thisPos = $(this).offset().top;
    if ( effectPos > thisPos ) {
      $(this).css({
          opacity: 1,
          transform: 'translate(0px, 0px)',
      });
    } else {
      $(this).css({
          opacity: 0,
          'transition-delay': '0s',
      });
    }
  });
};

@Component
export default class MemberContent extends Vue {
  private mounted() {
    fadein();
    $('.content').scroll(() => {
      fadein();
    });
  }
}
</script>

<style scoped lang='scss'>
.content {
  position: fixed;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;;
  height: auto;
  top: 80px; right: 0; bottom: 0; left: 0;
  transition: 1s;
}

.grid {
  width: auto;
}

.row {
  margin-top: 30px;
  margin-bottom: 30px;

  .left {
    text-align: right;
    opacity: 0;
    transform: translate(5px, 50px);
    transition: 2s;
  }

  .right {
    text-align: left;
    opacity: 0;
    transform: translate(5px, 50px);
    transition: 2s;
  }
}

#mimber-1 {
  margin-right: 300px;
}

#mimber-3 {
  margin-left: 300px;
}

.icon {
  cursor: pointer;
  height: 15px;
  margin-left: 5px;
  margin-right: 5px;
}

.column {
  min-width: 50%;
}

.profile tr {
  text-align: left;
  height: 20px;

  .title {
    width: 50px;
  }

  .value {
    // font-size: 13px;
    padding-left: 50px;
    color: #ffffff;
  }
}


@media screen and (max-width: 768px){
  #mimber-1 {
    margin-right: auto;
  }

  #mimber-3 {
    margin-left: auto;
  }

  .column {
    min-width: 100%;
  }

  .row {
    table {
      margin: auto;
    }
    .left {
      text-align: center;
    }
    .right {
      text-align: center;
    }
  }
}
</style>
