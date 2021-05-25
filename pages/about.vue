<template lang="pug">
  .l-container
    h1.p-ttl Kiyoshi Onodaのポートフォリオとブログと別冊。
</template>

<script>
import Meta from '../assets/js/mixin/meta'

export default {
  mixins: [Meta],
  data () {
    return {
      meta: {
        title: 'about',
        description: 'about page',
        type: 'article',
        url: '',
        image: ''
      }
    }
  }
}
</script>
