<template lang="pug">
  <div class="cc-registro">
    .container-register
      .cc-registro__grid
        header.cc-header
          h1.cc-title Si ya estás registrado
        .cc-registro__cta
          router-link.cc-btn.cc-btn_secondary.i-arrow-after(:to="'/login'") INICIAR SESIÓN
      .line-style
      p.parrafor Ingresa  tus datos personales <br> para participar en la trivia
      form.cc-form.cc-form__grid(action="/trivia" method="get")
        .cc-form__group
          label.cc-form__label(for="ccName") Nombres <sup>*</sup>
          .cc-form__input-inner
            input.cc-form__input#ccName(type="text" name="ccName" placeholder="Ingresa solo tu nombre" v-model="names")
        .cc-form__group
          label.cc-form__label(for="ccLastName") Apellidos <sup>*</sup>
          .cc-form__input-inner
            input.cc-form__input#ccLastName(type="text" name="ccLastName" placeholder="Ingresa tu apellido" v-model="lastName")
        .cc-form__group
          label.cc-form__label(for="ccGender") Género <sup>*</sup> 
          .cc-form__input-inner.i-select
            select.cc-form__input.cc-form__input_select#ccGender(v-model="gender")
              option(selected disabled value="" hidden) Escoje tu género
              option(v-if="genders!==undefined" v-for="item in genders" :value="item.id") {{ item.name }}
        .cc-form__group
          label.cc-form__label(for="ccEmail") Tu mail <sup>*</sup>
          .cc-form__input-inner
            input.cc-form__input#ccEmail(type="email" name="ccEmail" placeholder="Ingresa correo electrónico" v-model="ccemail" value="ccemail")
            .cc-form__group
          p.cc-form__label Ingresa tu fecha de Nacimiento 
          //- <sup>*</sup>
          .cc-form__group_grid
            .cc-form__group
              .cc-form__input-inner.i-select
                select.cc-form__input.cc-form__input_select#ccDateDay(v-model="birthMonth")
                  option(selected disabled value="" hidden) DD
                  option(v-for="(item, key) in months" :value="key") {{ item }}
            .cc-form__group
              .cc-form__input-inner
                input.cc-form__input#ccDateDay(type="number" name="ccDay" maxlength="2" min="1" max="31" placeholder="DD" v-model="birthDay")
            .cc-form__group
              .cc-form__input-inner
                input.cc-form__input#ccLastYear(type="number" name="ccYear" maxlength="4" min="1900" max="2002" placeholder="AAAA" v-model="birthYear")
        //- .cc-form__group
        //-   label.cc-form__label(for="ccPhone") Número de teléfono <sup>*</sup>
        //-   .cc-form__input-inner
        //-     input.cc-form__input#ccPhone(type="text" name="ccPhone" maxlength="10" placeholder="000 000 0000" v-model="phone")
        //- .cc-form__group
        //-   label.cc-form__label(for="ccCity") Ciudad <sup>*</sup>
        //-   .cc-form__input-inner.i-select
        //-     select.cc-form__input.cc-form__input_select#ccCity(v-model="city")
        //-       option(selected disabled value="" hidden) Selecciona ciudad
        //-       option(v-if="cities!==undefined" v-for="item in cities" :value="item.id") {{ item.name }}
        .cc-form__footer
          .cc-form__terms
            .cc-form__terms-item
              input.cc-form__input-check(type="checkbox" id='ccTerms' v-model="terms")
              label.cc-form__label.cc-form__label_check.i-check(
                for='ccTerms') He leído y aceptado 
                  a(href="./documents/Terminos-y-Condiciones-para-BECKER.pdf" target="_blank") términos y condiciones y  <a href="./documents/Politicas-de-Privacidad-Landing-BECKER.pdf" target="_blank"> política de protección de datos personales</a>
            .cc-form__terms-item
              input.cc-form__input-check(type="checkbox" id='ccMrk' v-model="mrk")
              label.cc-form__label.cc-form__label_check.i-check(
                for='ccMrk') Deseo recibir información comercial de Pilsen del Sur
            label
          button.cc-form__btn.cc-btn.cc-btn_secondary.i-arrow-after(type="button" @click="createUser()") Siguiente
      transition(name='fade')
        .cc-modal-code(v-if='invalidCode')
          .cc-modal-code__card
            p.cc-modal-code__title Todos los dátos son requeridos
            p.cc-modal-code__txt Ingresa todos los datos, por favor
            button.cc-form__btn.cc-btn(type="button" @click="invalidCode=false") Aceptar
      transition(name="fade")
        Loader(v-if="isLoader", :full="true")
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import axios from "axios";

export default {
  name: 'Registro',
   components: {
    Loader
  },
  data () {
    return {
      names: '',
      lastName: '',
      birth: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      months: {
        1: 'ENE',
        2: 'FEB',
        3: 'MAR',
        4: 'ABR',
        5: 'MAY',
        6: 'JUN',
        7: 'JUL',
        8: 'AGO',
        9: 'SEP',
        10: 'OCT',
        11: 'NOV',
        12: 'DIC'
      },
      genders: [{name:'Hombre', id:5},{name:'Mujer', id: 6},{name:'prefiero no decir', id: 7}],
      gender: '',
      city: '',
      phone: '',
      terms: '',
      mrk: '',
      notErrors: true,
      isLogged: false,
      cities: {},
      selectedEmail: '',
      ccemail: '',
      output: '',
      isLoader: false,
      invalidCode: false,
      td: '',
      isDisabled: true,
      fechaActualDay: '',
      fechaActualMonth: '',
      fechaActualYear: '',
    }
  },
  created () {
    var vm = this
    axios.get("https://dev-pilsendelsur.pantheonsite.io/ab/city").then((response) => {
      vm.cities = response.data;
    })
    axios.get("https://dev-pilsendelsur.pantheonsite.io/ab/gender").then((response) => {
      vm.genders = response.data;
    })
    this.ccemail = this.$route.params.mail

    var f = new Date();
    this.fechaActualDay = f.getDate()
    this.fechaActualMonth = f.getMonth() + 1
    this.fechaActualYear = f.getFullYear()
  },
  methods: {
    redirect () {
      if(this.notErrors) {
        this.$router.push({name: 'Trivia'})
      }
    },
    createUser() {
      let self = this
      if(!(self.names == '') && !(self.lastName == '') && !(self.birthYear == '') && !(self.birthMonth == '') && !(self.birthDay == '') && !(self.gender == '') &&  (self.terms)) {
        this.getCookie('_td')
        self.isLoader = false
        const info = {
          name: self.names,
          last_name: self.lastName,
          birth: this.birthYear + '-' + this.birthMonth + '-' + this.birthDay,
          id_gender: this.gender,
          // id_city: this.city,
          mail: this.ccemail,
          // phone: this.phone,
          terms_acceptance: this.terms,
          allow_ads: this.mrk,
          td: this.td
        };
        axios({
          method: "post",
          url: "https://dev-pilsendelsur.pantheonsite.io/ab/user/register?_format=json",
          data: info,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          console.log(info)+"esta es la info";
          self.output = response.data
          window.dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': 'Registro', // Categoría del evento (String). Requerido.
            'eventAction': 'Clic', // Acción o subcategoría del evento (String).
            'eventLabel': 'Quiero ganar', // Etiqueta de descripción del evento (String).
            'eventValue': '' // Valor o peso (importancia) del evento (String).
          });
          self.$router.push({name: 'Trivia', params: {mail: self.$route.params.mail, attempts: 3}})
        }, (error) => {
          console.log(error);
          console.log("prueba fallo registro");
        });
      } else {
        console.log("no se puede registrar por x") 
      }
    },
    validRegister() {
      this.invalidCode = true
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          this.td = c.substring(name.length, c.length)
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    btnDisable() {
      if(((!this.names == '') && (!this.lastName == '') && (!this.ccemail == '') && (!this.gender == '') && (!this.terms == ''))) {
        
        if ((!this.birthDay == '') && (!this.birthMonth == '') && (!this.birthYear == '')) {
          if(this.birthYear < (this.fechaActualYear - 18)) {
            this.isDisabled = false
          } else if(this.birthYear == (this.fechaActualYear - 18)) {
            if (this.birthMonth < this.fechaActualMonth) {
              this.isDisabled = false
            } else if(this.birthMonth == this.fechaActualMonth) {
              if (this.birthDay <= this.fechaActualDay) {
                console.log('entre if' + this.birthDay + '.' + this.fechaActualDay)
                this.isDisabled = false
              } else {
                console.log('entre else' + this.birthDay + '.' + this.fechaActualDay)
                this.isDisabled = true
              }
            } else {
              this.isDisabled = true
            }
          } else {
            this.isDisabled = true
          }
        } else {
          this.isDisabled = true
        }
      } else {
        this.isDisabled = true
      }
    }
  },
  watch: {
    names: function() {
      this.btnDisable()
    },
    lastName: function() {
      this.btnDisable()
    },
    ccemail: function() {
      this.btnDisable()
    },
    phone: function() {
      this.btnDisable()
    },
    birthDay: function() {
      this.btnDisable()
    },
    birthMonth: function() {
      this.btnDisable()
    },
    birthYear: function() {
      this.btnDisable()
    },
    gender: function() {
      this.btnDisable()
    },
    city: function() {
      this.btnDisable()
    },
    terms: function() {
      this.btnDisable()
    }
  }
}
</script>
