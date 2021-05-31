<template lang="pug">
  .cc-home.cc-page(:class="{ 'cc-home_awards': modalIsOpen}")
    //- transition(name="fade")
    //-   Loader(v-if="isLoader", :full="true")
    .cc-home__hero#como-participar
      .container-first
        h1(style="display:none") Cerveza pilsen del sur
        h2.title-card Participa en nuestra Trivia y gana un <b>MEET & GREET </b> con Ivan Morales y Maxi Falcón
        //- p.text-card Lata edición especial - 30 años copa libertadores
        router-link(to="/registro").register-here COMENZAR TRIVIA
        h3.how-participate ¿Cómo participar?
        .first-step <div>1</div> <p>Estudia estos tips sobre Pilsen del Sur</p>
        .second-step <div>2</div> <p>Regístrate y juega<br> <span>*Una vez al día</span></p> 
        .tertiary-step <div>3</div> <p>Gana</p>
      .contain-img
        //- .container-secont
        .container-tertiary.players
          img(src="./../assets/img/pilsen/jugadores.png", alt="colo-colo pilsen del sur")
      transition(name='fade')
        .cc-modal-code(v-if='!continuePlay')
          .cc-modal-code__card
            p.cc-modal-code__title Ya ganaste no puedes seguir participando.
    section.cc-home__learn#tips-consumo-responsable
      .inner
        //- header.cc-home__learn-header
        //-   h3.cc-title-section Qué es el consumo responsable
        //-   p.cc-text Una serie de acciones que hacen los humanes adultos para cuidar su cuerpa
        //-   p.cc-text.cc-text_bold <strong>Conoce todos los tips de consumo responsable que tenemos para ti y participa en nuestra TRIVIA BECKER. Si no ganaste un día, puedes seguir participando. ¡Así que no bajes las patas! </strong>
        //-   h3.cc-title-section.cc-title-section_final Tips de consumo responsable
        .cc-learn__slider
          carousel(:perPage="1", :centerMode="true", :autoplay="true" :autoplayTimeout="15000" :navigationEnabled="true", :paginationEnabled="false" :paginationColor="'#efefef'")
            slide.cc-learn__slider__item.VueCarousel-slide-active
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 1 de 10
                p.cc-learn__slider-txt Hacer una buena cerveza lleva tiempo,así como a ti te ha llevado tiempo poder reconocer lo verdaderamente importante
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 2 de 10
                p.cc-learn__slider-txt Tiene un mayor tiempo de maduración en su elaboración, el cual le otorga un cuerpo y sabor únicos, <br> superior a otras cervezas del mercado
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 3 de 10
                p.cc-learn__slider-txt Pilsen del Sur es una cerveza elaborada con 6 lúpulos distintos, los cuales le dan el aroma y amargor justo
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 4 de 10
                p.cc-learn__slider-txt Debido a la malta y su tostado especial, se puede observar su increíble color dorado al servirla.
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 5 de 10
                p.cc-learn__slider-txt Para aquellos amantes de las cervezas de alta calidad, Pilsen del Sur es una cerveza que fermenta a bajas temperaturas.
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 6 de 10
                p.cc-learn__slider-txt Pilsen del Sur es ligera y con una rica espuma, esto hace que sea una cerveza tipo lager, hecha a partir de sólo materias primas seleccionadas y 100% malta de cebada
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 7 de 10
                p.cc-learn__slider-txt  Sabemos que quedar en la historia toma tiempo, al igual que elaborar un Pilsen del Sur.
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 8 de 10
                p.cc-learn__slider-txt Desde el 2021 nace la unión entre Pilsen del Sur y Colo Colo, un equipo con tradición y fiel representante del corazón chileno
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 9 de 10
                p.cc-learn__slider-txt Pilsen del Sur realizó el lanzamiento de una lata edición especial Campeones de América homenajeando a esa generación del 91 que supo darle alegría a un país entero.
            slide.cc-learn__slider__item
              .cc-learn__slider-content
                p.cc-learn__slider-txt.tip Tip 10 de 10
                p.cc-learn__slider-txt Pilsen del Sur Edición especial campeones de América siente los colores y a su hinchada así como también homenajea  el cumpleaños N° 30 de la Copa Libertadores.

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
        url: "https://test-pilsendelsur.pantheonsite.io/ab/challenge/validate?_format=json",
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
              self.$router.push({name: 'Trivia', params: { mail:this.inputUser, attepmts: self.output.user.attempts}})
            } else {
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
