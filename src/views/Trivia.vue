<template lang="pug">
  <div class="cc-trivia cc-page" id="id-trivia">
    .layout-general.layout-trivia
      .cc-trivia__inner
        .cc-trivia__timer
          p#countdown.cc-trivia__clock.i-time Iniciar tiempo: {{ countdown + ':00' }}
        p.cc-trivia__txt Pregunta {{ askActive }}
        transition(name="fade")
          Loader(v-if="isLoader", :full="true")
        .algo
          Loader(v-if="isLoaderUni", :full="false")
          .cc-trivia__c(v-else)
            .cc-trivia__wrap
              .cc-trivia__item
                p.cc-trivia__ask {{ statement }}
              ul.cc-trivia__number-list
                li.cc-trivia__number-item.i-brand-lata(v-for="(item, index) in triviaListLength" :class="{ 'active': askActive == item, 'done': item < askActive}")
              ul.cc-trivia__ask-list
                li.cc-trivia__ask-item
                  input.cc-trivia__ask-input(type="radio" name="answer" id="answerA" value="A" v-model="answerAR")
                  label.cc-trivia__ask-btn(for="answerA") {{ answerA }}
                  span error
                li.cc-trivia__ask-item
                  input.cc-trivia__ask-input(type="radio" name="answer" id="answerB" value="B" v-model="answerAR")
                  label.cc-trivia__ask-btn(for="answerB") {{ answerB }}
                li.cc-trivia__ask-item
                  input.cc-trivia__ask-input(type="radio" name="answer" id="answerC" value="c" v-model="answerAR")
                  label.cc-trivia__ask-btn(for="answerC") {{ answerC }}
                li.cc-trivia__ask-item
                  input.cc-trivia__ask-input(type="radio" name="answer" id="answerD" value="D" v-model="answerAR")
                  label.cc-trivia__ask-btn(for="answerD") {{ answerD }}
              .cc-trivia__footer
                button.cc-btn.cc-btn__primary.cc-promotion__card-btn.i-arrow-after(v-if="askActive < 8" type="button" @click="AskQuestion" :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled") Siguiente
                button.cc-btn.cc-btn__primary.cc-promotion__card-btn(v-else type="button" @click="AskQuestion" :class="{ 'cc-btn_disabled': isDisabled}" :disabled="isDisabled") Enviar respuestas
      .container-img
        img(:src="imagen[numberImg].src", :alt="imagen[numberImg].src")
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import axios from "axios";

export default {
  name: 'Trivia',
  components: {
    Loader
  },
  data () {
    return {
      numberImg: -1,
      imagen: [
        {
          src: require('./../assets/img/pilsen/ask1-bg.png'),
          src2: require('./../assets/img/pilsen/bg-trivia.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask2-bg.png'),
          src2: require('./../assets/img/pilsen/112A7454.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask3-bg.png'),
          src2: require('./../assets/img/pilsen/112A7392.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask4-bg.png'),
          src2: require('./../assets/img/pilsen/112A7477.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask5-bg.png'),
          src2: require('./../assets/img/pilsen/112A7364.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask6-bg.png'),
          src2: require('./../assets/img/pilsen/112A7481.png'),
        },
        {
          src: require('./../assets/img/pilsen/ask7-bg.png'),
          src2: require('./../assets/img/pilsen/112A7413.png'),
        },
      ],
      round: 1,
      statement : '',
      answerA : '',
      answerB : '',
      answerC : '',
      answerD : '',
      active : true,
      triviaListLength: 7,
      askActive: 3,
      time: 'September 4, 2020, 15:15',
      countdown: 5,
      withoutTime: false,
      output: '',
      outputQ: '',
      outputA: '',
      triviaId: '',
      questionId: '',
      start: false,
      answerAR: null,
      questionsLeft: '',
      once: 0,
      isLoader: true,
      isLoaderUni: false,
      isDisabled: true,
      timeTotal: false
    }
  },
  created() {
    this.isLoader = true
    this.startTrivia();
  },
  watch: {
    isLoader: function () {
    },
    answerAR: function() {
      this.btnDisable()
    },
  },
  mounted(){
  },
  methods:{
    btnDisable() {
      if(this.answerAR != null) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    async startTrivia() {
      let self = this
      const info = this.$_encry({
        username: self.$route.params.mail
      });
      axios({
        method: "post",
        url: "https://triviareplicas.azurewebsites.net/ab/trivia/start?_format=json",
        data: info,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => {
        self.output = response.data
        self.triviaId = self.output.triviaId
        this.nextQuestion();
        self.startCountdown()
      }, (error) => {
        console.log(error);
      });
    },
    nextQuestion() {
      let self = this
      this.answerAR = null
      const inf2 = this.$_encry({
        triviaId: this.triviaId
      }); 
      axios({
        method: "post",
        url: "https://triviareplicas.azurewebsites.net/ab/trivia/q/next?_format=json",
        data: inf2,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => {
        self.isLoader = false
        self.outputQ = response.data
        self.answerA = self.outputQ.question.A[1]
        self.answerB = self.outputQ.question.B[1]
        self.answerC = self.outputQ.question.C[1]
        self.answerD = self.outputQ.question.D[1]
        self.statement = self.outputQ.question.statement
        self.askActive = self.outputQ.currentQuestion
        self.questionId = self.outputQ.questionId
        self.start = true
        self.isLoaderUni = false
        let elemento = document.getElementById('id-trivia')
        this.numberImg ++
        elemento.setAttribute('style', `padding-top: 70px; background-image: url(${this.imagen[this.numberImg].src2});`)
        console.log(elemento, 'elemento');
      }, (error) => {
        console.log(error);
      });
    },
    AskQuestion() {
      let self = this
      self.isLoaderUni = true
      const inf3 = this.$_encry({
        questionId: this.questionId,
        answer: this.answerAR
      });
      axios({
        method: "post",
        url: "https://triviareplicas.azurewebsites.net/ab/trivia/q/answer?_format=json",
        data: inf3,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => {
        self.outputA = response.data
        self.questionsLeft = self.outputA.questionsLeft
        if (self.questionsLeft == true ) {
          this.nextQuestion();
          this.nextTrivia();
          self.timeTotal = false
        } else {
          self.timeTotal = true
          self.$router.push({name: 'Message', params: {mail: self.$route.params.mail, user: self.$route.params.user, triviaId: self.triviaId}})
        }
      }, (error) => {
        console.log(error);
      });
    },
    callFunction: function (duration) {
      var timer = duration, minutes, seconds;
      var self = this
      var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(document.getElementById('countdown')){
          document.getElementById('countdown').textContent = minutes + ":" + seconds;
        }
        if(self.timeTotal) {
          clearInterval(interval)          
        }
        if(timer <= 0) {
          self.finishTime();
          clearInterval(interval)
        }
        timer -= 1;
      }, 1000);
    },
    finishTime : function () {
      this.withoutTime = true
      localStorage.fisishTrivia = true;
      var intentos = (this.$route.params.attempts - 1)
      if(this.$route.name == "Trivia") {
        this.$router.push({name: 'WithoutTime', params: {mail: this.$route.params.mail, attempts: intentos}})
      }
    },
    nextTrivia () {
      this.askActive += 1
    },
    startCountdown() {
        var display = document.getElementById('countdown');
        var duration = this.countdown * 60; 
        this.callFunction(duration, display)
        if (this.withoutTime && localStorage.fisishTrivia) {
          this.$router.push({name: 'Message', params: {mail: self.$route.params.mail, triviaId: self.triviaId}})
        }
    }
  },
  beforeRouteLeave (to, from, next) {
    if((to.name !== 'Message')) {
      const answer = window.confirm('Desea salir de la trivia, no quedarán guardadas sus respuestas')
      if (answer) {
        this.timeTotal = true
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
