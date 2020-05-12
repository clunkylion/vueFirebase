import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from "firebase"
import Notifications from 'vue-notification'


Vue.config.productionTip = false
//Bootstrap Vue
Vue.use(BootstrapVue)
Vue.use(Notifications)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var firebaseConfig = {
  apiKey: "AIzaSyBgV8XntwMBbzK_wM6GpedLXDViDZ0AHwg",
  authDomain: "tallercfvuefirebase-62bdf.firebaseapp.com",
  databaseURL: "https://tallercfvuefirebase-62bdf.firebaseio.com",
  projectId: "tallercfvuefirebase-62bdf",
  storageBucket: "tallercfvuefirebase-62bdf.appspot.com",
  messagingSenderId: "321128180723",
  appId: "1:321128180723:web:d8b32a4688f61435e08086",
  measurementId: "G-1W3NJMJCSZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App),
}).$mount('#app')
