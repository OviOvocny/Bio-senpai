<template>
  <div class="sticky" style="z-index:10">
    <router-link to="/" class="logo">
      <div>
        <svg width="30px" height="35px" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path id="BIO" d="M575.687472,867.358418 C746.512864,832.347977 875,681.178878 875,500 C875,292.893219 707.106781,125 500,125 C292.893219,125 125,292.893219 125,500 C125,681.177943 253.485809,832.346416 424.309883,867.357876 L262.367019,586.613277 C234.774069,538.778085 257.180327,500 312.410586,500 L687.587157,500 C742.818406,500 765.219736,538.784912 737.630724,586.613277 L575.687472,867.358418 Z M500,1000 C776.142375,1000 1000,776.142375 1000,500 C1000,223.857625 776.142375,0 500,0 C223.857625,0 0,223.857625 0,500 C0,776.142375 223.857625,1000 500,1000 Z" fill="#fff"></path>
          </g>
        </svg>
        <span>{{logotype}}</span>
      </div>
    </router-link>
    <header :style="{ backgroundImage: bg }">
      <div class="kec">
        <transition name="fade">
          <div class="kec-inner" v-if="quoteVisible">
            <q>{{quote.quote}}</q>
            <div class="author">{{quote.author}}</div>
          </div>
        </transition>
      </div>
      <slot></slot>
    </header>
  </div>
</template>

<script>
import cl from 'cloudinary-core'
import API from 'api'
import Stickyfill from 'stickyfill2'
export default {
  name: 'bio-header',
  data () {
    return {
      quote: {
        quote: 'To je ale blbost, co?',
        author: 'Tegami'
      },
      quoteVisible: true
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    Stickyfill.add(this.$el)
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      this.quoteVisible = false
      new API('quotes/random')
        .call()
        .then(res => {
          this.quote = res.data.quote
          this.quoteVisible = true
        })
        .catch(err => {
          console.error(err)
          this.quote = {
            quote: 'Citát nešlo načíst',
            author: 'Bio-senpai API'
          }
          this.quoteVisible = true
        })
    }
  },
  computed: {
    bg () {
      const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
      return `url(${c.url('header/header', {fetch_format: 'auto'})})`
    },
    logotype () {
      return Math.random() < 0.005 ? 'Bio-hentai' : 'Bio-senpai'
    }
  }
}
</script>

<style lang="stylus">
  .fade-enter-active
    transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
  .fade-leave-active
    transition .1s ease-in

  .fade-leave-to
    opacity 0
    transform translateX(-.2em)
  .fade-enter
    opacity 0
    transform translateX(.5em)

  .logo
    display block
    position fixed
    z-index 20
    left 15px
    text-decoration none
    div
      display flex
      align-items center
      span
        margin-left .2em
        color white
        font 1.5em Unica One
    &:focus
      animation pop .5s

  .sticky
    position -webkit-sticky
    position sticky

  header
    position sticky
    position -webkit-sticky
    height 200px
    background-color hsl(150, 80%, 80%)
    background-position center 20%
    background-size cover
    background-blend-mode luminosity
    transition height .3s .2s, background .2s
    z-index 10
    &::before
      content ""
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background-color hsl(150,80%,25%)
      background-image linear-gradient(black, transparent, black)
      //background-position center
      background-size 200%
      opacity .7
      z-index 0
      transition background .2s
    &.fullscreen
      height 100vh
      height calc(100vw * (9/16))
      max-height 100vh
      background-color transparent
      transition height .3s, background .2s .2s
      &::before
        background-color transparent
        background-size 100%
        transition background .2s .2s
      .kec
        opacity 0
        transform translateY(-100%)
  @media (orientation: landscape)
    .sticky
      top -140px
    .logo
      top 12px

  .kec
    position relative
    display table
    width 100%
    color white
    height 140px
    text-align right
    font-size 2em
    padding .25em 1em 0 30%
    line-height 1.2em
    transition opacity .3s .2s, transform .3s .2s
  .kec-inner
    display table-cell
    vertical-align middle
    q::before
      content '„'
    q::after
      content '“'
    .author
      font-size .7em
      &::before
        content '— '

  @media (max-width: 900px)
    .kec
      font-size 1.5em
  @media (max-width: 500px)
    .kec
      font-size 1.1em

  // mobile header

  @media (orientation: portrait)
    body
      padding-bottom 60px
    header
      width 100%
      height 60px
      position fixed
      bottom 0
    .logo
      bottom 12px
      span
        display none
    .kec
      display none
    .fullscreen-toggle
      display none
    nav ul
      padding-left 3em
      li
        border-bottom-color white
</style>
