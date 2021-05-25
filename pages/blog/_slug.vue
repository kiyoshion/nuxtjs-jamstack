<template lang="pug">
  .l-container
    h1.p-ttl {{ page.title }}
    p.p-date {{ page.updatedAt }}
    p.p-desc {{ page.description }}
    .p-toc
      ol.p-toc__list
        li(v-for="link of page.toc" :key="link.id" :class="['p-toc__item', `p-toc__item--${link.depth}`]")
          nuxt-link(:to="`#${link.id}`" class="p-toc__link") {{ link.text }}
    nuxt-content(:document="page")
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const page = await $content('blog', params.slug).fetch()
    /* eslint-disable-next-line */
    console.log(page)

    return {
      page
    }
  }
}
</script>
