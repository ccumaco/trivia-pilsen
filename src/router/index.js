import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registro from '../views/Registro.vue'
import AgeGate from '../views/AgeGate.vue'
import Trivia from '../views/Trivia.vue'
import Message from '../views/Message.vue'
import NotFound from '../views/404.vue'
import TerminosCondiciones from '../views/TerminosCondiciones.vue'
import Ranking from '../views/Ranking.vue'
import WithoutTime from '../views/WithoutTime.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/age-gate',
    name: 'AgeGate',
    component: AgeGate
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/trivia',
    name: 'Trivia',
    component: Trivia
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/terminos-condiciones',
    name: 'TerminosCondiciones',
    component: TerminosCondiciones
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/sin-tiempo',
    name: 'WithoutTime',
    component: WithoutTime
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewHome.vue')
  },
  {
    path: '/congratulations',
    name: 'congratulations',
    component: () => import(/* webpackChunkName: "about" */ '../views/Congratulations.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  { path: '*', component: NotFound},
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function splitLocation() {
  sessionStorage.utm = window.location.search;

  if ((sessionStorage.utm.startsWith('?fbclid=')) || (sessionStorage.utm.startsWith('fbclid'))) {
    var utmFB = sessionStorage.utm.split("=")
    sessionStorage.isUtmFb = true
    sessionStorage.utmFb = utmFB[1]
  } else {
    var utmTotal = sessionStorage.utm.split("&")
    var v1 = utmTotal[0].split('=');
    sessionStorage.v1 = v1[1];

    var v2 = utmTotal[1].split('=');
    sessionStorage.v2 = v2[1];

    var v3 = utmTotal[2].split('=');
    sessionStorage.v3 = v3[1];

    if(utmTotal.length >= 4){
      var v4 = utmTotal[3].split('=');
      sessionStorage.v4 = v4[1];
    } else {
      sessionStorage.v4 = '';
    }
  }
}

router.beforeEach((to, from, next) => {

  if ((to.name == 'TerminosCondiciones')) {
    next()
  }
  else if (to.name !== 'AgeGate' && (!sessionStorage.ageX && !localStorage.age)) {
    sessionStorage.toNameDestino = to.name;
    if(window.location.search!=='') {
      splitLocation();
    }
    if(sessionStorage.isUtmFb) {
      next({ name: 'AgeGate', query: { fbclid: sessionStorage.utmFb}})
    } else {
      if(sessionStorage.v4 == ''){
        next()
         //{ name: 'AgeGate', query: { utm_source: sessionStorage.v1, utm_medium: sessionStorage.v2, utm_campaign: sessionStorage.v3 }}
      } else {
         //{ name: 'AgeGate', query: { utm_source: sessionStorage.v1, utm_medium: sessionStorage.v2, utm_campaign: sessionStorage.v3, utm_content: sessionStorage.v4 }}
        next()
      }
    }
  } else if (((to.name == 'Trivia') || (to.name == 'Message') || (to.name == 'Registro') || (to.name == 'WithoutTime')) && (to.params.mail === undefined)) {
      next()
      // { name: 'Home' }
  } else {
    if(window.location.search!=='') {
      splitLocation();
    }
    next()
  }
})

export default router