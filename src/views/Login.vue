<template lang="pug">
  <div class="cc-login cc-page">
    .container-login
      header.cc-login__header
        h2.cc-login__title-login INICIA SESIÓN
        form.cc-home__form-login(action="post" v-on:submit.prevent="validarLogin")
          .cc-home__form-control-login
            label.cc-form__label-login(for="login-mail") E-mail
            input.cc-form__input-login(id="login-mail" type="login-email" placeholder="Ingresa tu Correo electrónico" v-model="inputLogin")
          .cc-form__footer-login
            button.cc-form__login(type="submit") INICIA SESIÓN
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      inputLogin: '',
    }
  },
  methods: {
    async validarLogin() { 
      const axios = require('axios') 
      const sha256 = require('js-sha256').sha256
      let emailhash = sha256(this.inputLogin)    
      let info = { login_mail: this.inputLogin }
      let res = await axios.post('http://triviareplicas.azurewebsites.net/ab/user/prevalidate-register', info)
      this.respuesta = res.data
      if (this.respuesta.existe) {
        window.dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': 'Pilsen del Sur', // Categoría del evento (String). Requerido.
            'eventAction': 'Inicio Sesión Trivia', // Acción o subcategoría del evento (String).
            'eventLabel': emailhash, // Etiqueta de descripción del evento (String).
            'eventValue': '' // Valor o peso (importancia) del evento (String).
          });
        this.$route.params.mail = this.inputLogin
        this.$router.push({name: 'Trivia', params: {mail: this.inputLogin, attempts: 3}})
      } else {
        this.$router.push({name: 'Registro'})
      }
    }
  }
}
</script>
