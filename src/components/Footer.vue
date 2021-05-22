<template lang="pug">
  footer.cc-footer
    .cc-footer__layout
      .inner
        ul.cc-footer__nav
          li.cc-footer__nav-item.logo-footer
            router-link(:to="'/'")
              img.cc-footer__brand-logo(alt="Logo Becker" src="../assets/img/pilsen/logo-blanco.png")
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.ab-inbev.com" taget="_blank") <b>Anheuser-Busch InBev © 2020</b>
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.tapintoyourbeer.com/" taget="_blank") Tap into your beer
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="./documents/Terminos-y-Condiciones-para-BECKER.pdf") Términos y condiciones
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="./documents/Politicas-de-Privacidad-Landing-BECKER.pdf" target="_blank") Aviso de privacidad y política de uso
          li.cc-footer__nav-item
            a.cc-footer__nav-link(href="https://www.facebook.com/messages/t/becker.cl" taget="_blank") Contáctenos
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b>No compartas este contenido con menores de edad</b>
          li.cc-footer__nav-item
            p.cc-footer__nav-txt <b> Tomar bebidas con moderación</b>
    .cc-footer__social
      p.cc-footer__social-txt <b> Síguenos </b>
      ul.cc-footer__social-list
        li.cc-footer__social-item
          a(href="https://www.instagram.com/cerveza_becker/" alt="Síguenos en Instagram").cc-footer__social-link.i-instagram
        li.cc-footer__social-item
          a(href="https://www.facebook.com/becker.cl" alt="Síguenos en Facebook").cc-footer__social-link.i-facebook
        li.cc-footer__social-item
          a(href="https://www.youtube.com/user/cervezabecker" alt="Síguenos en Youtube").cc-footer__social-link.i-youtube
        li.cc-footer__social-item
          a(href="https://twitter.com/cerveza_becker" alt="Síguenos en Twitter").cc-footer__social-link.i-twitter

</template>

<script>

export default {
  name: 'Footer'
}
</script>
