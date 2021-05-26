<template lang="pug">
  .l-container
    h1.p-ttl 小野田のポートフォリオとブログと付録。
    p このサイトはエンジニアである小野田のポートフォリオであり、ブログとそれらに付随するリファレンスを完備した、1週間後には忘れているであろう小野田のための備忘録です。当サイトに記載されている内容は小野田個人の見解であり、所属する団体、全国の小野田さんとは一切関係ありません。
    h2 Blog
    p 小野田が忘れがちなことをJKにわかりやすくまとめています。
    h2 Work
    p 小野田がローンチしたアプリやサイトやツールです。
    h2 Dev
    p 小野田がやってみたアプリやサイトやツールです。おもにUdemyやUdemyなどです。
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
