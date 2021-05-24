export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  mode: 'universal',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxtjs-ssg',
    titleTemplate: '%s - nuxtjs-ssg',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'nuxtjs-ssg' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://github.com/kiyoshion/nuxtjs-ssg' },
      { hid: 'og:title', property: 'og:title', content: 'nuxtjs-ssg' },
      { hid: 'og:description', property: 'og:description', content: 'This is Nuxt.js template.' },
      { hid: 'og:image', property: 'og:image', content: 'https://example.com/images/ogp/common.jpg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    middleware: 'update-page',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/app'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },

  generate: {
    fallback: true,
  }
}
