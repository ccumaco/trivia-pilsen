<template lang="pug">
<div class="cc-age-gate cc-page ">
  .layout-general
    .cc-age-gate__wrapper
      .imagen-mobile
        img(src="./../assets/img/pilsen/logo.svg", alt="Pilsen del sur")
      h1.title-agegate Bienvenidos
      p.cc-title Debes ser mayor de edad para ingresar<br> Ingresa tu año de nacimiento
      #scrollAgegate.cc-age-gate__grid-wrapper
        .cc-age-gate__control.cc-age-gate__control_year
          .border-contain
            label.cc-age-gate__label(for="ageGateYear")
            input#ageGateYear.cc-age-gate__input(
              type="text",
              data-qadp="age_gate_year",
              maxlength="1",
              min="1",
              max="2",
              placeholder="A",
              v-model="inputYear1"
            )
            input#ageGateYear.cc-age-gate__input(
              type="text",
              data-qadp="age_gate_year",
              maxlength="1",
              min="0",
              max="9",
              placeholder="A",
              v-model="inputYear2"
            )
            input#ageGateYear.cc-age-gate__input(
              type="text",
              data-qadp="age_gate_year",
              maxlength="1",
              min="0",
              max="9",
              placeholder="A",
              v-model="inputYear3"
            )
            input#ageGateYear.cc-age-gate__input(
              type="text",
              data-qadp="age_gate_year",
              maxlength="1",
              min="0",
              max="9",
              placeholder="A",
              v-model="inputYear4"
            )
        .cc-age-gate__control.cc-age-gate__control_month
          label.cc-age-gate__label(for="ageGateMonth")
          input#ageGateMonth.cc-age-gate__input(
            type="text",
            data-qadp="age_gate_month",
            maxlength="1",
            min="0",
            max="9",
            placeholder="M",
            v-model="inputMonth1"
          )
          input#ageGateMonth.cc-age-gate__input(
            type="text",
            data-qadp="age_gate_month",
            maxlength="1",
            min="0",
            max="9",
            placeholder="M",
            v-model="inputMonth2"
          )
        .cc-age-gate__control.cc-age-gate__control_day
          label.cc-age-gate__label(for="ageGateDay")
          input#ageGateDay.cc-age-gate__input(
            type="text",
            data-qadp="age_gate_day",
            maxlength="1",
            min="0",
            max="9",
            placeholder="D",
            v-model="inputDay"
          )
          input#ageGateDay.cc-age-gate__input(
            type="text",
            data-qadp="age_gate_day",
            maxlength="1",
            min="0",
            max="9",
            placeholder="D",
            v-model="inputDay2"
          )

      .cc-form__terms
        .cc-form__terms-item
          input#ccTerms.cc-form__input-check(
            type="checkbox",
            @click="setPrice"
          )
          label.cc-form__label.cc-form__label_check.i-checked(for="ccTerms") <b>Recordar mis datos</b> *No selecciones esta opción si compartes este computador con menores de edad
          //- small.cc-form__label.cc-form__label_small *No selecciones esta opción si compartes este computador con menores de edad. 
          small.cc-form__label.cc-form__label_small Este sitio web utiliza cookies que se quedarán almacenadas en el computador con el fin de mejorar su experiencia. Al proporcionar su fecha de nacimiento, también se acepta el uso de cookies. Más información haga <a class="cc-link" href="./documents/Politicas-de-Privacidad-Landing-BECKER.pdf">clic aquí</a>.
        //- a#acepted.cc-btn.cc-btn__primary.i-arrow-after(href="https://www.tapintoyourbeer.com" v-if="isDisabled" data-qadp="button_enter_agegate") Ingresar
        //- button.cc-btn.cc-btn__primary.i-arrow-after(type="button" v-else :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled" @click="persist" data-qadp="button_enter_agegate") Ingresar
</div>
</template>

<script>
export default {
  name: "AgeGate",
  data() {
    return {
      age: true,
      ageX: true,
      inputDay: "",
      inputDay2: "",
      inputMonth1: "",
      inputMonth2: "",
      inputYear1: "",
      inputYear2: "",
      inputYear3: "",
      inputYear4: "",
      isDisabled: true,
      fechaActualDay: "",
      fechaActualMonth: "",
      fechaActualYear: "",
    };
  },
  watch: {
    inputDay: function () {
      this.btnDisable();
      if (this.inputDay.length == 1) {
        document.getElementsByClassName('cc-age-gate__input')[7].focus()
      }
    },
    inputDay2: function () {
      this.btnDisable();
      if (this.inputDay2.length == 1) {
        this.doScroll(3);
        this.validarDia()
      }
    },
    inputMonth1: function () {
      this.btnDisable();
      if(this.inputMonth1.length){
        document.getElementsByClassName('cc-age-gate__input')[5].focus()
      }
    },
    inputMonth2: function () {
      this.btnDisable();
      if (this.inputMonth2.length == 1) {
        this.doScroll(2);
        this.validarMes()
        document.getElementsByClassName('cc-age-gate__input')[6].focus()
      }
    },
    inputYear1: function () {
      this.btnDisable();
      if(this.inputYear1.length){
        document.getElementsByClassName('cc-age-gate__input')[1].focus()
      }
    },
    inputYear2: function () {
      this.btnDisable();
      if(this.inputYear2.length){
        document.getElementsByClassName('cc-age-gate__input')[2].focus()
      }
    },
    inputYear3: function () {
      this.btnDisable();
      if(this.inputYear3.length){
        document.getElementsByClassName('cc-age-gate__input')[3].focus()
      }
    },
    inputYear4: function () {
      if (this.inputYear4.length == 1) {
        this.doScroll(1);
        this.validarEdad();
        document.getElementsByClassName('cc-age-gate__input')[4].focus()
      }
      this.btnDisable();
    },
  },
  created() {
    this.notMenu();
    var f = new Date();
    this.fechaActualDay = f.getDate();
    this.fechaActualMonth = f.getMonth() + 1;
    this.fechaActualYear = f.getFullYear();
  },
  mounted() {
    document
      .getElementsByClassName("cc-age-gate")[0]
      .setAttribute("style", "position: relative; top: 0; z-index: 1000");
    if (localStorage.age) {
      this.age = localStorage.age;
    }
    if (sessionStorage.name) this.ageX = sessionStorage.ageX;
  },
  methods: {
    validarDia(){
      let dia = this.inputDay.toString() + this.inputDay2.toString();
      let diaParceado = parseInt(dia);
      if (diaParceado == this.fechaActualDay + 1) {
        location.href = "https://www.tapintoyourbeer.com";
      } else {
        this.persist();
      }
    },
    validarMes() {
      let mes = this.inputMonth1.toString() + this.inputMonth2.toString();
      let parceadorMes = parseInt(mes);
      console.log("entro al if");
      if(parceadorMes < this.fechaActualMonth){
        this.persist();
      }
      else if(parceadorMes == this.fechaActualMonth) {
        this.doScroll(2);
      }
      else if (parceadorMes > this.fechaActualMonth) {
        location.href = "https://www.tapintoyourbeer.com";
      }
    },
    validarEdad() {
      let edadAño =
        this.inputYear1.toString() +
        this.inputYear3.toString() +
        this.inputYear3.toString() +
        this.inputYear4.toString();
      let parceado = parseInt(edadAño);
      console.log(parceado, "parceadp");
      console.log(2003);
      if (parceado <= 2002) {
        console.log("valido que es mayor");
        this.persist();
      } else if (parceado == 2003) {
        this.doScroll(1);
      } else {
        location.href = "https://www.tapintoyourbeer.com";
      }
    },
    persist() {
      sessionStorage.ageX = this.ageX;
      document.querySelector("body").classList.remove("cc-body-agegate");

      var destino = "";
      if (
        sessionStorage.toNameDestino == "" ||
        sessionStorage.toNameDestino == null
      ) {
        destino = "Home";
        console.log("entre a persist");
      } else {
        destino = sessionStorage.toNameDestino;
      }
      if (sessionStorage.isUtmFb) {
        this.$router.push({
          name: destino,
          query: { fbclid: sessionStorage.utmFb },
        });
      } else {
        if (sessionStorage.v4 == "") {
          this.$router.push({
            name: destino,
            query: {
              utm_source: sessionStorage.v1,
              utm_medium: sessionStorage.v2,
              utm_campaign: sessionStorage.v3,
            },
          });
        } else {
          this.$router.push({
            name: destino,
            query: {
              utm_source: sessionStorage.v1,
              utm_medium: sessionStorage.v2,
              utm_campaign: sessionStorage.v3,
              utm_content: sessionStorage.v4,
            },
          });
        }
      }
    },
    setPrice() {
      if (!localStorage.age) {
        localStorage.age = this.age;
      } else {
        localStorage.removeItem("age");
      }
    },
    doScroll(param) {
      console.log("se hizo scroll");
      let mes = document.getElementsByClassName("cc-age-gate__control_month")[0]
        .clientWidth;
      let dia = document.getElementsByClassName("cc-age-gate__control_day")[0]
        .clientWidth;
      // let año = document.getElementsByClassName('cc-age-gate__control_year')[0].clientWidth
      if (param == 1) {
        setTimeout(() => {
          document.getElementById("scrollAgegate").scrollLeft = mes;
        }, 100);
      }
      if (param == 2) {
        setTimeout(() => {
          document.getElementById("scrollAgegate").scrollLeft = dia + mes;
        }, 100);
      }
      if (param == 3) {
        setTimeout(() => {
          document.getElementById("scrollAgegate").scrollLeft = 0;
        }, 100);
      }
    },
    btnDisable() {
      if (
        !this.inputDay == "" ||
        (!this.inputDay2 == "" &&
          (!this.inputMonth1 || !this.inputMonth2 == "") &&
          !this.inputYear1 == "" &&
          !this.inputYear2 == "" &&
          !this.inputYear3 == "" &&
          !this.inputYear4 == "" &&
          (this.inputDay || this.inputDay2 <= 31) &&
          (this.inputDay || this.inputDay2 > 0) &&
          (this.inputMonth1 || this.inputMonth2 <= 12) &&
          (this.inputMonth1 || this.inputMonth2 > 0) &&
          (this.inputYear1 ||
            this.inputYear2 ||
            this.inputYear3 ||
            this.inputYear4) > 0 &&
          (this.inputYear1 ||
            this.inputYear2 ||
            this.inputYear3 ||
            this.inputYear4) >= 1920)
      ) {
        if (
          (this.inputYear1 ||
            this.inputYear2 ||
            this.inputYear3 ||
            this.inputYear4) <
          this.fechaActualYear - 18
        ) {
          this.isDisabled = false;
        } else if (
          (this.inputYear1 ||
            this.inputYear2 ||
            this.inputYear3 ||
            this.inputYear4) ==
          this.fechaActualYear - 18
        ) {
          if (this.inputMonth1 || this.inputMonth2 < this.fechaActualMonth) {
            this.isDisabled = false;
          } else if (
            this.inputMonth1 ||
            this.inputMonth2 == this.fechaActualMonth
          ) {
            if (this.inputDay || this.inputDay2 <= this.fechaActualDay) {
              this.isDisabled = false;
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
    notMenu() {
      document.querySelector("body").classList.add("cc-body-agegate");
    },
  },
};
</script>
