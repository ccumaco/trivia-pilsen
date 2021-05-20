<template lang="pug">
  <div class="cc-404 cc-page">
    header.cc-404__header.cc-header
      h1.cc-title.cc-404__title Ohh
        span.cc-404__lead MIAAAAU
      p.cc-404__txt Pronto podrás enterarte cómo ser parte de la trivia más gatuna
      form.cc-home__form(action="post" v-on:submit.prevent="validarLogin")
        .cc-home__form-control.cc-form-control
          label.cc-form__label(for="login-mail") ingresa tu correo para ingresar
          input.cc-form__input(id="login-mail" type="login-email" placeholder="login" v-model="inputLogin")
        .cc-form__footer
          button.cc-form__btn.cc-btn(type="submit") Ingresar
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
