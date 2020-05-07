import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Vuelidate from 'vuelidate' 
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(HighchartsVue)


firebase.initializeApp({
  apiKey: "AIzaSyCDrnurcJPpNTKpaeW_rE0y4WsJivE90bo",
  authDomain: "bonds-f655e.firebaseapp.com",
  databaseURL: "https://bonds-f655e.firebaseio.com",
  projectId: "bonds-f655e",
  storageBucket: "bonds-f655e.appspot.com",
  messagingSenderId: "444451800258",
  appId: "1:444451800258:web:9c7ecb31ffb31a85c9275b",
  measurementId: "G-J38NGH66NF"
})



let app 

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


