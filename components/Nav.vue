<template lang="pug">
  nav.l-nav(:class="{ 'is-active': isMenu }")
    ul.l-nav__list
      li.l-nav__item(v-for="(link, i) in links" :key="i")
        nuxt-link.l-nav__link(:to="link.val") {{ link.name }}
</template>

<script>
export default {
  data () {
    return {
      links: [
        { name: 'TOP', val: '/' },
        { name: 'サイトについて', val: '/about' }
      ]
    }
  },
  computed: {
    isMenu () {
      return this.$store.state.nav.isMenu
    }
  }
}
</script>
