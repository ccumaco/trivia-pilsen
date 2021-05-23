<template lang="pug">
  nav.cc-nav
    .container-logo-header
      img(src="./../assets/img/pilsen/logo-blanco.png", alt="alt")
    ul
      li.list-liks <router-link to="/"> HOME </router-link>
      li.list-liks
        select(name="CONCURSO") CONSURSO
          option(value="Concurso1") CONCURSO
          option(value="Concurso2") concurso2
          option(value="Concurso3") concurso3
          option(value="Concurso4") concurso4
      li.list-liks <router-link to="/producto">PRODUCTO </router-link>
      li.list-liks
        select COPA AMERICA
          option(value="Copa america1") COPA AMERICA
          option(value="Copa america2") Copa america2
          option(value="copa america3") copa america3
          option(value="Copa america4") Copa america4
    ul
      li.links-rs <a href="#"><i class="fab fa-instagram"></i></a>
      li.links-rs <a href="#"><i class="fab fa-twitter"></i></a>
      li.links-rs <a href="#"><i class="fab fa-facebook-f"></i></a>
      li.links-rs <a href="#"><i class="fab fa-youtube"></i></a>
    .btn-register
      button <router-link to="/registro"> REGISTRO</router-link>
</template>

<script>

export default {
  name: 'Navigation',
  data () {
    return {
      isActive: false,
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
