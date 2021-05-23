<template lang="pug">
  <div class="cc-login cc-page">
    .container-login
      header.cc-login__header
        h1.cc-login__title-login Iniciar Sesion
        form.cc-home__form-login(action="post" v-on:submit.prevent="validarLogin")
          .cc-home__form-control-login
            label.cc-form__label-login(for="login-mail") E-mail
            input.cc-form__input-login(id="login-mail" type="login-email" placeholder="Ingresa tu Correo electrónico" v-model="inputLogin")
          .cc-form__footer-login
            button.cc-form__login(type="submit") Iniciar sesión
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      inputLogin: ''
    }
  },
  methods: {
    validarLogin() {
      if (this.inputLogin == "dpxmTriviaBecker") {
        localStorage.ingresar = true
        this.$router.push({name: 'Home', params: { login:true}})
      } else {
        console.log("login incorrecto")
      }
    }
  }
}
</script>
