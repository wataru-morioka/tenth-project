(function(e){function t(t){for(var r,i,s=t[0],u=t[1],c=t[2],l=0,f=[];l<s.length;l++)i=s[l],a[i]&&f.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o=[];function i(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"680774ca"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=a[e]=[t,r]});t.push(n[2]=r);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(e),o=function(t){u.onerror=u.onload=null,clearTimeout(c);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var c=setTimeout(function(){o({type:"timeout",target:u})},12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var p=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},1:function(e,t){},2:function(e,t){},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(e,t,n){},c1d7:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("96cf");var r=n("3b8d"),a=(n("cadf"),n("551c"),n("f751"),n("097d"),n("2b0e")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},i=[],s=(n("5c0b"),n("2877")),u={},c=Object(s["a"])(u,o,i,!1,null,null,null),l=c.exports,p=n("8c4f"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js + TypeScript App"}})],1)},h=[],v=n("d225"),m=n("308d"),g=n("6bb5"),d=n("4e2b"),b=n("9ab4"),_=n("60a3"),w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("button",{on:{click:e.getName}},[e._v("取得します")]),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.$store.state.isLogin,expression:"!$store.state.isLogin"}],on:{click:e.login}},[e._v("ログイン")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.isLogin,expression:"$store.state.isLogin"}],on:{click:e.logout}},[e._v("ログアウト")]),n("br"),e.$store.state.isLogin?n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("management")]):e._e(),n("br"),e.$store.state.isLogin?n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("service")]):e._e(),n("br"),e.$store.state.isLogin?n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("rtc")]):e._e(),e.$store.state.isLogin?n("p",[e._v(e._s(e.$store.state.email))]):e._e(),e._m(0),n("h1",[e._v(e._s(e.msg))]),n("h2",[e._v("Essential Links")]),e._m(1),n("h2",[e._v("Ecosystem")]),e._m(2)])},k=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("For a guide and recipes on how to configure / customize this project,"),n("br"),e._v("check out the"),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("Twitter")])]),n("br"),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("Docs for This Template")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[e._v("vue-router")])]),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[e._v("vuex")])]),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[e._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[e._v("awesome-vue")])])])}],j=n("b0b4"),y=function(e){function t(){return Object(v["a"])(this,t),Object(m["a"])(this,Object(g["a"])(t).apply(this,arguments))}return Object(d["a"])(t,e),Object(j["a"])(t,[{key:"getName",value:function(){var e=this;this.$store.dispatch("post_test").then(function(){alert(e.$store.state.displayName)})}},{key:"login",value:function(){this.$store.dispatch("login")}},{key:"logout",value:function(){this.$store.dispatch("logout")}},{key:"beforeCreate",value:function(){this.$store.dispatch("checkLoginStatus")}}]),t}(_["c"]);b["__decorate"]([Object(_["b"])()],y.prototype,"msg",void 0),y=b["__decorate"]([_["a"]],y);var O=y,x=O,S=(n("d531"),Object(s["a"])(x,w,k,!1,null,"757ad010",null)),N=S.exports,$=function(e){function t(){return Object(v["a"])(this,t),Object(m["a"])(this,Object(g["a"])(t).apply(this,arguments))}return Object(d["a"])(t,e),t}(_["c"]);$=b["__decorate"]([Object(_["a"])({components:{HelloWorld:N}})],$);var R=$,T=R,L=Object(s["a"])(T,f,h,!1,null,null,null),E=L.exports;a["a"].use(p["a"]);var I=new p["a"]({mode:"history",base:"",routes:[{path:"/",name:"home",component:E},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),P=(n("7f7f"),n("2f62")),U=n("bc3a"),A=n.n(U),C=n("59ca"),F=n.n(C);n("3e8f"),n("24f8");a["a"].use(P["a"]);var H=new P["a"].Store({state:{userName:"wataru",isLogin:!1,uid:"",idToken:"",email:"",displayName:""},mutations:{setUser:function(e,t){e.userName=t.name},setDisplayName:function(e,t){e.displayName=t.displayName},setUserInfo:function(e,t){e.isLogin=!0,e.uid=t.uid,e.idToken=t.idToken,e.email=t.email},changeStatus:function(e,t){e.isLogin=t.status}},actions:{test:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,t.state,t.rootState,e.next=3,A.a.get("https://flask.site:443/user").then(function(e){n("setUser",{name:e.data.name})});case 3:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),post_test:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,t.state,t.rootState,{idToken:this.state.idToken},e.next=4,A.a.get("https://django.service/api/service/user").then(function(e){n("setDisplayName",{displayName:e.data.name})});case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),login:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,t.state,t.rootState,n=new F.a.auth.GoogleAuthProvider,e.next=4,F.a.auth().signInWithPopup(n).then(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a.dispatch("setUserInfo");case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){alert("ログインに失敗しました")});case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),logout:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,t.state,t.rootState,e.next=3,F.a.auth().signOut().then(function(e){n("changeStatus",{status:!1})}).catch(function(e){alert("ログアウトに失敗しました")});case 3:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),checkLoginStatus:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,t.state,t.rootState,e.next=3,F.a.auth().onAuthStateChanged(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n("changeStatus",{status:!!t}),t){e.next=3;break}return e.abrupt("return");case 3:a.dispatch("setUserInfo");case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),setUserInfo:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t.commit,t.state,t.rootState,n=F.a.auth().currentUser,null!=n){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,n.getIdToken(!0);case 6:r=e.sent,this.commit("setUserInfo",{uid:n.uid,idToken:r,email:n.email,displayName:n.displayName});case 8:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},getters:{getName:function(e,t){return function(){return e.userName}}}}),V=n("9483");Object(V["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("ea7b"),n("741f");a["a"].config.productionTip=!1;var z={apiKey:"AIzaSyBb1EQB5F7Q7O9n8BH1Fy929XhH7tRy6OM",authDomain:"seventhproject-248123.firebaseapp.com",databaseURL:"https://seventhproject-248123.firebaseio.com",projectId:"seventhproject-248123",storageBucket:"seventhproject-248123.appspot.com",messagingSenderId:"663686156877"};F.a.initializeApp(z);var B=F.a.messaging();B.usePublicVapidKey("BH21Cxu2dV1d1gHd0nU-JzziDnfg-gtUIQEoSJKN6zsOcjThn7IVuVdsAtaVvF7ETjtW4SFvlvWZubj6-nHzrVg"),B.requestPermission().then(Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("Notification permission granted."),e.next=3,B.getToken().then(function(e){console.log("トークン取得："+e),e||alert("通知の許可をしていません。「通知を許可する」を押してください。")});case 3:case"end":return e.stop()}},e)}))).catch(function(e){console.log("Unable to get permission to notify.",e)}),new a["a"]({router:I,store:H,render:function(e){return e(l)}}).$mount("#app")},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},d531:function(e,t,n){"use strict";var r=n("c1d7"),a=n.n(r);a.a}});
//# sourceMappingURL=app.592f6d9c.js.map