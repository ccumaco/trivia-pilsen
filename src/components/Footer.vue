<template lang="pug">
  footer.cc-footer
    .cc-footer__social
      li.cc-footer__nav-item.logo-footer
        router-link(:to="'/'")
          img.cc-footer__brand-logo(alt="Logo Becker" src="../assets/img/pilsen/logo-blanco.svg")
    .cc-footer__layout
      .inner
        ul.cc-footer__nav
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.ab-inbev.com" taget="_blank") <b>Anheuser-Busch InBev © 2021</b>
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.tapintoyourbeer.com/" taget="_blank") <b>Tap into your beer</b>
          li.cc-footer__nav-item
            router-link(to="/terminos-condiciones").cc-footer__nav-link Términos y condiciones de campaña
          li.cc-footer__nav-item
            router-link(to="/politicas").cc-footer__nav-link Políticas de privacidad
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.abinbev.cl/contacto" taget="_blank") Contáctenos
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b>No compartas este contenido con menores de edad</b>
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b> Tomar bebidas con moderación</b>
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b> ¡SIGUENOS! </b>
          li.cc-footer__nav-item
            router-link(to="/bases").cc-footer__nav-link Bases del Pilsen del sur
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.abinbev.cl/terminos-y-condiciones" target="_blank") Términos y condiciones generales
    .cc-footer__social
      ul.cc-footer__social-list
        li.cc-footer__social-item
          a(href="https://www.instagram.com/pilsendelsur/" alt="Síguenos en Instagram").cc-footer__social-link <i class="fab fa-instagram"></i>
        li.cc-footer__social-item
          a(href="https://www.facebook.com/Pilsendelsur" alt="Síguenos en Facebook").cc-footer__social-link <i class="fab fa-facebook-f"></i>
        li.cc-footer__social-item
          a(href="https://www.youtube.com/channel/UC61vjd4wvg0BUr77G7ygo5Q" alt="Síguenos en Youtube").cc-footer__social-link <i class="fab fa-youtube"></i>
        li.cc-footer__social-item
          a(href="https://mobile.twitter.com/pilsendelsurcl?lang=en" alt="Síguenos en Twitter").cc-footer__social-link <i class="fab fa-twitter"></i>

</template>

<script>

export default {
  name: 'Footer'
}
</script>
