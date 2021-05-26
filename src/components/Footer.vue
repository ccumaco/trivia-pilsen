<template lang="pug">
  footer.cc-footer
    .cc-footer__social
      li.cc-footer__nav-item.logo-footer
        router-link(:to="'/'")
          img.cc-footer__brand-logo(alt="Logo Becker" src="../assets/img/pilsen/logo-blanco.png")
    .cc-footer__layout
      .inner
        ul.cc-footer__nav
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.ab-inbev.com" taget="_blank") <b>Anheuser-Busch InBev © 2020</b>
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.tapintoyourbeer.com/" taget="_blank") Tap into your beer
          li.cc-footer__nav-item
            router-link(to="/terminos-condiciones").cc-footer__nav-link Términos y condiciones
          li.cc-footer__nav-item
            router-link(to="/politicas").cc-footer__nav-link Aviso de privacidad y política de uso
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.facebook.com/messages/t/becker.cl" taget="_blank") Contáctenos
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b>No compartas este contenido con menores de edad</b>
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b> Tomar bebidas con moderación</b>
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b> ¡SIGUENOS! </b>
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
