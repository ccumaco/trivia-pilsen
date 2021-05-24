<template lang="pug">
  .cc-home.cc-page(:class="{ 'cc-home_awards': modalIsOpen}")
    transition(name="fade")
      Loader(v-if="isLoader", :full="true")
    .inner
      .cc-home__grid
        .cc-home__content
          h1.cc-title PARTICIPA EN LA TRIVIA Y PODRÁS GANARTE ¡LA BOTELLA MÁS BRILLANTE DEL MUNDO CON TU NOMBRE!
          .cc-home__wrap
            form.cc-home__form(action="post" v-on:submit.prevent="validateCode")
              .cc-home__form-control.cc-form-control
                label.cc-form__label(for="c-custom") ¿Qué nombre quieres que brille en tu botella?
                input.cc-form__input.cc-form__input_custom(id="c-custom" placeholder="Escribe aquí tu nombre" v-model="message" maxlength="9")
              small.cc-form__small *El máximo de caracteres es entre 8 y 9; y varía de acuerdo al espacio que ocupe tu nombre. **No admitimos malas palabras o palabras que hagan mal uso de la marca. 
              .cc-home__form-control.cc-form-control
                label.cc-form__label(for="c-mail") ingresa tu correo para registrarte
                input.cc-form__input(id="c-mail" type="email" placeholder="mail@tumail.com" v-model="inputUser")
              .cc-form__footer
                button.cc-form__btn.cc-btn(type="submit" :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled") Registrarme
            h2.cc-subtitle Instrucciones para brillar en la trivia
            ol.cc-order-list
              li.cc-order-list__item Habrá preguntas de nuestra mini serie que tendrás que responder, por lo que te recomendamos verla antes <a href="https://www.lacervezamasfina.com/es/home#block-views-block-miniseries-home" target="_blank" class="cc-txt_highlight cc-home-link">Aquí. Ver "Hechos Para Brillar".</a>
              li.cc-order-list__item La trivia tiene una cuenta regresiva, así que contesta lo más rápido posible. Si entras en el ranking semanal podrás ganar tu botella personalizada, entre otros premios.
              li.cc-order-list__item Por cada respuesta equivocada quitaremos 30 segundos a tu cuenta regresiva.
              li.cc-order-list__item Ya que hayas respondido, podrás ver tu resultado y revisar en qué lugar quedaste.
            button.cc-txt_highlight(type="button" v-on:click="modalIsOpen = !modalIsOpen") VER LA LISTA DE PREMIOS
        .cc-home__bottle
          p.cc-home__bottle-custom {{ message }}
    transition(name='fade')
      .cc-modal-code(v-if='continuePlay == false')
        .cc-modal-code__card
          p.cc-modal-code__title Lo sentimos
          p.cc-modal-code__txt Ya has has llegado a tu límite de tres oportunidades permitidas. 
          button.cc-form__btn.cc-btn(type="button" @click="continuePlay=true") Aceptar
    transition(name='fade')
      .cc-awards(v-if='modalIsOpen')
        h3.cc-awards__title PREMIOS
        button(type="button" v-on:click="modalIsOpen = !modalIsOpen").cc-awards__btn-close.i-close
          span cerrar
        .cc-awards__slider
          carousel(:perPage="1", :centerMode="true", :navigationEnabled="false", :paginationEnabled="true" :paginationColor="'#efefef'")
            slide.cc-awards-slider__item.VueCarousel-slide-active(v-for="award in allAwards" v-bind:key="award.id")
              p.cc-awards__subtitle {{ award.name }} LUGAR
              ul.cc-awards__list
                li.cc-awards__list-item(v-for="(listAwards, index) in award.list") {{ listAwards.title }}
          img.cc-awards__img(src="../assets/img/awards-modal.svg")

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
      invalidCode: false,
      isLoader: false,
      message: 'Escríbeme',
      continuePlay: true,
      isDisabled: true,
      allAwards: [
        {
          name: '1ER',
          list: [
            {
              title: 'Botellas Corona Extra 355 ml personalizadas',
            },
            {
              title: 'Mesa de centro Corona',
            },
            {
              title: 'Luminoso Corona',
            },
            {
              title: 'Juego de 4 vasos Corona y un Destapador',
            },
            {
              title: 'Cubeta para 12 cervezas',
            },
            {
              title: 'Hielera'
            }
          ]
        },
        {
          name: '2DO',
          list: [
            {
              title: 'Botellas Corona Extra 355 ml personalizadas'
            },
            {
              title: 'Mesa de centro Corona'
            },
            {
              title:'Luminoso Corona'
            },
            {
              title:'Juego de 4 vasos Corona y un Destapador'
            },
            {
              title:'Cubeta para 12 cervezas'
            }
          ]
        },
        {
          name: '3ER',
          list: [
            {
              title: 'Botellas Corona Extra 355 ml personalizadas'
            },
            {
              title: 'Luminoso Corona'
            },
            {
              title: 'Juego de 4 vasos Corona y un Destapador'
            },
            {
              title: 'Cubeta para 12 cervezas'
            },

          ]
        },
        {
          name: '4TO',
          list: [
            {
              title: 'Botellas Corona Extra 355 ml personalizadas'
            },
            {
              title: 'Juego de 4 vasos Corona y un Destapador'
            },
            {
              title: 'Placa Corona'
            },
            {
              title: 'Cubeta para 12 cervezas'
            }
          ]
        },
        {
          name: '5TO',
          list: [
              {
                title: 'Botellas Corona Extra 355 ml personalizadas'
              },
              {
                title: 'Juego de 4 vasos Corona y un Destapador'
              },
              {
                title: 'Cubeta para 12 cervezas'
              }
          ]
        }
      ]
    }
  },
  watch: {
    isLoader: function () {
    },
    message: function() {
      this.btnDisable()
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
      if((!this.message == '') && (!this.inputUser == '')) {
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
      this.isLoader = true
      let self = this
      const info = {
        bottle_name: self.message,
        username: self.inputUser,
      };
      axios({
        method: "post",
        url: "https://dev-pilsendelsur.pantheonsite.io/ab/challenge/validate?_format=json",
        data: info,
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.output = response.data
        if(self.output.valid_bottle_name) {
          if (self.output.user.user_exists) {
            if(self.output.user.continue) {
              self.continuePlay = true
              console.log(self.output)
              self.$router.push({name: 'Trivia', params: { user:this.inputUser, bottle_name:this.message, attepmts: self.output.user.attempts}})
            } else {
              self.continuePlay = false
            }
          } else {
            self.$router.push({name: 'Registro', params: { mail:this.inputUser, user:this.inputUser, bottle_name:this.message}})
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
