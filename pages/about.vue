<template lang="pug">
  .p-about
</template>

<script>
import Meta from '../assets/js/mixin/meta';

export default {
  mixins: [Meta],
  data () {
    return {
      meta: {
        title: 'about',
        description: 'about page',
        type: 'article',
        url: '',
        image: '',
      }
    }
  }
}
</script>
