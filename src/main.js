import "./assets/scss/main.scss";

import Vue from 'vue'
import App from './App.vue'


import router from './router'

// import axiosVue from 'axios-vue'

import VueScrollTo from 'vue-scrollto'

import Meta from 'vue-meta';

// import axios from "axios";


// Vue.use(axiosVue)

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -120,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(Meta)

Vue.config.productionTip = false

Vue.filter( 'timecode' , function( value ){
  var seconds = Math.floor( value % 60 ).toString();
  var minutes = Math.floor( value / 60 ).toString();
  if( seconds.length === 1 ){
      seconds = '0' + seconds;
  }                
  return minutes + ':' + seconds;
});

Vue.prototype.$_encry = function(x){
  let jwt = require('jwt-simple');
  let secret = 'QWItSW5iZXZfYXBsaWNhdGlvblZ1ZUpTMjAyMQ';
  let token = jwt.encode(x, secret);
  return {_token: token};
}

new Vue({
  router,
  render: h => h(App),
  data: {
    // Oh no - appName es *también* el nombre de una
    // propiedad de instancia que hemos definido!
    output: '', 
    output2: '', 
    csrf_token: '',
    logout_token: '',
    jwt_token: ''
  },
  created() {
    // this.createLogin()
    // this.createJwt()
    var self = this;
    window.onbeforeunload = function (e) {
      if((self.$route.path  == "/trivia")) {
        e = e || window.event;
        //old browsers
        if (e) {e.returnValue = '¿Estás seguro de recargar la página?';}
        //safari, chrome(chrome ignores text)
        return '¿Estás seguro de recargar la página?';
      } else if ((self.$route.path  == "/message") || (self.$route.path  == "/ranking") || (self.$route.path  == "/registro")){
        return null;
      } else { 
        return null;
      }
    };
    // if (performance.navigation.type == 1) {
    //   if(this.$route.path == '/trivia') {
    //       this.$router.push({path: '/'})
    //     } else {
    //       console.log('reload page without redirect');
    //   }
    // }
  },
  watch: {
    output: function () {
      this.csrf_token = this.output.csrf_token
      this.logout_token = this.output.logout_token
    }
  },
  methods: {
    // createLogin() {
    //   let self = this
    //   axios({
    //     method: 'post', //you can set what request you want to be
    //     url: 'https://dev-cads-api.pantheonsite.io/user/login?_format=json',
    //     data: {
    //       "name":"admin",
    //       "pass":"abinbev"
    //     },
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(function (response) {
    //       self.output = response.data;
    //   })
    //   .catch(function (error) {
    //       self.output = error;
    //   });
    // }
    // createJwt() {
    //   let vm = this
    //   axios({
    //     method: 'GET',
    //     url: 'http://20.55.5.188/jwt/token?_format=json'
    //   }).then(function(response){
    //     vm.output2 = response.data;
    //     console.log(response);
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // }
  },
  metaInfo: {
    // Children can override the title.
    title: 'Cerveza Pilsen | Participa en la trivia Pilsen y gana premios',
    // Define meta tags here.
    meta: [
      {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'Participa en la trivia de cerveza Becker, responde las preguntas en el menor tiempo posible para ganar premios diarios. Ingresa y conoce cómo participar.'},
      {name: 'google-site-verification', content: 'sqwSZH3PQZOF4mEc8vbVj9jR2haKMHD617XQ0YwULto'},
    ],
    link: [
      {rel: 'canonical', href: 'https://trivia-becker.cl/'}
    ],
  }
}).$mount('#app')

