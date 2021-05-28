<template lang="pug">
  .container-all( :class="isOpen == true ? 'menu-open' : '.container-all'" id="header-id")
    .cc-nav
      .container-logo-header
        router-link(to="/")
          img(src="./../assets/img/pilsen/logo-blanco.svg", alt="Pilsen del sur" @click="drawer = false")
      .icon-mobile(v-if="isOpen == false" @click="isOpen = !isOpen")
        img(src="./../assets/img/pilsen/icon-menu.png", alt="icon mobile")
      .icon-mobile(v-else @click="isOpen = !isOpen") X
      ul.ul-izquierda
        li.list-liks <router-link to="/"> HOME </router-link>
        li.list-liks( @click="drawer = !drawer") CONCURSO
      ul.ul-derecha
        li.links-rs <a href="https://www.instagram.com/pilsendelsur/"><i class="fab fa-instagram"></i></a>
        li.links-rs <a href="https://mobile.twitter.com/pilsendelsurcl?lang=en"><i class="fab fa-twitter"></i></a>
        li.links-rs <a href="https://www.facebook.com/Pilsendelsur"><i class="fab fa-facebook-f"></i></a>
        li.links-rs <a href="https://www.youtube.com/channel/UC61vjd4wvg0BUr77G7ygo5Q"><i class="fab fa-youtube"></i></a>
      .btn-register
        button( @click="drawer = false") <router-link to="/home"> REGISTRO</router-link>
    .menu-desktop(v-if="drawer")
      h2 CONCURSOS
      p( @click="drawer = !drawer") X
      .container-menu-dektop
        ul(v-if="drawer")
          li.lista(@click="module2 = !module2;") TRIVIA PILSEN DEL SUR
          //- li.lista <router-link to="/trivia">CONCURSO - SKOL</router-link>
          //- li.lista NOMINA UN BACÁN
        ul(v-if="module2")
          li.lista(@click="module3 = !module3") CÓMO PARTICIPAR
          li.lista( @click="drawer = !drawer") <router-link to="/ranking"> RANKING DE POSICIONES </router-link>
          li.lista(@click="drawer = !drawer") <router-link to="/bases">BASES Y CONDICIONES DE LA TRIVIA</router-link>
        .container-card(v-if="module3 && module2")
          img(src="./../assets/img/pilsen/product-header.png", alt="alt")
          .container-text
            p Participa en nuestra Trivia y gana un MEET & GREET con Ivan Morales y Maxi Falcón
            p.text Lata edición especial - 30 años copa libertadores 
            button(@click="isOpen = !isOpen;  drawer = !drawer") <router-link to="/home"> PARTICIPAR</router-link>
    .menu-lateral(v-if="isOpen")
      ul
        li.list-mobile(@click="isOpen = !isOpen") <router-link to="/home"> HOME</router-link>
        li.list-mobile(@click="trivia = !trivia") CONCURSOS
        li.list-mobile(v-if="trivia == true" @click="showConcurso = !showConcurso") TRIVIA PILSEN DEL SUR
        li.list-mobile.card-product(v-if="showConcurso")
          img(src="./../assets/img/pilsen/product-header.png", alt="alt")
          .container-text
            p Participa en nuestra Trivia y gana un MEET & GREET con Ivan Morales y Maxi Falcón
            p Lata edición especial - 30 años copa libertadores 
            button(@click="isOpen = !isOpen") <router-link to="/home">PARTICIPAR</router-link>
        ul.new-list(v-if="showConcurso")
          li.lista-none(@click="isOpen = !isOpen") <router-link to="/trivia"> CÓMO PARTICIPAR </router-link>
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
      drawer: false,
      module2: false,
      module3: false
    }
  },
  watch: {
    $route(){
      document.getElementsByClassName('list-liks')[0].setAttribute('style', 'border-bottom: 2px solid transparent')
      document.getElementsByClassName('list-liks')[1].setAttribute('style', 'border-bottom: 2px solid transparent')
      if( this.$route.path == '/'){
        let home = document.getElementsByClassName('list-liks')[0]
        home.setAttribute('style', 'border-bottom: 2px solid #C18E00')
      } else {
        let home = document.getElementsByClassName('list-liks')[1]
        home.setAttribute('style', 'border-bottom: 2px solid #C18E00')
      }
    }
  },
  mounted(){
    // if(this.$route.name == 'AgeGate'){
    //   document.getElementById('header-id').style.display = 'none'
    // } else {
    //   document.getElementById('header-id').style.display = 'block'
    // }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
