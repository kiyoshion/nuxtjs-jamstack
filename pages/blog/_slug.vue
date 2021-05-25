<template lang="pug">
  .l-container
    h1.p-ttl {{ page.title }}
    p.p-date {{ page.updatedAt }}
    nuxt-content(:document="page")
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const page = await $content('blog', params.slug).fetch()

    return {
      page
    }
  }
}
</script>
