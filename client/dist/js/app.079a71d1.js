(function(e){function t(t){for(var r,a,o=t[0],c=t[1],u=t[2],l=0,d=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==s[o]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},s={app:0},i=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0d6d35":"f23d996d","chunk-6d7f2629":"289956c2"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-6d7f2629":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0d6d35":"31d6cfe0","chunk-6d7f2629":"8ac2c643"}[e]+".css",s=c.p+r,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===s))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){u=d[o],l=u.getAttribute("data-href");if(l===r||l===s)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||s,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],p.parentNode.removeChild(p),n(i)},p.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){a[e]=0})));var r=s[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=s[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=s[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}s[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"2da0":function(e,t,n){"use strict";var r=n("749e"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("4452"),s=n.n(a),i=n("1dce"),o=n.n(i),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n(e.layout,{tag:"component"},[n("router-view")],1)],1)},u=[],l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"fill-height ma-0 pa-0",attrs:{fluid:""}},[r("v-row",{staticClass:"fill-height"},[r("v-col",{staticClass:"white d-flex align-center justify-center"},[r("v-card",{staticClass:"black--text",attrs:{color:"rgba(255, 255, 255, 0)",elevation:"0"}},[r("router-view")],1)],1),r("v-col",{staticClass:"black d-flex align-center justify-center"},[r("v-card",{attrs:{color:"rgba(255, 255, 255, 0)",elevation:"0"}},[r("v-img",{attrs:{src:n("9b19"),"max-height":"300px","max-width":"300px"}})],1)],1)],1)],1)},d=[],p=n("a55b"),m={created:function(){this.$vuetify.theme.dark=!0},components:{Login:p["default"]}},f=m,h=n("2877"),v=n("6544"),b=n.n(v),g=n("b0af"),x=n("62ad"),k=n("a523"),w=n("adda"),y=n("0fd9"),_=Object(h["a"])(f,l,d,!1,null,null,null),C=_.exports;b()(_,{VCard:g["a"],VCol:x["a"],VContainer:k["a"],VImg:w["a"],VRow:y["a"]});var L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{"mini-variant":e.drawer,app:"",color:"rgb(6,8,24)",dark:"",clipped:""},on:{"update:miniVariant":function(t){e.drawer=t},"update:mini-variant":function(t){e.drawer=t}}},[n("v-list",[n("v-list-item",{attrs:{link:"",to:"/"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-bitcoin")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Облигации")])],1)],1),n("v-list-group",{attrs:{"prepend-icon":"mdi-account"},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item-title",[e._v("Профиль")])]},proxy:!0}])},[n("v-list",{attrs:{dense:"",dark:""}},[n("v-list-item",{attrs:{link:"",to:"/lockscreen"}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-lock-outline")])],1),n("v-list-item-title",[e._v("Заблокировать")])],1),n("v-list-item",{attrs:{link:""},on:{click:e.logout}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-logout")])],1),n("v-list-item-title",[e._v("Выйти")])],1)],1)],1)],1)],1),n("v-app-bar",{attrs:{app:"",dark:"",color:"rgb(6,8,24)","clipped-left":"",dense:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),n("v-toolbar-title",{staticClass:"font-weight-bold"},[e._v("BONDS")]),n("v-spacer"),n("v-btn",{staticClass:"mr-2",on:{click:function(t){return e.resetZoom()}}},[n("v-icon",{staticClass:"mr-2"},[e._v(" mdi-magnify-minus-outline ")]),e._v(" Сбросить zoom ")],1),e.timerDisplay?n("v-btn",{staticClass:"mr-2",attrs:{disabled:""}},[n("v-icon",{staticClass:"mr-2"},[e._v(" mdi-refresh ")]),e._v(" 00:"+e._s(e.currentTime)+" ")],1):n("v-btn",{staticClass:"mr-2",on:{click:function(t){return e.refreshPage()}}},[n("v-icon",{staticClass:"mr-2"},[e._v(" mdi-refresh ")]),e._v(" Обновить ")],1),n("v-btn",{on:{click:function(t){return t.stopPropagation(),e.settingsDrawerShow()}}},[n("v-icon",{staticClass:"mr-2"},[e._v("mdi-cog-outline")]),e._v(" Построения ")],1)],1),n("v-content",[n("v-container",{staticClass:"fill-height d-flex align-start content__wrapper",attrs:{fluid:""}},[n("router-view",{ref:"childComponent"})],1)],1)],1)},V=[],S=(n("b0c0"),n("b64b"),n("96cf"),n("1da1")),R=n("bb51"),O=(n("899e"),{data:function(){return{drawer:!0,timerDisplay:!1,currentTime:59,timer:null}},created:function(){this.$vuetify.theme.dark=!1},mounted:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("getUid");case 2:if(n=t.sent,n||e.$router.push("/login"),Object.keys(e.$store.getters.info).length){t.next=7;break}return t.next=7,e.$store.dispatch("fetchInfo");case 7:case"end":return t.stop()}}),t)})))()},methods:{settingsDrawerShow:function(){this.$refs.childComponent.settingsDrawer=!this.$refs.childComponent.settingsDrawer},startButtonTimer:function(){var e=this;this.currentTime=59,this.timer=setInterval((function(){e.currentTime--,e.currentTime<10&&(e.currentTime="0"+e.currentTime)}),1e3)},stopButtonTimer:function(){clearTimeout(this.timer)},logout:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("logout");case 2:e.$router.push("/login?message=logout");case 3:case"end":return t.stop()}}),t)})))()},refreshPage:function(){var e=this;this.timerDisplay=!0,this.$refs.childComponent.refreshPage(),this.startButtonTimer(),setTimeout((function(){e.stopButtonTimer(),e.timerDisplay=!1}),6e4)},resetZoom:function(){this.$refs.childComponent.resetZoom()}},computed:{name:function(){return this.$store.getters.info.name},avatar:function(){return this.$store.getters.info.avatar}},components:{"child-component":R["default"]}}),$=O,j=(n("2da0"),n("7496")),I=n("40dc"),T=n("5bc1"),A=n("8336"),B=n("a75b"),N=n("132d"),D=n("8860"),P=n("56b0"),E=n("da13"),U=n("1800"),G=n("5d23"),F=n("34c3"),q=n("f774"),z=n("2fa4"),H=n("2a7f"),W=Object(h["a"])($,L,V,!1,null,null,null),J=W.exports;b()(W,{VApp:j["a"],VAppBar:I["a"],VAppBarNavIcon:T["a"],VBtn:A["a"],VContainer:k["a"],VContent:B["a"],VIcon:N["a"],VList:D["a"],VListGroup:P["a"],VListItem:E["a"],VListItemAction:U["a"],VListItemContent:G["a"],VListItemIcon:F["a"],VListItemTitle:G["b"],VNavigationDrawer:q["a"],VSpacer:z["a"],VToolbarTitle:H["a"]});var M={computed:{layout:function(){return(this.$route.meta.layout||"main")+"-layout"}},components:{MainLayout:J,AuthLayout:C}},Z=M,K=Object(h["a"])(Z,c,u,!1,null,null,null),Q=K.exports;b()(K,{VApp:j["a"]});n("d3b7");var X=n("8c4f");r["a"].use(X["a"]);var Y=[{path:"/",name:"Облигации",meta:{layout:"main"},component:function(){return Promise.resolve().then(n.bind(null,"bb51"))}},{path:"/login",name:"Авторизация",meta:{layout:"auth"},component:function(){return Promise.resolve().then(n.bind(null,"a55b"))}},{path:"/register",name:"Регистрация",meta:{layout:"auth"},component:function(){return n.e("chunk-2d0d6d35").then(n.bind(null,"73cf"))}},{path:"/lockscreen",name:"Заблокировать",meta:{layout:"auth"},component:function(){return n.e("chunk-6d7f2629").then(n.bind(null,"5459"))}}],ee=new X["a"]({mode:"history",base:"/",routes:Y}),te=ee,ne=n("2f62"),re=n("59ca"),ae=n.n(re),se={actions:{login:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.dispatch,e.commit,r=t.email,a=t.password,n.prev=2,n.next=5,ae.a.auth().signInWithEmailAndPassword(r,a);case 5:n.next=10;break;case 7:throw n.prev=7,n.t0=n["catch"](2),n.t0;case 10:case"end":return n.stop()}}),n,null,[[2,7]])})))()},register:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a,s,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,e.commit,a=t.name,s=t.email,i=t.password,n.prev=2,n.next=5,ae.a.auth().createUserWithEmailAndPassword(s,i);case 5:return n.next=7,r("getUid");case 7:return o=n.sent,n.next=10,ae.a.database().ref("/users/".concat(o,"/info")).set({avatar:"",isAdmin:0,name:a,email:s});case 10:n.next=15;break;case 12:throw n.prev=12,n.t0=n["catch"](2),n.t0;case 15:case"end":return n.stop()}}),n,null,[[2,12]])})))()},getUid:function(e){e.dispatch;var t=ae.a.auth().currentUser;return t?t.uid:null},logout:function(e){return Object(S["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,ae.a.auth().signOut();case 3:return t.next=5,n("clearInfo");case 5:case"end":return t.stop()}}),t)})))()}}},ie={state:{info:{}},mutations:{setInfo:function(e,t){e.info=t},clearInfo:function(e){e.info={}}},actions:{fetchInfo:function(e){return Object(S["a"])(regeneratorRuntime.mark((function t(){var n,r,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.dispatch,r=e.commit,t.prev=1,t.next=4,n("getUid");case 4:return a=t.sent,t.next=7,ae.a.database().ref("/users/".concat(a,"/info")).once("value");case 7:s=t.sent.val(),r("setInfo",s),t.next=13;break;case 11:t.prev=11,t.t0=t["catch"](1);case 13:case"end":return t.stop()}}),t,null,[[1,11]])})))()}},getters:{info:function(e){return e.info}}},oe=(n("99af"),{actions:{createUserGroup:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a,s,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,a=t.name,s=t.bonds,n.prev=2,n.next=5,r("getUid");case 5:return i=n.sent,n.next=8,ae.a.database().ref("/users/".concat(i,"/groups/").concat(a)).set({name:a,bonds:s});case 8:n.next=13;break;case 10:throw n.prev=10,n.t0=n["catch"](2),n.t0;case 13:case"end":return n.stop()}}),n,null,[[2,10]])})))()},fetchUserGroup:function(e){return Object(S["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.dispatch,t.prev=1,t.next=4,n("getUid");case 4:return r=t.sent,t.next=7,ae.a.database().ref("/users/".concat(r,"/groups")).once("value");case 7:return a=t.sent.val(),t.abrupt("return",a);case 11:throw t.prev=11,t.t0=t["catch"](1),t.t0;case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))()},fetchGroupData:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,n.prev=1,n.next=4,r("getUid");case 4:return a=n.sent,n.next=7,ae.a.database().ref("/users/".concat(a,"/groups/").concat(t.name)).once("value");case 7:return s=n.sent.val(),n.abrupt("return",s);case 11:throw n.prev=11,n.t0=n["catch"](1),n.t0;case 14:case"end":return n.stop()}}),n,null,[[1,11]])})))()},deleteUserGroup:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,n.prev=1,n.next=4,r("getUid");case 4:return a=n.sent,n.next=7,ae.a.database().ref("/users/".concat(a,"/groups/").concat(t.name)).remove();case 7:n.next=12;break;case 9:throw n.prev=9,n.t0=n["catch"](1),n.t0;case 12:case"end":return n.stop()}}),n,null,[[1,9]])})))()},createBaseLine:function(e,t){return Object(S["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.dispatch,r=t.name,a=t.bonds,n.prev=2,n.next=5,ae.a.database().ref("/baseline/".concat(r)).set({name:r,bonds:a});case 5:n.next=10;break;case 7:throw n.prev=7,n.t0=n["catch"](2),n.t0;case 10:case"end":return n.stop()}}),n,null,[[2,7]])})))()},fetchBaseLine:function(e){return Object(S["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dispatch,t.prev=1,t.next=4,ae.a.database().ref("/baseline/").once("value");case 4:return n=t.sent.val(),t.abrupt("return",n);case 8:throw t.prev=8,t.t0=t["catch"](1),t.t0;case 11:case"end":return t.stop()}}),t,null,[[1,8]])})))()}}});r["a"].use(ne["a"]);var ce=new ne["a"].Store({state:{},mutations:{},actions:{},modules:{auth:se,info:ie,group:oe}}),ue=(n("5363"),n("f309"));r["a"].use(ue["a"]);var le,de=new ue["a"]({icons:{iconfont:"mdi"}});n("ea7b"),n("66ce");r["a"].config.productionTip=!1,r["a"].use(o.a),r["a"].use(s.a),ae.a.initializeApp({apiKey:"AIzaSyCDrnurcJPpNTKpaeW_rE0y4WsJivE90bo",authDomain:"bonds-f655e.firebaseapp.com",databaseURL:"https://bonds-f655e.firebaseio.com",projectId:"bonds-f655e",storageBucket:"bonds-f655e.appspot.com",messagingSenderId:"444451800258",appId:"1:444451800258:web:9c7ecb31ffb31a85c9275b",measurementId:"G-J38NGH66NF"}),ae.a.auth().onAuthStateChanged((function(){le||(le=new r["a"]({router:te,store:ce,vuetify:de,render:function(e){return e(Q)}}).$mount("#app"))}))},"749e":function(e,t,n){},"899e":function(e,t,n){"use strict";n("d81d"),n("d3b7");var r=n("5530"),a=(n("96cf"),n("1da1")),s=n("d4ec"),i=n("bee2"),o=n("bc3a"),c=n.n(o),u="http://82.148.31.138:80/api/bonds",l=function(){function e(){Object(s["a"])(this,e)}return Object(i["a"])(e,null,[{key:"getBonds",value:function(){return new Promise(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.get(u);case 3:a=e.sent,s=a.data,t(s.map((function(e){return Object(r["a"])({},e)}))),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),n(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}())}}]),e}();t["a"]=l},"9b19":function(e,t,n){e.exports=n.p+"img/logo.24de6fc5.svg"},a55b:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login__page"},[n("div",{staticClass:"login__header"},[e._m(0),n("p",{staticClass:"subtitle"},[e._v("Нет аккаунта? "),n("span",[n("router-link",{staticClass:"font-weight-bold blue--text text--darken-3",attrs:{to:"/register"}},[e._v("Создать аккаунт")])],1)])]),n("form",{on:{submit:function(t){return t.preventDefault(),e.submitHandler(t)}}},[n("v-text-field",{attrs:{label:"Email",rules:e.emailRules,"prepend-icon":"mdi-account-outline"},model:{value:e.email,callback:function(t){e.email="string"===typeof t?t.trim():t},expression:"email"}}),n("v-text-field",{attrs:{"append-icon":e.show?"mdi-eye":"mdi-eye-off",type:e.show?"text":"password",label:"Пароль",rules:e.passwordRules,"prepend-icon":"mdi-lock-outline"},on:{"click:append":function(t){e.show=!e.show}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("div",{staticClass:"form__buttons d-flex justify-end mt-2"},[n("v-btn",{staticClass:"font-weight-bold",attrs:{type:"submit",color:"primary"}},[e._v(" Войти ")])],1)],1)])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h3",{staticClass:"display-1 text--darken-4 font-weight-bold"},[e._v("Авторизация в "),n("span",{staticClass:"blue--text text--darken-3"},[e._v("BONDS")])])}],s=(n("96cf"),n("1da1")),i=n("b5ae"),o={name:"Login",data:function(){return{show:!1,email:"",emailRules:[function(e){return!!e||"Введите Email"},function(e){return/.+@.+/.test(e)||"Неверный Email"}],password:"",passwordRules:[function(e){return!!e||"Введите пароль"},function(e){return e.length>=6||"Минимальная длина пароля 6 символов"}]}},validations:{email:{email:i["email"],required:i["required"]},password:{required:i["required"],minLength:Object(i["minLength"])(6)}},methods:{submitHandler:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$v.$invalid){t.next=3;break}return e.$v.$touch(),t.abrupt("return");case 3:return n={email:e.email,password:e.password},t.prev=4,t.next=7,e.$store.dispatch("login",n);case 7:e.$router.push("/"),t.next=12;break;case 10:t.prev=10,t.t0=t["catch"](4);case 12:case"end":return t.stop()}}),t,null,[[4,10]])})))()}},created:function(){this.$vuetify.theme.dark=!1}},c=o,u=n("2877"),l=n("6544"),d=n.n(l),p=n("8336"),m=n("8654"),f=Object(u["a"])(c,r,a,!1,null,null,null);t["default"]=f.exports;d()(f,{VBtn:p["a"],VTextField:m["a"]})},bb51:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",[n("v-navigation-drawer",{attrs:{app:"",temporary:"",color:"rgb(6,8,24)",width:"350px",right:""},model:{value:e.settingsDrawer,callback:function(t){e.settingsDrawer=t},expression:"settingsDrawer"}},[n("Settings",{ref:"settings"})],1),n("v-col",{staticStyle:{"padding-top":"0"},attrs:{cols:"12"}},[n("v-card",[e.loading?n("v-skeleton-loader",{attrs:{type:"image"}}):n("highcharts",{ref:"chart",attrs:{options:e.chartOptions}})],1),n("div",{staticClass:"table mt-5"},[e.loading?n("v-skeleton-loader",{attrs:{type:"table"}}):n("v-card",[n("v-expansion-panels",{attrs:{flat:""}},[n("v-expansion-panel",{staticStyle:{"border-bottom":"1px solid #d4d4d4"}},[n("v-expansion-panel-header",[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("v-chip",{staticClass:"gray--text text-uppercase caption ma-0"},[e._v("Фильтры")])],1)],1)],1),n("v-expansion-panel-content",[n("v-card",{attrs:{elevation:"0"}},[n("v-row",[n("v-col",[n("v-form",{staticStyle:{"min-width":"100%"},on:{submit:function(t){return t.preventDefault(),e.filterData()}}},[n("v-row",{attrs:{align:"center",justify:"space-between"}},[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"4"}},[n("v-text-field",{attrs:{label:"Название",outlined:""},model:{value:e.filterName,callback:function(t){e.filterName=t},expression:"filterName"}},[e._v(" asdasd ")])],1),n("v-col",{attrs:{cols:"4"}},[n("v-text-field",{attrs:{label:"ISIN",outlined:""},model:{value:e.filterIsin,callback:function(t){e.filterIsin=t},expression:"filterIsin"}},[e._v(" asdasd ")])],1)],1),n("v-col",{attrs:{cols:"12"}},[n("v-select",{staticClass:"mr-3 subtitle-2",attrs:{items:e.typeItems,label:"Тип",multiple:"",outlined:"","small-chips":"","deletable-chips":"",autowidth:"false"},scopedSlots:e._u([{key:"prepend-item",fn:function(){return[n("v-list-item",{attrs:{ripple:""},on:{click:e.toggle}},[n("v-list-item-action",[n("v-icon",{attrs:{color:e.typeValue.length>0?"indigo darken-4":""}},[e._v(e._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Выбрать все")])],1)],1),n("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:e.typeValue,callback:function(t){e.typeValue=t},expression:"typeValue"}})],1)],1),n("v-row",{attrs:{justify:"end"}},[n("v-col",{attrs:{cols:"3"}},[n("v-btn",{staticClass:"mr-2",attrs:{color:"error"},on:{click:function(t){return e.resetFilters()}}},[e._v(" Сбросить фильтры ")]),n("v-btn",{attrs:{color:"primary",type:"submit"}},[e._v(" Фильтр ")])],1)],1)],1)],1)],1)],1)],1)],1)],1),n("v-data-table",{staticClass:"elevation-2",attrs:{headers:e.headers,"items-per-page":15,items:e.items,"show-select":"","item-key":"isin",locale:"ru-RU"},scopedSlots:e._u([{key:"item.name",fn:function(t){var r=t.item;return[n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.selectScatter(r)}}},[e._v(" "+e._s(r.name)+" ")])]}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1)],1),n("v-snackbar",{attrs:{timeout:e.snackbarTimeout,bottom:"",right:""},model:{value:e.baseLineSnackbar,callback:function(t){e.baseLineSnackbar=t},expression:"baseLineSnackbar"}},[e._v(" Выбрано облигаций: "+e._s(e.countSelectBonds)+" "),n("v-spacer"),n("v-btn",{attrs:{color:"info"},on:{click:function(t){return e.addBaseLine()}}},[e._v(" Добавить ")]),n("v-btn",{staticClass:"font-weight-bold",attrs:{text:"",color:"red"},on:{click:function(t){e.baseLineSnackbar=!1}}},[e._v(" Отмена ")])],1),n("v-snackbar",{attrs:{timeout:5e3,color:e.snackbarstatus,bottom:"",right:""},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},["success"==e.snackbarstatus?n("v-icon",{staticClass:"mr-2",attrs:{color:"white"}},[e._v(" mdi-check-circle-outline ")]):n("v-icon",{staticClass:"mr-2",attrs:{color:"white"}},[e._v(" mdi-alert-circle-outline ")]),e._v(" "+e._s(e.snackbarText)+" "),n("v-spacer"),n("v-btn",{staticClass:"font-weight-bold",attrs:{text:"",color:"white"},on:{click:function(t){e.snackbar=!1}}},[e._v(" Закрыть ")])],1)],1)},a=[],s=(n("4de4"),n("c740"),n("c975"),n("d81d"),n("fb6a"),n("b0c0"),n("96cf"),n("1da1")),i=n("899e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-list-item",{attrs:{dark:""}},[n("v-list-item-title",{staticClass:"headline"},[e._v("Построения")])],1),e.loading?n("v-skeleton-loader",{attrs:{type:"article",dark:""}}):n("v-list",{staticClass:"mt-2",attrs:{dark:""}},[n("v-subheader",[e._v("БАЗОВЫЕ ЛИНИИ")]),e.baseLines?e._l(e.baseLines,(function(t){return n("v-list-item",{key:t.name,staticClass:"mb-2"},[n("v-card",{staticClass:"d-flex align-center justify-space-between px-2",staticStyle:{width:"100%"}},[n("v-list-item",[e._v(e._s(t.name))]),n("div",{staticClass:"d-flex"},[n("v-btn",{staticClass:"mr-2",attrs:{color:"success",small:""},on:{click:function(n){return e.createLine(t)}}},[n("v-icon",[e._v("mdi-chart-line")])],1),n("v-btn",{attrs:{color:"error",small:""},on:{click:function(n){return e.deleteLine(t)}}},[n("v-icon",[e._v("mdi-close")])],1)],1)],1)],1)})):n("div",{staticClass:"d-flex justify-center",staticStyle:{width:"100%"}},[n("v-chip",[n("span",{staticClass:"px-2"},[e._v("Базовые линии не созданы")])])],1),e.isAdmin?n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-list-item",{staticClass:"mt-2"},[n("div",{staticClass:"d-flex justify-center",staticStyle:{width:"100%"}},[n("v-card",[n("v-btn",e._g({staticClass:"font-weight-bold",attrs:{text:"",color:"primary"}},r),[e._v(" Создать базовую линию ")])],1)],1)])]}}],null,!1,3618092751),model:{value:e.dialogAddBaseLine,callback:function(t){e.dialogAddBaseLine=t},expression:"dialogAddBaseLine"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Создание базовой линии")])]),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Название группы",required:"",rules:e.baseLineNameRules},model:{value:e.baseLineName,callback:function(t){e.baseLineName=t},expression:"baseLineName"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){e.dialogAddBaseLine=!1}}},[e._v("Закрыть")]),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.createBaseLine()}}},[e._v("Создать")])],1)],1)],1):e._e()],2)],1)},c=[],u=n("b5ae"),l={data:function(){return{loading:!0,baseLines:[],dialogAddBaseLine:!1,baseLineName:"",baseLineNameRules:[function(e){return!!e||"Введите название"}]}},validations:{baseLineName:{required:u["required"]}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("fetchBaseLine");case 2:e.baseLines=t.sent,e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()},methods:{fetchBaseLine:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.dispatch("fetchBaseLine");case 3:e.baseLines=t.sent,e.loading=!1;case 5:case"end":return t.stop()}}),t)})))()},createLine:function(e){this.$parent.$parent.chartsCreateLine(e)},deleteLine:function(e){this.$parent.$parent.chartsDeleteLine(e)},createBaseLine:function(){if(this.$v.$invalid)this.$v.$touch();else{this.dialogAddBaseLine=!1;var e=this.baseLineName;this.$parent.$parent.createBaseLine(e)}}},computed:{isAdmin:function(){return this.$store.getters.info.isAdmin}}},d=l,p=n("2877"),m=n("6544"),f=n.n(m),h=n("8336"),v=n("b0af"),b=n("99d9"),g=n("cc20"),x=n("62ad"),k=n("a523"),w=n("169a"),y=n("132d"),_=n("8860"),C=n("da13"),L=n("5d23"),V=n("0fd9"),S=n("3129"),R=n("2fa4"),O=n("e0c7"),$=n("8654"),j=Object(p["a"])(d,o,c,!1,null,null,null),I=j.exports;f()(j,{VBtn:h["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VChip:g["a"],VCol:x["a"],VContainer:k["a"],VDialog:w["a"],VIcon:y["a"],VList:_["a"],VListItem:C["a"],VListItemTitle:L["b"],VRow:V["a"],VSkeletonLoader:S["a"],VSpacer:R["a"],VSubheader:O["a"],VTextField:$["a"]});var T=n("4452"),A=n("ea7f"),B=n.n(A),N=n("0319"),D=n.n(N),P=n("37d8"),E=n.n(P);E()(B.a),D()(B.a);var U={name:"Home",data:function(){return{settingsDrawer:!1,dialogAddUserGroup:!1,userGroupName:"",userGroupNameRules:[function(e){return!!e||"Введите название"}],baseLineSnackbar:!1,baseLineName:"",snackbarTimeout:0,snackbar:!1,snackbarstatus:"",snackbarText:"",groups:[],bonds:[],filterIsin:"",filterName:"",typeItems:["Биржевая облигация","Государственная облигация","Корпоративная облигация","Муниципальная облигация","Облигационный федеральный займ","Облигация МФО","Облигация центрального банка","Региональная облигация"],typeValue:[],selected:[],headers:[{text:"Название",value:"name",align:"center",sortable:!1},{text:"ISIN",value:"isin",sortable:!1},{text:"Доходность",value:"profit"},{text:"Дюрация",value:"duration"},{text:"Цена послед.",value:"last_price"},{text:"Лучший спрос",value:"best_spros"},{text:"Лучшее предл.",value:"best_predl"},{text:"Оборот",value:"oborot"},{text:"Тип",value:"type"}],loading:!0,scatters:[],ofz:[],items:[],error:"",chart:[],selectPoint:[],chartOptions:{}}},validations:{userGroupName:{required:u["required"]}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.typeValue=e.typeItems,t.next=4,e.$store.dispatch("fetchUserGroup");case 4:return e.groups=t.sent,t.next=7,i["a"].getBonds();case 7:e.bonds=t.sent,e.items=e.bonds,e.getScatters(),e.chartOptions={chart:{height:700,amimation:{duration:500},type:"scatter",panning:{enabled:!0,type:"xy"},panKey:"shift",zoomType:"xy",events:{load:function(e){return function(){e.chart=this}}(e)}},title:{text:"Облигации"},xAxis:{min:0,minRange:.5,title:{text:"Дюрация, лет"},minorTickInterval:1,startOnTick:!0,endOnTick:!0},yAxis:{minRange:1,title:{text:"Доходность, %"}},legend:{enabled:!1},plotOptions:{series:{turboThreshold:2e3,stickyTracking:!1},scatter:{marker:{radius:4,states:{hover:{enabled:!0,lineColor:"rgb(100,100,100)",fillColor:"#EF5350"}}},states:{hover:{marker:{enabled:!1}}}}},navigator:{enabled:!0,series:{type:"scatter",lineWidth:0,marker:{enabled:!0,radius:2}},xAxis:{labels:{enabled:!1}}},tooltip:{headerFormat:'<span style="font-size: 10px">{point.point.id}</span><br><b>{point.point.name}</b><br>',pointFormat:"Дюрация: {point.x} лет<br> Доходность: {point.y}%<br>Цена послед.: {point.last_price}<br>Лучший спрос: {point.best_spros}<br>Лучшее предл.: {point.best_predl}<br>Оборот: {point.oborot}<br>"},series:[{data:e.scatters}]},e.loading=!1,t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](0),e.error=t.t0.message;case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))()},methods:{toggle:function(){var e=this;this.$nextTick((function(){e.likesAllItems?e.typeValue=[]:e.typeValue=e.typeItems.slice()}))},selectScatter:function(e){this.selected=[],this.selectPoint[0]&&this.selectPoint[0].setState("normal"),this.items=this.bonds;var t=e,n=this.chart.series[0].data.filter((function(e){if(e.id===t.isin)return e}));this.selectPoint=n,this.selectPoint[0].setState("hover"),window.scrollTo(0,70),n[0].setState("hover");var r=this.items.filter((function(e){if(e.isin!==t.isin)return e}));r.unshift(t),this.selected.push(t),this.items=r},showSnackbar:function(){this.$v.$invalid?this.$v.$touch():(this.dialogAddUserGroup=!1,this.baseLineSnackbar=!0)},createBaseLine:function(e){this.baseLineName=e,this.settingsDrawer=!1,this.baseLineSnackbar=!0},addBaseLine:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selected.length&&1!=e.selected.length){t.next=5;break}return e.snackbar=!0,e.snackbarstatus="error",e.snackbarText="Неверное кол-во элементов",t.abrupt("return");case 5:return e.baseLineSnackbar=!1,n={name:e.baseLineName,bonds:e.selected},t.next=9,e.$store.dispatch("createBaseLine",n);case 9:e.snackbar=!0,e.snackbarstatus="success",e.snackbarText="Базовая линия успешно создана",e.$refs.settings.fetchBaseLine(),e.selected=[],e.baseLineName="";case 15:case"end":return t.stop()}}),t)})))()},addUserGroup:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selected.length){t.next=5;break}return e.snackbar=!0,e.snackbarstatus="error",e.snackbarText="В группу не добавлено ни одной облигации",t.abrupt("return");case 5:return e.userGroupSnackbar=!1,n={name:e.userGroupName,bonds:e.selected},t.next=9,e.$store.dispatch("createUserGroup",n);case 9:return e.snackbar=!0,e.snackbarstatus="success",e.snackbarText="Группа успешно создана",t.next=14,e.$store.dispatch("fetchUserGroup");case 14:e.groups=t.sent,e.selected=[],e.userGroupName="";case 17:case"end":return t.stop()}}),t)})))()},deleteGroup:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("deleteUserGroup",e);case 2:return n.next=4,t.$store.dispatch("fetchUserGroup");case 4:t.groups=n.sent,t.snackbar=!0,t.snackbarstatus="success",t.snackbarText="Группа успешно удалена";case 8:case"end":return n.stop()}}),n)})))()},showGroup:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("fetchGroupData",e);case 2:r=n.sent,t.items=r.bonds,t.getScatters();case 5:case"end":return n.stop()}}),n)})))()},resetZoom:function(){this.chart.zoomOut()},refreshPage:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,i["a"].getBonds();case 3:e.bonds=t.sent,e.filterData(),e.loading=!1;case 6:case"end":return t.stop()}}),t)})))()},getScatters:function(){var e=this;this.scatters=[],this.items.map((function(t){e.scatters.push({id:t.isin,name:t.name,last_price:t.last_price,best_spros:t.best_spros,best_predl:t.best_predl,oborot:t.oborot,x:t.duration,y:t.profit})})),setTimeout((function(){e.chart.series[0].setData(e.scatters)}),0)},getLine:function(e){var t=[];function n(e){return function(t,n){return t[e]>n[e]?1:-1}}return e.bonds.filter((function(e){t.push({id:e.isin,name:e.name,last_price:e.last_price,best_spros:e.best_spros,best_predl:e.best_predl,oborot:e.oborot,x:e.duration,y:e.profit})})),t.sort(n("x")),t},filterData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,a,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.typeValue,r=e.bonds.filter((function(e){switch(e.type){case n[0]:return e;case n[1]:return e;case n[2]:return e;case n[3]:return e;case n[4]:return e;case n[5]:return e;case n[6]:return e;case n[7]:return e}})),a=r,e.filterIsin&&(s=e.filterIsin.toUpperCase(),a=a.filter((function(e){return e.isin.indexOf(s)>-1}))),e.filterName&&(i=e.filterName.toUpperCase(),a=a.filter((function(e){return e.name.indexOf(i)>-1}))),e.items=a,e.getScatters(),e.getOFZ(),setTimeout((function(){e.chart.series[0].setData(e.scatters)}),0);case 9:case"end":return t.stop()}}),t)})))()},resetFilters:function(){this.typeValue=this.typeItems,this.items=this.bonds},chartsCreateLine:function(e){var t=this.getLine(e),n={name:e.name,color:"#FF8A80",lineWidth:3,marker:{lineColor:"#FF8A80",radius:6},stickyTracking:!1,data:t};this.chart.addSeries(n),this.snackbar=!0,this.snackbarstatus="success",this.snackbarText="Линия "+e.name+" построена"},chartsDeleteLine:function(e){var t=this.chart.series.findIndex((function(t){return t.name==e.name}));this.chart.series[t].remove(),this.snackbar=!0,this.snackbarstatus="success",this.snackbarText="Линия "+e.name+" удалена"}},computed:{likesAllItems:function(){return this.typeValue.length===this.typeItems.length},likesSomeItems:function(){return this.typeValue.length>0&&!this.likesAllItems},icon:function(){return this.likesAllItems?"mdi-close-box":this.likesSomeItems?"mdi-minus-box":"mdi-checkbox-blank-outline"},countSelectBonds:function(){return this.selected.length},groupsName:function(){return this.$store.getters.groups}},components:{highcharts:T["Chart"],Settings:I}},G=U,F=n("8fea"),q=n("ce7e"),z=n("cd55"),H=n("49e2"),W=n("c865"),J=n("0393"),M=n("4bd4"),Z=n("1800"),K=n("f774"),Q=n("b974"),X=n("2db4"),Y=Object(p["a"])(G,r,a,!1,null,null,null);t["default"]=Y.exports;f()(Y,{VBtn:h["a"],VCard:v["a"],VChip:g["a"],VCol:x["a"],VDataTable:F["a"],VDivider:q["a"],VExpansionPanel:z["a"],VExpansionPanelContent:H["a"],VExpansionPanelHeader:W["a"],VExpansionPanels:J["a"],VForm:M["a"],VIcon:y["a"],VListItem:C["a"],VListItemAction:Z["a"],VListItemContent:L["a"],VListItemTitle:L["b"],VNavigationDrawer:K["a"],VRow:V["a"],VSelect:Q["a"],VSkeletonLoader:S["a"],VSnackbar:X["a"],VSpacer:R["a"],VTextField:$["a"]})}});
//# sourceMappingURL=app.079a71d1.js.map