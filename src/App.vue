<template>
  <div id="app">
    <error :error="error" @retry="reFetchView" @ignore="error = false"></error>
    <bio-header>
      <bio-nav :items="navItems"></bio-nav>
    </bio-header>
    <main>
      <submenu :items="subnav"></submenu>
      <transition :name="routeTransition" mode="out-in">
        <router-view
          ref="view"
          @update:subnav="val => subnav = val"
          @update:audio="updateAudio"
          @update:audio-meta="val => audioMeta = val"
          @error="updateError"
        ></router-view>
      </transition>
    </main>
    <audio-player :source="audioSource" :metadata="audioMeta" :active="audioActive" @close="updateAudio" autosave></audio-player>
    <bio-footer></bio-footer>
  </div>
</template>

<script>
import bioHeader from './components/bio-header'
import bioNav from './components/bio-nav'
import bioFooter from './components/bio-footer'
import audioPlayer from './components/audio-player'
import {navItems} from './router/routes'

export default {
  name: 'app',
  data: function () {
    return {
      navItems,
      subnav: [],
      routeTransition: 'shift',
      audioSource: '',
      audioMeta: {},
      error: false
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
    reFetchView () {
      this.$refs.view.fetchData()
    }
  },
  components: {
    'bio-header': bioHeader,
    'bio-nav': bioNav,
    'bio-footer': bioFooter,
    'audio-player': audioPlayer
  },
  watch: {
    '$route' (to, from) {
      switch (to.name) {
        case 'Překlad':
          this.routeTransition = 'zoom'
          break
        default:
          this.routeTransition = 'shift'
          break
      }
    }
  }
}
</script>

<style lang="stylus">
.shift-enter-active
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
  overflow hidden
.shift-leave-active
  transition .1s ease-in
  overflow hidden

.shift-leave-to
  opacity 0
  transform translateY(-1em)
.shift-enter
  opacity 0
  transform translateY(2em)

.zoom-enter-active
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
  overflow hidden
.zoom-leave-active
  transition .1s ease-in
  overflow hidden

.zoom-leave-to
  opacity 0
  transform scale(1.2)
.zoom-enter
  opacity 0
  transform scale(.8)

#app
  min-height 100vh
  padding-bottom 5em

*
  outline-color hsl(150, 80%, 50%)

@keyframes pop
  0%
    // transform scale(1.05)
    box-shadow 0 0 0 white // hsl(150,80%,50%)
  100%
    box-shadow 0 0 0 .7em transparent

bgcolor = #1e2430

@import url('https://fonts.googleapis.com/css?family=Unica+One|Noto+Sans&subset=latin-ext')
@import url('//cdn.materialdesignicons.com/1.5.54/css/materialdesignicons.min.css')

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

a
  display inline-block
  color green(60)
a:visited
  color green(40)

.no-scroll
  overflow-y hidden

main
  padding 1em
  width 100%
  max-width 1100px
  margin auto

input[type=text]
  border-radius 1em
  padding .3em .7em
  border 2px solid lighten(#1e2430, 30%)
  transition border-color .2s
  outline 0
  &:hover, &:focus
    animation pop .5s
    border-color hsl(150,80%,50%)
</style>
