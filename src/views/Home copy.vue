<template lang="pug">
  <div class="cc-home cc-page">
    transition(name="fade")
      Loader(v-if="isLoader", :full="true")
    .cc-home__grid
      .cc-home__hero
        picture
          source(srcset='../assets/img/home-hero-desktop.jpg', media='(min-width: 1280px)')
          source(srcset='../assets/img/home-hero-tablet.jpg', media='(min-width: 768px)')
          img.cc-home__hero-img(src="../assets/img/home-hero-mobile.jpg")
      #ingresar-codigo.cc-code
        header.cc-header
          h1.cc-title Disfruta del <strong class="cc-title_strong cc-title_block">HOME OFFICE IDEAL</strong> con <strong class="cc-title_brand">#LaOficinaMásFina</strong>
          img.cc-header__img(src="../assets/img/logo-gaia.svg")
        p.cc-lead Ingresa uno por uno los códigos únicos que recibas al comprar  <strong class="cc-title_strong">CORONA CERO </strong>en <strong class="cc-title_strong">BEERHOUSE</strong> y participa para ganar un set <strong class="cc-title_strong">Home Office Ideal </strong>de <strong class="cc-title_strong">GAIA</strong> 
        form.cc-form(method="post" v-on:submit.prevent="validateCode")
          .cc-form__group
            label.cc-form__label(for="ccMail" ) Correo electrónico
            .cc-form__input-inner
              input.cc-form__input#ccMail(type="email" name="ccMail" placeholder="Ingresa Correo Electrónico" v-model="inputUser")
          .cc-form__group
            label.cc-form__label(for="ccCode") Código
            .cc-form__input-inner
              input.cc-form__input#ccMail(type="text" name="ccCode" placeholder="Ingresa Código" v-model="inputCode")
          button.cc-form__btn.cc-btn(type="submit") ¡Participar!
      transition(name='fade')
        .cc-modal-code(v-if='invalidCode')
          .cc-modal-code__card
            p.cc-modal-code__title Código inválido
            p.cc-modal-code__txt Ingresa un código válido por favor
            button.cc-form__btn.cc-btn(type="button" @click="invalidCode=false") Aceptar
  </div>
</template>

<script>
// @ is an alias to /src

import { Carousel, Slide } from 'vue-carousel';

import Loader from '@/components/Loader.vue'

import axios from "axios";

export default {
  name: 'Home',
  components: {
    Carousel,
    Slide,
    Loader
  },
  data () {
    return {
      isLogged: false,
      output: '',
      inputCode: '',
      inputUser: '',
      invalidCode: false,
      isLoader: false
    }
  },
  watch: {
    isLoader: function () {
      console.log(this.isLoader)
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    document.querySelector("body").classList.remove("cc-body-agegate");
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      var cc_code = document.getElementById("ingresar-codigo");
      var cc_intro = document.getElementById("ganar-home-office");
      var cc_products = document.getElementById("nuestros-productos");
      
      if((window.pageYOffset >= cc_code.offsetTop) && (window.pageYOffset < cc_intro.offsetTop)) {
        document.getElementById("linkCode").classList.add("cc-nav__list-link_active");
        document.getElementById("linkIntro").classList.remove("cc-nav__list-link_active");
      } else {
        document.getElementById("linkCode").classList.remove("cc-nav__list-link_active");
        if((window.pageYOffset >= cc_intro.offsetTop) && (window.pageYOffset <= cc_products.offsetTop)) {
          document.getElementById("linkIntro").classList.add("cc-nav__list-link_active");
          document.getElementById("linkProducts").classList.remove("cc-nav__list-link_active");
        } else {
          document.getElementById("linkIntro").classList.remove("cc-nav__list-link_active");
          if(window.pageYOffset >= cc_products.offsetTop) {
            document.getElementById("linkProducts").classList.add("cc-nav__list-link_active");
          } else {
            document.getElementById("linkProducts").classList.remove("cc-nav__list-link_active");
          }
        }
      }
    },
    redirect () {
      if(!this.isLogged) {
        this.$router.push({name: 'Registro'})
        document.getElementById("linkCode").classList.remove("cc-nav__list-link_active");
        document.getElementById("linkIntro").classList.remove("cc-nav__list-link_active");
        document.getElementById("linkProducts").classList.remove("cc-nav__list-link_active");
      } else {
        this.$router.push({name: 'Trivia'})
      }
    },
    redirectRanking () {
      this.$router.push({name: 'Ranking'})
      document.getElementById("linkCode").classList.remove("cc-nav__list-link_active");
      document.getElementById("linkIntro").classList.remove("cc-nav__list-link_active");
      document.getElementById("linkProducts").classList.remove("cc-nav__list-link_active");
    },
    validateCode() {
      this.isLoader = true
      let self = this
      const info = {
        username: self.inputUser,
        code: self.inputCode,
      };
      axios({
        method: "post",
        url: "https://api.trivia-becker.cl/ab/challenge/validate?_format=json",
        data: info,
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.output = response.data
        if(self.output.valid_code) {
          if (self.output.user.user_exists) {
            self.$router.push({name: 'Trivia', params: { user:this.inputUser, code:this.inputCode}})
          } else {
            self.$router.push({name: 'Registro', params: { mail:this.inputUser, user:this.inputUser, code:this.inputCode}})
          }
        } else {
          self.invalidCode = true
        }
        self.isLoader = false
      }, (error) => {
        console.log(error);
      });
    }
  }
}
</script>
