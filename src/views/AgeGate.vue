<template lang="pug">
  <div class="cc-age-gate cc-page ">
    .layout-general
      .cc-age-gate__wrapper
        p.cc-title Pah seguir tienes que tener más de 18 vueltas al sol. Ingresa cuando naciste.
        .cc-age-gate__grid-wrapper
          .cc-age-gate__grid
            .cc-age-gate__control.cc-age-gate__control_day
              label.cc-age-gate__label(for="ageGateDay")
              input.cc-age-gate__input(id="ageGateDay" type="text" data-qadp="age_gate_day" maxlength="2" min="1" max="31" placeholder="DD" v-model="inputDay")
            .cc-age-gate__control.cc-age-gate__control_month
              label.cc-age-gate__label(for="ageGateMonth")
              input.cc-age-gate__input(id="ageGateMonth" type="text" data-qadp="age_gate_month" maxlength="2" min="1" max="12" placeholder="MM" v-model="inputMonth")
            .cc-age-gate__control.cc-age-gate__control_year
              label.cc-age-gate__label(for="ageGateYear")
              input.cc-age-gate__input(id="ageGateYear" type="text" data-qadp="age_gate_year" maxlength="4" min="1900" max="2002" placeholder="AAAA" v-model="inputYear")

        .cc-form__terms
          .cc-form__terms-item
            input.cc-form__input-check(type="checkbox" id='ccTerms' @click="setPrice")
            label.cc-form__label.cc-form__label_check.i-checked(for='ccTerms') Recordar mis datos
            small.cc-form__label.cc-form__label_small *No selecciones esta opción si compartes este computador con menores de edad. 
            small.cc-form__label.cc-form__label_small Este sitio web utiliza cookies que se quedarán almacenadas en el computador con el fin de mejorar su experiencia. Al proporcionar su fecha de nacimiento, también se acepta el uso de cookies. Más información haga <a class="cc-link" href="./documents/Politicas-de-Privacidad-Landing-BECKER.pdf">clic aquí</a>.
          a.cc-btn.cc-btn__primary.i-arrow-after(href="https://www.tapintoyourbeer.com" v-if="isDisabled" data-qadp="button_enter_agegate") Ingresar
          button.cc-btn.cc-btn__primary.i-arrow-after(type="button" v-else :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled" @click="persist" data-qadp="button_enter_agegate") Ingresar
  </div>
</template>

<script>

export default {
  name: 'AgeGate',
  data () {
    return {
      age: true,
      ageX: true,
      inputDay: '',
      inputMonth: '',
      inputYear: '',
      isDisabled: true,
      fechaActualDay: '',
      fechaActualMonth: '',
      fechaActualYear: ''
    }
  },
  watch: {
    inputDay: function() {
      this.btnDisable()
    },
    inputMonth: function() {
      this.btnDisable()
    },
    inputYear: function() {
      this.btnDisable()
    },
  },
  created() {
    this.notMenu()
    var f = new Date();
    this.fechaActualDay = f.getDate()
    this.fechaActualMonth = f.getMonth() + 1
    this.fechaActualYear = f.getFullYear()
  },
  mounted() {
    if (localStorage.age) {
      this.age = localStorage.age;
    }
    if(sessionStorage.name) this.ageX = sessionStorage.ageX;
  },
  methods: {
    persist() {
      sessionStorage.ageX = this.ageX;
      document.querySelector("body").classList.remove("cc-body-agegate");

      var destino = '';
      if((sessionStorage.toNameDestino == '' ) || (sessionStorage.toNameDestino == null)) {
        destino = 'Home';
        console.log("entre a persist")
      } else {
        destino = sessionStorage.toNameDestino;
      }
      if(sessionStorage.isUtmFb) {
        this.$router.push({name: destino, query: { fbclid: sessionStorage.utmFb}})  
      } else {
        if(sessionStorage.v4 == ''){
          this.$router.push({name: destino, query: { utm_source: sessionStorage.v1, utm_medium: sessionStorage.v2, utm_campaign: sessionStorage.v3 }})  
        } else {
          this.$router.push({name: destino, query: { utm_source: sessionStorage.v1, utm_medium: sessionStorage.v2, utm_campaign: sessionStorage.v3, utm_content: sessionStorage.v4 }})  
        }
      }
    },
    setPrice() {
      if(!localStorage.age) {
        localStorage.age = this.age;
      } else {
        localStorage.removeItem('age');
      }
    },
    btnDisable() {
      
      if ((!this.inputDay == '') && (!this.inputMonth == '') && (!this.inputYear == '') && (this.inputDay <= 31) && (this.inputDay > 0) && (this.inputMonth <= 12) && (this.inputMonth > 0) && (this.inputYear > 0) && (this.inputYear >= 1920)) {
        if(this.inputYear < (this.fechaActualYear - 18)) {
              this.isDisabled = false
        } else if(this.inputYear == (this.fechaActualYear - 18)) {
          if (this.inputMonth < this.fechaActualMonth) {
              this.isDisabled = false
          } else if((this.inputMonth == this.fechaActualMonth)) {
            if (this.inputDay <= this.fechaActualDay) {
              this.isDisabled = false
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
    },
    notMenu() {
      document.querySelector("body").classList.add("cc-body-agegate");
    }
  }
}
</script>
