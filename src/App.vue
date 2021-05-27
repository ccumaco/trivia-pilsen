<template lang="pug">
  <div id="app">
    //- <div id="nav">
    //-   router-link(to="/") Home |
    //-   router-link(to="/about") About
    //- </div>
    Navigation
    <router-view style="padding-top: 70px"/>
    Footer
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>

