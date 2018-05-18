<template>
  <div>
    <button class="sidebar-toggle" @click="toggleNav"><icon :symbol="navToggle"></icon></button>
    <div :class="['sidebar', {sideHidden}]">
      <div :class="['sidebar-cta', {podcast}]" :style="{backgroundImage}">
        <router-link class="logo" to="/">
          <svg width="30px" height="35px" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path id="BIO" d="M575.687472,867.358418 C746.512864,832.347977 875,681.178878 875,500 C875,292.893219 707.106781,125 500,125 C292.893219,125 125,292.893219 125,500 C125,681.177943 253.485809,832.346416 424.309883,867.357876 L262.367019,586.613277 C234.774069,538.778085 257.180327,500 312.410586,500 L687.587157,500 C742.818406,500 765.219736,538.784912 737.630724,586.613277 L575.687472,867.358418 Z M500,1000 C776.142375,1000 1000,776.142375 1000,500 C1000,223.857625 776.142375,0 500,0 C223.857625,0 0,223.857625 0,500 C0,776.142375 223.857625,1000 500,1000 Z" fill="#fff"></path>
            </g>
          </svg>
          <span>{{logotype}}</span>
        </router-link>
        <div class="show" v-if="show">
          <cl-image :src="'charas/' + show.url_title"></cl-image>
          <router-link class="title" :to="'/projekty/' + show.url_title">{{shy(trim(show.title))}}</router-link>
        </div>
        <audio-player
          class="player"
          :source="audioSource"
          :metadata="audioMetadata"
          :active="podcast"
          @close="$emit('close')"
          autosave>
        </audio-player>
      </div>
      <div :class="['sidebar-main', {'sidebar-blur': highPerf}]">
        <nav>
          <ul>
            <li v-for="item in items" :key="item.label" >
              <router-link :to="item.to" @click.native="sideHidden = true">
                <icon :symbol="item.icon"></icon>
                <span>{{item.label}}</span>
              </router-link>
            </li>
          </ul>
          <div class="social">
            <a class="discord" href="//discord.gg/dcJ3E3y"><icon symbol="discord"></icon></a>
            <a class="twitter" href="//twitter.com/bio_senpai"><icon symbol="twitter"></icon></a>
            <a class="facebook" href="//facebook.com/bio-senpai"><icon symbol="facebook-box"></icon></a>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import audioPlayer from './audio-player'
import cl from 'cloudinary-core'
import collectFPS from 'collect-fps'

function shy (str) {
  const dict = [
    'ushina',
    'natsu',
    'jouka',
    'hana'
  ]
  return str.replace(new RegExp(`(${dict.join('|')})`, 'gi'), '$1\u00AD')
}

function trim (str, len = 50) {
  if (str.length < len) {
    return str
  }
  const cut = str.substring(0, len)
  return cut.substr(0, cut.lastIndexOf(' ')) + '\u2026'
}

function getUrl (src, params) {
  const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
  let parameters = {
    fetch_format: 'auto',
    width: 250,
    ...params
  }
  return c.url(src, parameters)
}

export default {
  name: 'bio-nav',
  data: function () {
    return {
      sideHidden: true,
      highPerf: localStorage.getItem('high-perf')
    }
  },
  props: {
    items: Array,
    show: Object,
    podcast: Boolean,
    audioSource: String,
    autosave: Boolean,
    audioMetadata: Object
  },
  computed: {
    navToggle: function () {
      return this.sideHidden ? 'menu' : 'backburger'
    },
    logotype () {
      return Math.random() < 0.01 ? 'Bio-hentai' : 'Bio-senpai'
    },
    backgroundImage () {
      if (this.podcast && this.audioMetadata) {
        return 'url("' + getUrl('podcast/icons/' + this.audioMetadata.file.substr(0, this.audioMetadata.file.length - 4)) + '")'
      } else if (this.show) {
        return 'url("' + getUrl('cover/' + this.show.url_title) + '")'
      } else {
        return 'none'
      }
    }
  },
  methods: {
    shy,
    trim,
    toggleNav () {
      const end = collectFPS()
      this.sideHidden = !this.sideHidden
      window.navigator.vibrate(40)
      setTimeout(() => {
        const fps = end()
        this.highPerf = fps > 40.0
        localStorage.setItem('high-perf', this.highPerf)
      }, 500)
    }
  },
  components: {
    audioPlayer
  }
}
</script>

<style lang="stylus">
  ease-out-expo = cubic-bezier(0.19, 1, 0.22, 1)

  .sidebar-toggle
    display none
    position fixed
    z-index 30
    bottom 1em
    right @bottom
    font-size 1.25rem
    width 2em
    height @width
    border-radius @height
    border 2px solid #1e2430
    color white
    background-color #374258
    cursor pointer
    animation yoo 1s 1s
    &:focus
      background-color #1f995c
    &:hover
      background-color #14b866

  @keyframes yoo
    30%
      transform scale(1.5)
      background-color #14b866

  offset = 1.5em

  .sidebar
    position fixed
    z-index 10
    top offset
    left offset
    transition transform .5s ease-out-expo
    a
      text-decoration none
      color inherit
      transition color .5s
      &:hover
        color #75f0b3
        transition none

  .sidebar-cta
    position relative
    display flex
    flex-direction column
    justify-content space-between
    background-color #104d2e
    background-position center
    background-size cover
    background-blend-mode luminosity
    height 200px
    width 13em
    padding-top 1em
    border-radius 10px 10px 0 0
    transition height .2s
    overflow hidden
    &::before
      content ''
      position absolute
      left 0
      top 0
      z-index 0
      border-radius inherit
      opacity .8
      width 100%
      height 100%
      //background-image linear-gradient(#14b866, #1f995c)
      background-image linear-gradient(hsl(150, 80%, 25%), hsl(150, 80%, 20%))
      transition opacity .5s
    a:hover
      color inherit

  .logo, .show
    position relative
    z-index 1
    font-family Unica One
  .player
    position relative
    z-index 1

  .logo
    display flex
    align-items center
    margin 0 auto
    span
      margin-left .2em
      font-size 1.5em

  .show
    display flex
    align-items flex-end
    justify-content space-between
    margin 0
    img
      max-width 120px
      animation left .7s ease-out-expo
    .title
      text-align right
      padding-bottom .75em
      margin-right @padding-bottom
      animation right .7s ease-out-expo

  .player
    display none
    padding .5em 1em


  @keyframes left
    from
      transform translateX(-100%)

  @keyframes right
    from
      transform translateX(100%)

  @keyframes tsf
    to
      transform translate(0)
      opacity 1

  @keyframes zmf
    to
      transform scale(1)
      opacity 1

  .sidebar-main
    position relative
    background-color #374258
    border-radius 0 0 10px 10px
    padding 1.5em

  @supports (backdrop-filter: blur(10px))
    .sidebar-blur
      background-color alpha(#374258, 60%)
      backdrop-filter blur(10px)


  nav
    ul
      list-style none
      margin 0
      padding 0
    li
      margin-bottom .97em
      &:last-child
        margin-bottom 0
      span
        margin-left .5em
      a.router-link-exact-active
        color #75f0b3

    .social
      margin-top 2em
      cursor default
      a
        opacity .8
        font-size 1.2em
        margin-right .75em
        transition opacity .5s, color .5s
        &:hover
          opacity 1


  .sidebar-cta.podcast
    background-color #40071A
    &::before
      background-image linear-gradient(#660B29, #40071A)
    .show
      display none
    .player
      display block
    &:hover input[type=range]
      height 4px


  @media (min-height: 28.01em) and (max-height: 40em), (max-width: 420px)
    .sidebar-cta
      height 4.25em
      &::before
        opacity 1
    .sidebar-cta.podcast
      padding-top .5em
      .logo
        display none
      .player
        .play
          width 1em
          height @width
          line-height @height
          padding 0
        .title
          & > div
            width 150px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .chapter
            display none
        .pod-time
          display none
    .pod-controls button
      animation-delay .1s
      &:nth-child(2)
        animation-delay .15s
      &:nth-child(3)
        animation-delay .2s
      &:nth-child(4)
        animation-delay .25s
    .show, .social //, .sidebar-cta.podcast .player
      display none


  @media (max-height: 28em) and (min-width: 420px)
    .sidebar
      display flex
    .sidebar-cta, .sidebar-main
      border-radius 10px
    .social
      display none
    .sidebar-main
      margin-left 1em
      height 200px
      overflow auto
      ul
        column-count 2
    nav a.active
      text-decoration underline



  @media (max-width: 700px), (max-height: 28em)
    .sidebar-toggle
      display block
    .sidebar.sideHidden
      transform translateX(-150%)

  @media (max-width: 530px)
    .sidebar-main ul
      column-count 1
      column-count initial

  @media (max-width: 420px) and (max-height: 28em)
    .sidebar
      top .5em
      left @top
    .sidebar-main
      max-width 13em
      padding .75em 1.5em
    nav
      span
        display none
      ul
        display flex
        justify-content center
        flex-wrap wrap
        font-size 1.3em
      li
        margin .5em
</style>
