<template lang="pug">
  <div class="cc-message cc-page">
    transition(name="fade")
      Loader(v-if="finalTime === '' || isLoader", :full="true")
    .cc-message__grid(v-if="finalTime !== '' && isLoader === false")
      .cc-message__content
        header.cc-message__header
          h1(v-if="!isChecked").cc-title.cc-title_brand Completa la trivia
          p(v-if="!isChecked").cc-lead Tu tiempo fue de:
          h1(v-if="isChecked").cc-title.cc-title_brand ¡Weeeena!
          p(v-if="isChecked").cc-lead La hiciste en:
          span.cc-lead__time {{ finalTime | filterName }}
        p.cc-message__txt(v-if="!isChecked") 
          small ¡Solo un paso más! Comprueba que no eres un robot y haz clic en "Terminar trivia"
          br
          br
          vue-recaptcha(v-if="!isChecked" sitekey="6LfD_SUaAAAAAGZ02ji6sqqqJLDukJ71r-x6yYwh", loadRecaptchaScript=true @verify="onCaptchaVerified" @expired="onCaptchaExpired") 
        p(v-if="isChecked").cc-message__txt Has completado tu trivia. El ganador se define todos los días a las 20:00 hrs.
        .cc-message__grid-btn
          //- router-link(:to="'/#'").cc-btn.cc-message__btn Vuelve a participar
          button(v-if="!isChecked").cc-form__btn.cc-btn.cc-btn_secondary.i-arrow-after(type="button" @click="checkTrivia()" :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled") Terminar trivia
          router-link(v-if="isChecked")(:to="'/ranking'").cc-btn.cc-btn_secondary.cc-message__btn.i-arrow-after Ver ranking
          

  </div>
</template>

<script> 
 
import axios from "axios";
import Loader from '@/components/Loader.vue'
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Message',
  components: {
    Loader,
    VueRecaptcha
  },
  data () {
    return {
      finalTime: '',
      bestTime: '',
      output: '',
      rankingList: [],
      position: '',
      posMe: '',
      wrongAnswers: '',
      correctAnswers: '',
      totalPenalty: '',
      triviaTime: '',
      isDisabled: true,
      isLoader: false,
      recaptchaToken: '',
      isChecked: false,
    }
  },
  created() {
    this.triviaResults()
    this.generarRanking()
    this.generarPersonalRanking()
  },
  filters: {
    filterName(value) {
      var seconds = Math.floor( value % 60 ).toString();
      var minutes = Math.floor( value / 60 ).toString();
      if( seconds.length === 1 ){
          seconds = '0' + seconds;
      }                
      return minutes + ':' + seconds;
    }
  },
  methods: {
    triviaResults() {
      let self = this
      const info = {
        "triviaId": this.$route.params.triviaId
      };
      axios({
        method: "post",
        url: "https://dev-pilsendelsur.pantheonsite.io/ab/trivia/time?_format=json",
        data: info,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        self.output = response.data
        self.finalTime = self.output.currentTrivia.time.total
        self.bestTime = self.output.bestTriviaTime,
        self.wrongAnswers = self.output.currentTrivia.result.wrongAnswers,
        self.correctAnswers = self.output.currentTrivia.result.correctAnswers,
        self.totalPenalty = self.output.currentTrivia.time.totalPenalty
        self.triviaTime = self.output.currentTrivia.time.triviaTime
      }, (error) => {
        console.log(error);
      });
    },
    generarRanking() {
      let self = this
      axios({
        method: "get",
        url: "https://dev-pilsendelsur.pantheonsite.io/ab/trivia/ranking?_format=json",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.rankingList = response.data
      }, (error) => {
        console.log(error);
      });
    },
    checkTrivia(){
      let self = this
      if(self.recaptchaToken.trim() == ''){
        alert("Comprueba que no eres un robot.")
        return
      }
      let ggt = self.recaptchaToken
      self.isLoader = true
      const info = self.$_encry({
        "triviaId": self.$route.params.triviaId, 
        "ggt": ggt
      });
      axios({
        method: "post",
        url: "https://dev-pilsendelsur.pantheonsite.io/ab/challenge/checkrobot?_format=json",
        data: info,
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        let output = response.data
        if(!output.has_error){
            self.isChecked = true
        } else {
          alert("Ups! parece que no se comprobó que eres un humano. Intenta de nuevo.")

          self.isChecked = false
          self.isDisabled = true
        }
        
        
        self.isLoader = false
      }, (error) => {
        console.log(error);
      });
    },
    onCaptchaVerified(recaptchaToken){
      this.isDisabled = false
      this.recaptchaToken = recaptchaToken
    },
    onCaptchaExpired(){
      this.isDisabled = true
    },
    generarPersonalRanking() {
      let self = this
      const info = {
        "username": this.$route.params.user
      };
      axios({
        method: "post",
        url: "https://dev-pilsendelsur.pantheonsite.io/ab/trivia/ranking?_format=json",
        data: info,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        self.position = response.data
        let getPosition = self.position
        let listRankingLocal = self.rankingList

        for(var item of listRankingLocal){
          if (item.customerId == getPosition.customerId) {
            console.log(item)
            self.posMe = item.pos - 1
            return item;
          }
        }

      }, (error) => {
        console.log(error);
      });
    },
  }
}
</script>
