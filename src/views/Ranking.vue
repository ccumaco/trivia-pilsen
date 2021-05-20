<template lang="pug">
  .cc-page
    <div class="cc-ranking">
      .layout-general
        .cc-ranking__inner
          header.cc-ranking__header.cc-header
            h1.cc-title RANKING DIARIO TRIVIA BECKER
            p.cc-ranking__header-txt Échale un ojo felino a la tabla de posiciones
              small.cc-ranking__header-txt_small Posiciones del día
            //- router-link(:to="'/'").cc-btn.cc-promo__btn Batir mi record
          ul.cc-ranking__list
            li.cc-ranking__item(v-for="item in rankingList")
              p.cc-ranking__name.i-dot-ranking {{ item.name }}
              span.cc-ranking__points {{ item.time | filterName }}
        p.cc-ranking__txt Todos los días regalaremos un premio de $10.000 en Pedidos Ya al primer lugar del Ranking.
    </div>
    .cc-promo
      p.cc-promo__title Si te dio sed
      a(href="https://www.casadelacerveza.cl/becker" target="_blank").cc-btn.cc-btn_secondary.cc-promo__btn.i-arrow-after Comprar becker aquí
</template>

<script>

import axios from "axios";

export default {
  name: 'Ranking',
  data () {
    return {
      finalTime: '01:50:08',
      totalPoints: '5.000',
      rankingList: [],
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
        url: "https://api.trivia-becker.cl/ab/trivia/ranking?_format=json",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        self.rankingList = response.data
      }, (error) => {
        console.log(error);
      });
    }
  },
}
</script>
