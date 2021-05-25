# JAMstack with Nuxt.js

@nuxt/contentを使ってMarkdownなTypeScriptに静的ブログを開発。

See document @nuxt/content.

<a href="https://content.nuxtjs.org/ja/" target="_balnk">Contentとは</a>


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Setup @nuxt/content

```bash
npm install @nuxt/content
```

```js:nuxt.config.js
{
  modules: [
    '@nuxt/content'
  ],
}
```

