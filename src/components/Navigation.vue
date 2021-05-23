<template lang="pug">
  .container-all( :class="isOpen == true ? 'menu-open' : '.container-all'")
    .cc-nav
      .container-logo-header
        img(src="./../assets/img/pilsen/logo-blanco.png", alt="alt")
      .icon-mobile(v-if="isOpen == false" @click="isOpen = !isOpen")
        img(src="./../assets/img/pilsen/icon-menu.png", alt="icon mobile")
      .icon-mobile(v-else @click="isOpen = !isOpen") X
      ul
        li.list-liks <router-link to="/"> HOME </router-link>
        li.list-liks( @click="drawer = !drawer") CONSURSO
      ul
        li.links-rs <a href="#"><i class="fab fa-instagram"></i></a>
        li.links-rs <a href="#"><i class="fab fa-twitter"></i></a>
        li.links-rs <a href="#"><i class="fab fa-facebook-f"></i></a>
        li.links-rs <a href="#"><i class="fab fa-youtube"></i></a>
      .btn-register
        button <router-link to="/registro"> REGISTRO</router-link>
    .menu-desktop(v-if="drawer")
      h2 CONCURSOS
      .container-menu-dektop
        ul(v-if="true")
          li.lista TRIVIA PILSEN DEL SUR
          li.lista CONCURSO - SKOL
          li.lista NOMINA UN BACÁN
        ul(v-if="true")
          li.lista CÓMO PARTICIPAR
          li.lista RANKING DE POSICIONES
          li.lista BASES Y CONDICIONES DE LA TRIVIA
        .container-card(v-if="true")
          img(src="./../assets/img/pilsen/product-header.png", alt="alt")
          .container-text
            p Participa en nuestra Trivia y gana un MEET & GREET con Ivan Morales y Maxi Falcón
            p Lata edición especial - 30 años copa libertadores 
            button(@click="isOpen = !isOpen") PARTICIPAR
    .menu-lateral(v-if="isOpen")
      ul
        li.list-mobile(@click="isOpen = !isOpen") <router-link to="/"> HOME</router-link>
        li.list-mobile(@click="trivia = !trivia") CONCURSOS
        li.list-mobile(v-if="trivia == true" @click="showConcurso = !showConcurso") TRIVIA PILSEN DEL SUR
        li.list-mobile.card-product(v-if="showConcurso")
          img(src="./../assets/img/pilsen/product-header.png", alt="alt")
          .container-text
            p Participa en nuestra Trivia y gana un MEET & GREET con Ivan Morales y Maxi Falcón
            p Lata edición especial - 30 años copa libertadores 
            button(@click="isOpen = !isOpen") PARTICIPAR
        ul.new-list(v-if="showConcurso")
          li.lista-none(@click="isOpen = !isOpen") <router-link to="/registro"> CÓMO PARTICIPAR </router-link>
          li.lista-none(@click="isOpen = !isOpen") <router-link to="/ranking"> RANKING DE POSICIONES </router-link>
          li.lista-none(@click="isOpen = !isOpen") <router-link to="/registro"> BASES Y CONDICIONES DE LA TRIVIA </router-link>
      .container-footer
        ul
          li.footer-mobile-rs Follow us
          li.footer-mobile-rs(@click="isOpen = !isOpen") <a href="#"><i class="fab fa-instagram"></i></a>
          li.footer-mobile-rs(@click="isOpen = !isOpen") <a href="#"><i class="fab fa-twitter"></i></a>
          li.footer-mobile-rs(@click="isOpen = !isOpen") <a href="#"><i class="fab fa-facebook-f"></i></a>
          li.footer-mobile-rs(@click="isOpen = !isOpen") <a href="#"><i class="fab fa-youtube"></i></a>
      
</template>

<script>

export default {
  name: 'Navigation',
  data () {
    return {
      isActive: false,
      isOpen: false,
      trivia: false,
      showConcurso: false,
      drawer: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
