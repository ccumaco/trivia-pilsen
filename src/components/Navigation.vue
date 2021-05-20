<template lang="pug">
  nav.cc-nav
    .inner
      ul.cc-nav__list(:class="{ 'menuOpen': isOpen}")
        li.cc-nav__list-brand
          router-link(:to="'/'")
            img.cc-nav__brand-logo(alt="Logo Becker" src="../assets/img/logo.png")
        li.cc-nav__action
          button.cc-nav__action-btn(type="button", v-on:click="isOpen = !isOpen")
            span.cc-nav__action-icon
              small(v-if="!isOpen") Abrir Menú
              small(v-else) Cerrar Menú
        li.cc-nav__list-group
          nav.cc-nav__nav
            router-link(:to="'/#como-participar'" v-scroll-to="'#como-participar'" @click.native="toggleMenu")#comoParticipar.cc-nav__list-link Cómo participar
            router-link(:to="'/#tips-consumo-responsable'" v-scroll-to="'#tips-consumo-responsable'" @click.native="toggleMenu")#comoParticipar.cc-nav__list-link Tips de consumo responsable
            router-link(:to="'/ranking'" @click.native="toggleMenu")#rankingPosiciones.cc-nav__list-link Ranking de posiciones
            a.cc-footer__nav-link(href="./documents/Terminos-y-Condiciones-para-BECKER.pdf")#terminosCondiciones.cc-nav__list-link Términos y condiciones
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
