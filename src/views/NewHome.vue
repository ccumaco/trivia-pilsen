<template lang="pug">
  .cc-home.cc-page(:class="{ 'cc-home_awards': modalIsOpen}")
    transition(name="fade")
      Loader(v-if="isLoader", :full="true")
      h1(style="display:none") Cerveza pilsen del sur
    .cc-home__hero#como-participar
      .container-first.participa2
        h2.title-card.concurso ¡CONCURSO!
        h2.title-card Participa en nuestra Trivia y gana un <b>MEET & GREET </b> con Ivan Morales y Maxi Falcón
        p.text-card Lata edición especial - <br>30 años Campeones de America
        router-link(to="/home").register-here.participa PARTICIPA AQUÍ
        
      .contain-img
        //- .container-secont
        .container-tertiary
          img(src="./../assets/img/pilsen/jugadores.jpg", alt="colo-colo pilsen del sur")
      transition(name='fade')
        .cc-modal-code(v-if='!continuePlay')
          .cc-modal-code__card
            p.cc-modal-code__title Ya ganaste no puedes seguir participando.
    .container-bottle
      .container
        .do-you-want
          .width-bottle
            ul
              li(v-for="(item, index) of tamaños" :key="index" @click="nextImg(index)" class="lista-bold") {{item}}
              li.btn-before-img
                img(src="./../assets/img/pilsen/come-back.png", alt="alt" @click="nextImg(-1)")
          .bottle
            img(:src="imagen[indexImage].src", :alt="imagen[indexImage].altImagen")
        .text-bottle
          h2 {{imagen[indexImage].titleBottle}} <br> <span>{{imagen[indexImage].tamaño}}</span>
          p {{imagen[indexImage].textBottle}}
          p {{imagen[indexImage].textBottle2}}
      .show-here
        a(href="https://www.casadelacerveza.cl/pack-24-pds-campeones-de-america/p" target="_blank")
          button.show-btn COMPRAR AQUÍ
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
      indexImage:0,
      isLogged: false,
      output: '',
      modalIsOpen: false,
      inputUser: '',
      isLoader: false,
      continuePlay: true,
      isDisabled: true,
      tamaños:['300 ml', '473 ml', '354 ml'],
      imagen: [
        {
          src: require('./../assets/img/pilsen/bottle1.png'),
          altImagen: 'Botella pilsen del sur 300 ML',
          titleBottle: 'nuestros productos',
          tamaño: '300 ml',
          textBottle: 'Pilsen del Sur se caracteriza por su mayor tiempo de maduración, el cual le da una cuerpo y sabor único.',
          textBottle2: 'Es una cerveza tipo larger 100% malta, hecha con ingredientes finamente seleccionados y 6 lúpulos diferentes.'
        },
        {
          src: require('./../assets/img/pilsen/bottle2.png'),
          altImagen: 'Lata pilsen de sur 473ml',
          titleBottle: 'nuestros productos',
          tamaño:'473 ml',
          textBottle: 'Pilsen del Sur se caracteriza por su mayor tiempo de maduración, el cual le da una cuerpo y sabor único.',
          textBottle2: 'Es una cerveza tipo larger 100% malta, hecha con ingredientes finamente seleccionados y 6 lúpulos diferentes.'
          },
        {
          src: require('./../assets/img/pilsen/bottle3.png'),
          altImagen: 'Lata pilsen de sur 354ml',
          titleBottle: 'nuestros productos',
          tamaño:'354 ml',
          textBottle: 'Pilsen del Sur se caracteriza por su mayor tiempo de maduración, el cual le da una cuerpo y sabor único.',
          textBottle2: 'Es una cerveza tipo larger 100% malta, hecha con ingredientes finamente seleccionados y 6 lúpulos diferentes.'
          }
        ],
    }
  },
  watch: {
    isLoader: function () {
    },
    inputUser: function() {
      this.btnDisable()
    },
  },
  computed: {
    mostrarFuncion(){
      let img = this.imagen[0]
      return img
    },
  },
  created () {
    document.querySelector("body").classList.remove("cc-body-agegate");
  },
  mounted(){
    window.scroll(0,0)
    let elemento = document.getElementsByClassName('lista-bold')[0]
    elemento.setAttribute('style', 'font-weight: bold;');
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
    nextImg(param){
      let elemento = document.getElementsByClassName('lista-bold')[this.indexImage]
      elemento.setAttribute('style', 'font-weight: normal;');
      if (param == -1 ) {
        this.indexImage = this.indexImage + 1
        if(this.indexImage == 3){
          this.indexImage = 0
          let elemento = document.getElementsByClassName('lista-bold')[this.indexImage]
          elemento.setAttribute('style', 'font-weight: bold;');
        }
        let elemento = document.getElementsByClassName('lista-bold')[this.indexImage]
        elemento.setAttribute('style', 'font-weight: bold;');
      } else {
        let elemento = document.getElementsByClassName('lista-bold')[param]
        elemento.setAttribute('style', 'font-weight: bold;');
        this.indexImage = param
      }
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
        url: "https://triviareplicas.azurewebsites.net/ab/challenge/validate?_format=json",
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
