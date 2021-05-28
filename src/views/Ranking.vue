<template lang="pug">
  .cc-page
    <div class="cc-ranking">
      .layout-general.layaout-ranking
        .cc-ranking__inner
          header.cc-ranking__header.cc-header
            h1.cc-title RANKING TRIVIA PILSEN DEL SUR
            p.cc-ranking__header-txt Logra quedarte en la cima...  <br> ¡Los 15 mejores serán los ganadores! 
              small.cc-ranking__header-txt_small Posiciones del día
            //- router-link(:to="'/'").cc-btn.cc-promo__btn Batir mi record
          ul.cc-ranking__list
            li.cc-ranking__item(v-for="item in rankingList")
              p.cc-ranking__name.i-dot-ranking {{ item.name }}
              span.cc-ranking__points {{ item.time | filterName }}
        p.cc-ranking__txt SI TE DIO SED
        .container-btn
          a(href="https://www.casadelacerveza.cl/Pilsen%20del%20sur")
            button.shop-here COMPRAR PILSEN AQUÍ
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Ranking',
  data () {
    return {
      finalTime: '01:50:08',
      totalPoints: '5.000',
      rankingList: [
        // {time:30, name:'nombre1'},
        // {time:30, name:'nombre2'},
        // {time:30, name:'nombre3'},
        // {time:30, name:'nombre5'},
        // {time:30, name:'nombre6'},
        // {time:30, name:'nombre8'},
        // {time:30, name:'nombre9'},
        // {time:30, name:'nombre0'},
        // {time:30, name:'nombre1'},
        // {time:30, name:'nombre2'},
      ],
    }
  },
  created() {
    this.generarRanking()
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
    generarRanking() {
      let self = this
      axios({
        method: "get",
        url: "http://triviareplicas.azurewebsites.net/ab/trivia/ranking?_format=json",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.rankingList = response.data
        console.log(response.data);
      }, (error) => {
        console.log(error);
      });
    }
  },
}
</script>
