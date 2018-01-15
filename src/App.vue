<template>
  <div id="app">
    <error :error="error" @retry="reFetchView" @ignore="error = false"></error>
    <ticker :ticker="ticker" :tickerIcon="tickerIcon" :buttons="tickerButtons" @ignore="ticker = false" :tickerTimeout="tickerTimeout"></ticker>
    <bio-header @error="updateError">
      <bio-nav :items="navItems"></bio-nav>
    </bio-header>
    <backdrop :src="backdropImage" :params="backdropParameters"></backdrop>
    <main>
      <submenu :items="subnav"></submenu>
      <transition-spring :distance="2" :stiffness="150" mode="out-in" @after-enter="$refs.view.entered = true">
        <router-view
          ref="view"
          @update:subnav="val => subnav = val"
          @update:audio="updateAudio"
          @update:audio-meta="val => audioMeta = val"
          @update:backdrop="updateBackdrop"
          @error="updateError"
          @ticker="updateTicker"
        ></router-view>
      </transition-spring>
    </main>
    <show-offline>
      <transition-spring from="left">
        <div class="offline-badge">
          <icon symbol="wifi-off"></icon>
        </div>
      </transition-spring>
    </show-offline>
    <audio-player :source="audioSource" :metadata="audioMeta" :active="audioActive" @close="updateAudio" autosave></audio-player>
    <bio-footer></bio-footer>
  </div>
</template>

<script>
import API from 'api'
import bioHeader from './components/bio-header'
import bioNav from './components/bio-nav'
import backdrop from './components/backdrop'
import bioFooter from './components/bio-footer'
import audioPlayer from './components/audio-player'
import showOffline from './components/show-offline'
import {navItems} from './router/routes'

export default {
  name: 'app',
  data: function () {
    return {
      navItems,
      subnav: [],
      audioSource: '',
      audioMeta: {},
      backdropImage: '',
      backdropParameters: {},
      error: false,
      ticker: false,
      tickerIcon: '',
      tickerButtons: [],
      tickerTimeout: 5000
    }
  },
  computed: {
    audioActive () {
      return Boolean(this.audioSource)
    }
  },
  methods: {
    updateAudio (val = '') {
      this.audioSource = val
    },
    updateError (val = false) {
      this.error = val
    },
    updateTicker (msg = false, icon = '', timeout = 5000, buttons = []) {
      this.ticker = msg
      this.tickerIcon = icon
      this.tickerButtons = buttons
      this.tickerTimeout = timeout
    },
    updateBackdrop (src = '', params = {}) {
      this.backdropImage = src
      this.backdropParameters = params
    },
    reFetchView () {
      this.$refs.view.fetchData()
    },
    retryPending () {
      if (navigator.onLine || !('onLine' in navigator)) {
        API.retryPending().then(res => {
          if (res === false) return
          this.updateTicker(`Odeslali jsme všechny čekající zprávy, přihlášky, apod.`, 'thumb-up')
        })
        .catch(err => {
          console.error(err)
        })
      }
    }
  },
  components: {
    bioHeader,
    bioNav,
    backdrop,
    bioFooter,
    audioPlayer,
    showOffline
  },
  watch: {
    '$route' (to, from) {
      this.retryPending()
      if (document.body.classList.contains('outdated-sw')) {
        this.updateTicker(
          'Pro dokončení aktualizace znovu načtěte stránku',
          'update',
          60000,
          [
            {
              label: 'Aktualizovat',
              icon: 'reload',
              action: () => window.location.reload()
            }
          ]
        )
      }
      switch (to.name) {
        case 'Překlad':
          this.routeTransition = 'zoom'
          break
        default:
          this.routeTransition = 'shift'
          break
      }
    }
  },
  created () {
    window.addEventListener('online', () => this.retryPending())
  }
}
</script>

<style lang="stylus">
.list-enter-active, .list-leave-active, .list-move
  transition all .3s
.list-enter, .list-leave-to
  opacity 0
  transform scale(.5)

#app
  min-height 100vh
  padding-bottom 5em

*
  outline-color hsl(150, 80%, 50%)

@media (min-width: 600px)
  p
    text-align justify

.center-text
  text-align center

.relative
  position relative

@keyframes pop
  0%
    // transform scale(1.05)
    box-shadow 0 0 0 white // hsl(150,80%,50%)
  100%
    box-shadow 0 0 0 .7em transparent

bgcolor = #1e2430

@import 'assets/font/noto-sans.css'
@import 'assets/font/unica-one.css'
@import '~mdi/css/materialdesignicons.min.css'

green(l)
  hsl(150, 80%, l)

ease-out-expo = cubic-bezier(0.190, 1.000, 0.220, 1.000)

*, *::before, *::after
  box-sizing border-box
::-moz-selection
  background green(60)
::selection
  background green(60)

body
  background bgcolor
  font-family Noto Sans
  color #eee
  -webkit-touch-callout none
  position relative
  min-height 100vh
  overflow-x hidden
  line-height normal
.super-ultra-party-mode
  animation supm 5s infinite
  background-image linear-gradient(rgba(206,106,255,.2) 0%,rgba(201,97,252,.2) 0%,rgba(95,255,255,.2) 34%,rgba(102,249,98,.2) 65%,rgba(255,96,96,.2) 100%,rgba(255,105,106,.2) 100%)

@keyframes supm
  to
    filter hue-rotate(1turn)

a
  display inline-block
  color green(60)
a:visited
  color green(40)

.no-scroll
  overflow-y hidden

.offline-badge
  position fixed
  position sticky
  bottom 1em
  left 1em
  text-align center
  width 2.5em
  height @width
  line-height @height - 0.2
  background-color hsl(350, 80%, 50%)
  border 2px solid darken(@background-color, 40%)
  border-radius 2em

main
  padding 1em
  width 100%
  max-width 1100px
  margin auto

input[type=text], input[type=search], input[type=number]
  border-radius 1em
  padding .3em .7em
  border 2px solid lighten(#1e2430, 30%)
  transition border-color .2s
  outline 0
  &:hover, &:focus
    animation pop .5s
    border-color hsl(150,80%,50%)

.radio-group
  border 0
  padding 0
  margin 1em 0
  label
    display inline-block
    cursor pointer
    margin .5em -3px
    padding 0.3em 1em
    border 2px solid #0a5c33
    background-color #14b866
    transition .2s
    &:nth-child(2)
      border-radius 2em 0 0 2em
    &:last-child
      border-radius 0 2em 2em 0
  input[type=radio]
    display none
    &:checked + label
      background-color lighten(#14b866, 50%)
      color #1e2430

.checkboxContainer
  height 1em
  margin 1em 0.3em
  display flex
  align-items center
  .checkboxLabel
    height 1.25em

.checkbox-hidden
  opacity 0
  width 0
  &:checked
    & + .checkbox
      background #19e680
      border-color #0f8a4d
      color #052e1a
      .checkboxIcons
        transform translateY(-1.25em)
        transform translateY(-1.25em)
  &:focus + .checkbox
    border-color white

.checkbox
  position relative
  display inline-flex
  align-items center
  overflow hidden
  justify-content center
  width 20px
  height 20px
  margin 0.3em
  border-radius 0.4em
  border-style solid
  border-width 2px
  border-color #8a0f38
  background #e6195d
  color #fad1df
  // box-shadow 0 0.2em 0.3em rgba(0,0,0,0.15)
  transition-property border, color, background-color, box-shadow
  transition-duration 0.15s
  &:hover
    // box-shadow 0 0.2em 0.5em rgba(0,0,0,0.25)
  &:active
    transform scale(0.8)
    transform scale(0.8)
    // box-shadow 0 0 0 0
    transition-duration 0.1s
  i
    cursor pointer

.checkboxIcons
  position absolute
  top 0
  left 0
  transition transform 0.3s
  .mdi
    display block
    height 20px

input[type=submit]
  font-family Noto Sans
  padding 0.3em 1em
  margin 0.3em
  border-radius 2em
  color #fff
  border-width 2px
  border-style solid
  border-color #0a5c33
  background-color #14b866
  outline none
  transition-property box-shadow, border-color, transform
  transition-duration: 0.5s
  &:focus
    &:not(:hover)
      border-color currentColor
      animation pop .5s
  &:hover
    &:not([disabled])
      border-color currentColor
      transition-duration 0.15s
  &:active
    transform scale(0.95)
    transition-duration 0.1s
</style>
