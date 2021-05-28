<template lang="pug">
<div class="cc-registro">
  .container-register
    .container-yes
      p.text-yes Podrías decirme si probaste Pilsen Sur
      .cc-form__terms-item
        input#probado.cc-form__input-check(type="checkbox", v-model="probado")
        label.cc-form__label.cc-form__label_check.i-check(for="probado") Sí
      .cc-form__terms-item
        input#noProbado.cc-form__input-check(
          type="checkbox",
          v-model="noProbado"
        )
        label.cc-form__label.cc-form__label_check.i-check(for="noProbado") No
        .container-test-yes(
          v-if="probado && (!noProbado || noProbado == null)"
        )
          p.text-yes Ahora que probaste Pilsen de Sur, ¿qué tan probable es que la vuelvas a compra si estuviese disponible en los lugares que frecuentas?
          select#ccGender.cc-form__input.cc-form__input_select(
            v-model="response",
            required
          )
            option(selected, disabled, value="", hidden) Selecciona una respuesta
            option(
              v-if="response !== undefined",
              v-for="item in responsePilsen",
              :value="item.id"
            ) {{ item.name }}
          p.text-yes Que tanto te gustó el sabor de Pilsen de Sur
          select#ccGender.cc-form__input.cc-form__input_select(
            v-model="response2",
            required
          )
            option(selected, disabled, value="", hidden) Selecciona una respuesta
            option(
              v-if="response2 !== undefined",
              v-for="item in responsePilsen2",
              :value="item.id"
            ) {{ item.name }}
          p.text-yes ¿Pensando en la próxima vez que consumas Pilsen de Sur en que ocasión la tomarías?
          select#ccGender.cc-form__input.cc-form__input_select(
            v-model="response3",
            required
          )
            option(selected, disabled, value="", hidden) Selecciona una respuesta
            option(
              v-if="response3 !== undefined",
              v-for="item in responsePilsen3",
              :value="item.id"
            ) {{ item.name }}
      button.cc-form__btn.cc-btn.cc-btn_secondary.i-arrow-after(
        type="button",
        v-if="probado || noProbado",
        @click="goToTrivia()"
      ) Iniciar Trivia
    .cc-registro__grid
      header.cc-header
        h2.cc-title Si ya estás registrado
      .cc-registro__cta
        router-link.cc-btn.cc-btn_secondary.i-arrow-after(:to="'/login'") INICIAR SESIÓN
    .line-style
    h1.parrafor Ingresa tus datos personales <br> para participar en la trivia
    form#id-form.cc-form.cc-form__grid(action="/trivia", method="get")
      .cc-form__group
        label.cc-form__label(for="ccName") Nombres <sup>*</sup>
        .cc-form__input-inner
          input#ccName.cc-form__input(
            type="text",
            name="ccName",
            placeholder="Ingresa solo tu nombre",
            v-model="names",
            required
          )
          span.error-input(v-if="names.length == 0") Debe ingresar su nombre
      .cc-form__group
        label.cc-form__label(for="ccLastName") Apellidos <sup>*</sup>
        .cc-form__input-inner
          input#ccLastName.cc-form__input(
            type="text",
            name="ccLastName",
            placeholder="Ingresa tu apellido",
            v-model="lastName",
            required
          )
          span.error-input(v-if="lastName.length == 0") Debe ingresar su apellido
      .cc-form__group
        label.cc-form__label(for="ccGender") Género <sup>*</sup>
        .cc-form__input-inner.i-select
          select#ccGender.cc-form__input.cc-form__input_select(
            v-model="gender",
            required
          )
            option(selected, disabled, value="", hidden) Escoje tu género
            option(
              v-if="genders !== undefined",
              v-for="item in genders",
              :value="item.id"
            ) {{ item.name }}
          span.error-input(v-if="gender.length == 0") Debe ingresar su Género
      .cc-form__group
        label.cc-form__label(for="ccEmail") Tu mail <sup>*</sup>
        .cc-form__input-inner
          input#ccEmail.cc-form__input(
            type="email",
            name="ccEmail",
            placeholder="Ingresa correo electrónico",
            v-model="ccemail",
            value="ccemail",
            required
          )
          span.error-input(v-if="ccemail.length == 0") Debe ingresar su correo
          .cc-form__group
        p.cc-form__label Ingresa tu fecha de Nacimiento
        //- <sup>*</sup>
        .cc-form__group_grid
          .cc-form__group
            .cc-form__input-inner
              input#ccDateDay.cc-form__input(
                type="number",
                name="ccDay",
                maxlength="2",
                min="1",
                max="31",
                placeholder="DD",
                v-model="birthDay",
                required
              )
              span.error-input(v-if="birthDay.length == 0") Debe ingresar su dia de nacimiento
          .cc-form__group
            .cc-form__input-inner.i-select
              select#ccDateDay.cc-form__input.cc-form__input_select(
                v-model="birthMonth",
                required
              )
                option(selected, disabled, value="", hidden) MM
                option(v-for="(item, key) in months", :value="key") {{ item }}
              span.error-input(v-if="birthMonth.length == 0") Debe ingresar su mes de nacimiento
          .cc-form__group
            .cc-form__input-inner
              input#ccLastYear.cc-form__input(
                type="number",
                name="ccYear",
                maxlength="4",
                min="1900",
                max="2003",
                placeholder="AAAA",
                v-model="birthYear",
                required
              )
              span.error-input(v-if="birthYear.length == 0") Debe ingresar su año de nacimiento
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
      span.menor-edad Eres menor de edad
      .cc-form__footer
        .cc-form__terms
          .cc-form__terms-item
            input#ccTerms.cc-form__input-check(
              type="checkbox",
              v-model="terms",
              required
            )
            label.cc-form__label.cc-form__label_check.i-check(for="ccTerms") He leído, entendido y aceptado los <router-link to="/terminos-condiciones">Términos y Condiciones</router-link> y la <router-link to="/politicas"> política de protección de datos personales</router-link>, en particular el procesamiento de mi información personal por parte de Cervecería de Chile. con las finalidades y usos requeridos por ésta descritos en la mencionada política
            span.error-input(v-if="!terms") Debe aceptar términos y condiciones
          .cc-form__terms-item
            input#ccMrk.cc-form__input-check(type="checkbox", v-model="mrk")
            label.cc-form__label.cc-form__label_check.i-check(for="ccMrk") Deseo recibir información comercial de Pilsen del Sur
          label
          //- button(style="display:none" type="submit" id="btn-submit")
    button#boton-ocultar.cc-form__btn.cc-btn.cc-btn_secondary.i-arrow-after(
      @click="createUser()"
    ) Siguiente
    transition(name="fade")
      .cc-modal-code(v-if="invalidCode")
        .cc-modal-code__card
          p.cc-modal-code__title Todos los dátos son requeridos
          p.cc-modal-code__txt Ingresa todos los datos, por favor
          button.cc-form__btn.cc-btn(type="button", @click="invalidCode = false") Aceptar
    transition(name="fade")
      Loader(v-if="isLoader", :full="true")
</div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import axios from "axios";

export default {
  name: "Registro",
  components: {
    Loader,
  },
  data() {
    return {
      names: "",
      lastName: "",
      birth: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      probado: false,
      noProbado: false,
      response: "",
      response2: "",
      response3: "",
      responsePilsen: [
        { id: 0, name: "Definitivamente la compraría" },
        { id: 1, name: "Probablemente la compraría" },
        { id: 2, name: "Puede que si/ Puede que no" },
        { id: 3, name: "Definitivamente no la compraría" },
        { id: 4, name: "Definitivamente no la compraría" },
      ],
      responsePilsen2: [
        { id: 0, name: "Me gistó Mucho" },
        { id: 1, name: "Me gustó" },
        { id: 2, name: "Ni me gustó/ Ni me disgusto" },
        { id: 3, name: "No me gustó mucho" },
        { id: 4, name: "No me gustó nada" },
      ],
      responsePilsen3: [
        { id: 0, name: "Viendo deporte con amigos" },
        { id: 1, name: "Compartiendo con amigs en casa o fuerda de casa" },
        { id: 2, name: "En casa en un momento de Relax" },
        { id: 3, name: "En una comida solo o acompañado" },
      ],
      months: {
        1: "ENE",
        2: "FEB",
        3: "MAR",
        4: "ABR",
        5: "MAY",
        6: "JUN",
        7: "JUL",
        8: "AGO",
        9: "SEP",
        10: "OCT",
        11: "NOV",
        12: "DIC",
      },
      genders: {},
      gender: "",
      city: "",
      phone: "",
      terms: "",
      mrk: "",
      notErrors: true,
      isLogged: false,
      cities: {},
      selectedEmail: "",
      ccemail: "",
      output: "",
      isLoader: false,
      invalidCode: false,
      td: "",
      isDisabled: true,
      fechaActualDay: "",
      fechaActualMonth: "",
      fechaActualYear: "",
    };
  },
  created() {
    var vm = this;
    axios
      .get("https://triviareplicas.azurewebsites.net/ab/gender")
      .then((response) => {
        vm.genders = response.data;
      });
    this.$route.params.mail = this.ccemail;

    var f = new Date();
    this.fechaActualDay = f.getDate();
    this.fechaActualMonth = f.getMonth() + 1;
    this.fechaActualYear = f.getFullYear();
  },
  methods: {
    redirect() {
      if (this.notErrors) {
        this.$router.push({ name: "Trivia" });
      }
    },
    goToTrivia() {
      this.$router.push({
        name: "Trivia",
        params: { mail: this.ccemail, attempts: 3 },
      });
    },
    validarForm() {
      console.log("enbtroooo");
      for (
        let index = 0;
        index < document.getElementsByClassName("error-input").length;
        index++
      ) {
        const element = document.getElementsByClassName("error-input")[index];
        element.style.display = "block";
      }
    },
    createUser() {
      this.validarForm()
      let self = this;
      // document.getElementById('btn-submit').click().preventDefault()
      if ( this.birthDay <= this.fechaActualDay && this.birthMonth <= this.fechaActualMonth) {
        if (
          !(self.names == "") &&
          !(self.lastName == "") &&
          !(self.birthYear == "") &&
          !(self.birthMonth == "") &&
          !(self.birthDay == "") &&
          !(self.gender == "") &&
          self.terms
        ) {
          this.getCookie("_td");
          self.isLoader = false;
          const info = {
            name: self.names,
            last_name: self.lastName,
            birth: this.birthYear + "-" + this.birthMonth + "-" + this.birthDay,
            id_gender: this.gender,
            // id_city: this.city,
            mail: this.ccemail,
            // phone: this.phone,
            terms_acceptance: this.terms,
            allow_ads: this.mrk,
            td: this.td,
          };
          axios({
            method: "post",
            url:
              "https://triviareplicas.azurewebsites.net/ab/user/register?_format=json",
            data: info,
            headers: {
              "Content-Type": "application/json",
            },
          }).then(
            (response) => {
              var sha256 = require("js-sha256").sha256;
              var emailhash = sha256(this.ccemail);
              self.output = response.data;
              window.dataLayer.push({
                event: "trackEvent",
                eventCategory: "Pilsen del Sur", // Categoría del evento (String). Requerido.
                eventAction: "Registro Trivia", // Acción o subcategoría del evento (String).
                eventLabel: emailhash, // Etiqueta de descripción del evento (String).
                eventValue: "", // Valor o peso (importancia) del evento (String).
              });
              document.getElementById("id-form").style.display = "none";
              document.getElementById("boton-ocultar").style.display = "none";
              document.getElementsByClassName(
                "cc-registro__grid"
              )[0].style.display = "none";
              document.getElementsByClassName("parrafor")[0].style.display =
                "none";
              document.getElementsByClassName("line-style")[0].style.display =
                "none";
              document.getElementsByClassName(
                "container-yes"
              )[0].style.display = "block";
            },
            (error) => {
              console.log(error);
              console.log("prueba fallo registro");
            }
          );
        }
      } else {
        document.getElementsByClassName('menor-edad')[0].style.display = 'block'
      }
    },
    validRegister() {
      this.invalidCode = true;
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          this.td = c.substring(name.length, c.length);
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    btnDisable() {
      if (
        !this.names == "" &&
        !this.lastName == "" &&
        !this.ccemail == "" &&
        !this.gender == "" &&
        !this.terms == ""
      ) {
        if (
          !this.birthDay == "" &&
          !this.birthMonth == "" &&
          !this.birthYear == ""
        ) {
          if (this.birthYear < this.fechaActualYear - 18) {
            this.isDisabled = false;
          } else if (this.birthYear == this.fechaActualYear - 18) {
            if (this.birthMonth < this.fechaActualMonth) {
              this.isDisabled = false;
            } else if (this.birthMonth == this.fechaActualMonth) {
              if (this.birthDay <= this.fechaActualDay) {
                console.log(
                  "entre if" + this.birthDay + "." + this.fechaActualDay
                );
                this.isDisabled = false;
              } else {
                console.log(
                  "entre else" + this.birthDay + "." + this.fechaActualDay
                );
                this.isDisabled = true;
              }
            } else {
              this.isDisabled = true;
            }
          } else {
            this.isDisabled = true;
          }
        } else {
          this.isDisabled = true;
        }
      } else {
        this.isDisabled = true;
      }
    },
  },
  watch: {
    probado: function () {
      this.btnDisable();
      if (this.probado) {
        this.noProbado = false;
      }
    },
    noProbado: function () {
      this.btnDisable();
      if (this.noProbado) {
        this.probado = false;
      }
    },
    names: function () {
      this.btnDisable();
    },
    lastName: function () {
      this.btnDisable();
    },
    ccemail: function () {
      this.btnDisable();
    },
    // probado: function() {
    //   if (this.probado) {

    //   }
    // },
    phone: function () {
      this.btnDisable();
    },
    birthDay: function () {
      this.btnDisable();
      if (this.birthDay.length > 2) {
        this.birthDay = this.birthDay.slice(0, 2);
      }
    },
    birthMonth: function () {
      this.btnDisable();
    },
    birthYear: function () {
      this.btnDisable();
      if (this.birthYear.length > 4) {
        this.birthYear = this.birthYear.slice(0, 4);
      }
    },
    gender: function () {
      this.btnDisable();
    },
    city: function () {
      this.btnDisable();
    },
    terms: function () {
      this.btnDisable();
    },
  },
};
</script>
