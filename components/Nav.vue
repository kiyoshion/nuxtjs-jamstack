<template lang="pug">
  nav.l-nav(:class="{ 'is-active': isMenu }" @click="toggleMenu")
    .l-nav__inner
      ul.l-nav__list
        li.l-nav__item(v-for="(link, i) in links" :key="i")
          nuxt-link.l-nav__link(:to="link.val") {{ link.name }}
</template>

<script>
export default {
  data () {
    return {
      links: [
        { name: 'Home', val: '/' },
        { name: 'Work', val: '/work' },
        { name: 'Dev', val: '/dev' },
        { name: 'Blog', val: '/blog' },
        { name: 'About', val: '/about' }
      ]
    }
  },
  computed: {
    isMenu () {
      return this.$store.state.nav.isMenu
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('nav/isMenu', false)
    }
  }
}
</script>
