<template lang="pug">
  <div class="cc-without-time cc-page">
    .layout-general
      h1.cc-without-time__title Nooo, se te acabó el tiempo, pero…
      .cc-without-time__content
        p.cc-without-time__txt Puedes volver a intentarlo. Recuerda que solo tienes 5 minutos para completar la trivia.
        p.cc-without-time__txt_big ¿Estás listo?
        button.cc-btn(@click="redirectAgain()") Intentar de nuevo
        p.cc-without-time__txt_big O puedes
        router-link.cc-btn(to="/") Ir al inicio
  </div>
</template>

<script>

export default {
  name: 'WithoutTime',
  data () {
    return {
      userAttempts: 0,
    }
  },
  methods: {
    redirectAgain() {
      this.$router.push({name: 'Trivia', params: {mail: this.$route.params.mail, attempts: this.$route.params.attempts}})
    }
  }
}
</script>
