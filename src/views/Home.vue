<template lang="pug">
  .cc-home.cc-page(:class="{ 'cc-home_awards': modalIsOpen}")
    transition(name="fade")
      Loader(v-if="isLoader", :full="true")
    .cc-home__hero#como-participar
      .cc-hero__grid
        header.cc-home__header
          h1.cc-title <strong class="cc-title_big">Participa en nuestra Trivia Becker</strong> y GANA UNO DE LOS PREMIOS DIARIOS POR $10.000 EN <span class="cc-title__logo">Pedidos ya</span>
          form.cc-home__form(action="post" v-on:submit.prevent="validateCode")
            .cc-home__form-control.cc-form-control
              label.cc-form__label(for="c-mail") ingresa tu correo para registrarte
              input.cc-form__input(id="c-mail" type="email" placeholder="mail@tumail.com" v-model="inputUser")
            .cc-form__footer
              button.cc-form__btn.cc-btn(type="submit" :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled") Ingresar
        .cc-hero__steps
          h2.cc-subtitle ¿Cómo participar?
          ol.cc-hero__list
            li.cc-hero__list-item Conoce todos los <a v-scroll-to="'#tips-consumo-responsable'">Tips de Consumo responsable</a>
            li.cc-hero__list-item Ingresa tus datos
            li.cc-hero__list-item Participa en nuestra Becker Trivia. Si eres el primero en el ranking al terminar el día, te llevas el premio! 
      transition(name='fade')
        .cc-modal-code(v-if='!continuePlay')
          .cc-modal-code__card
            p.cc-modal-code__title Ya ganaste no puedes seguir participando.
    section.cc-home__learn#tips-consumo-responsable
      .inner
        header.cc-home__learn-header
          h3.cc-title-section Qué es el consumo responsable
          p.cc-text Una serie de acciones que hacen los humanes adultos para cuidar su cuerpa
          p.cc-text.cc-text_bold <strong>Conoce todos los tips de consumo responsable que tenemos para ti y participa en nuestra TRIVIA BECKER. Si no ganaste un día, puedes seguir participando. ¡Así que no bajes las patas! </strong>
          h3.cc-title-section.cc-title-section_final Tips de consumo responsable
        .cc-learn__slider
          carousel(:perPage="1", :centerMode="true", :autoplay="true" :autoplayTimeout="15000" :navigationEnabled="true", :paginationEnabled="false" :paginationColor="'#efefef'")
            slide.cc-learn__slider__item.VueCarousel-slide-active
              .cc-learn__slider-content
                h4.cc-learn__slider-title 1. SI ANDAS CON SED, DESTÁPATE UNA BECKER! PERO ACUÉRDATE QUE ES UNA CHELITA, CADA UNA HORA.
                p.cc-learn__slider-txt Disfrútalas bien heladitas, pero anda tomando tranqui, onda piola, pa vacilarla bien y pasarlo bonito. 
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-0.png")
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                h4.cc-learn__slider-title 2. NUNCA DEBES TOMAR SI VAS CON LAS GARRITAS AL VOLANTE.
                p.cc-learn__slider-txt Nunca lo que es nunca. Ni se te ocurra. Te vay de paipe si se te vuelve a pasar por la cabeza esa mala idea. Ni aunque te destapen la lata y te la quieran dar en la boca ¿Nunca nunca ya?
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-1.png")
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                h4.cc-learn__slider-title 3. DILE A LOS CABR@S QUE SI TOMAN, TIENEN QUE PASAR LAS LLAVES.
                p.cc-learn__slider-txt Y si alguno te quiere pasar gato por liebre diciéndote que está sobrio, que está nítido, que solo le dio besitos al pack, ¡vuelve a insistirle que no puede hacerlo!
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-2.png")
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                h4.cc-learn__slider-title 4. SI VAS A TOMAR, A COMER SE HA DICHO ¡Y ERA!
                p.cc-learn__slider-txt No andemos con cosas de gato flaco. Hay que hacerle a la alimentashion cuando nos destapamos una Becker. ¡Guatita llena cora contento!
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-3.png")
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                h4.cc-learn__slider-title 5. NICA APAÑES A COMPETENCIAS DE TOMAR Y MENOS AL SECO.
                p.cc-learn__slider-txt Disfruta tranquilamente tu Becker, echao de pana, vacilando los hits que están pegando. Nadie te apura, al contrario, si tomas  relajao le vas a sentir los lúpulos.
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-4.png")
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                h4.cc-learn__slider-title 6. ES MUY IMPORTANTE QUE TOMES UNOS VASITOS DE AGUA.
                p.cc-learn__slider-txt Si te estás bajando un pack u otro copete, ponte modo orilla de playa, ¡pero pah tomar agua! Si lo haces, es mucho menos probable que despiertes con esa sed maldita.
              picture.cc-learn__slider-picture
                img.cc-learn__slider-img(src="../assets/img/slider-5.png")

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
      modalIsOpen: false,
      inputUser: '',
      isLoader: false,
      continuePlay: true,
      isDisabled: true,
    }
  },
  watch: {
    isLoader: function () {
    },
    inputUser: function() {
      this.btnDisable()
    },
  },
  created () {
    document.querySelector("body").classList.remove("cc-body-agegate");
  },
  methods: {
    btnDisable() {
      if((!this.inputUser == '')) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
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
      // this.$router.push({name: 'Registro'})
      this.isLoader = true
      let self = this
      const info = {
        username: self.inputUser,
      };
      axios({
        method: "post",
        url: "https://api.trivia-becker.cl/ab/challenge/validate?_format=json",
        data: info,
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.output = response.data
        window.dataLayer.push({
          'event': 'trackEvent',
          'eventCategory': 'Registro mail', // Categoría del evento (String). Requerido.
          'eventAction': 'Clic', // Acción o subcategoría del evento (String).
          'eventLabel': 'Ingresar', // Etiqueta de descripción del evento (String).
          'eventValue': '' // Valor o peso (importancia) del evento (String).
        });
          if (self.output.user.user_exists) {
            if(self.output.user.continue) {
              self.continuePlay = true
              console.log(self.output)
              self.$router.push({name: 'Trivia', params: { mail:this.inputUser, attepmts: self.output.user.attempts}})
            } else {
              console.log("continuePlay false")
              self.continuePlay = false
            }
          } else {
            self.$router.push({name: 'Registro', params: { mail:this.inputUser}})
          }
        
        self.isLoader = false
      }, (error) => {
        console.log(error);
      });
    }
  }
}
</script>
