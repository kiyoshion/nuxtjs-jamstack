<template lang="pug">
  header.l-header
    .l-header__inner
      .l-header__logo
        nuxt-link(to="/") LOGO
      .l-header__menu
        .c-btn__menu(@click="toggleMenu")
          span
          span
          span
</template>

<script>
export default {
  methods: {
    toggleMenu () {
      this.$store.dispatch('nav/isMenu', !this.$store.state.nav.isMenu)
    }
  }
}
</script>
