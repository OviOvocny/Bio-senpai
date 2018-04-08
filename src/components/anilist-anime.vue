<template>
  <a :href="'https://anilist.co/anime/' + anime.id" class="tl-link">
    <div :style='{background: bg}' class="tl" @mousemove.passive="tilt">
      <div class="tl-title">
        <span :class="{hentai: anime.isAdult}"><icon v-if="anime.isAdult" symbol="brightness-3"></icon> <span class="anime_title">{{anime.title.romaji}}</span></span>
      </div>
      <div class="tl-info">
        <div v-if="status !== undefined" class="status" :style="{color: statusColor}">
          <icon :symbol="statusIcon"></icon>
          {{currentStatus}}
        </div>
        <div v-else class="preview">
          <btn @click.native="suggest">Navrhnout</btn>
        </div>
        <div class="eps">
          {{episodes}}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import tilt from '@/scripts/tilt'
export default {
  props: {
    anime: Object,
    status: Number
  },
  data () {
    return {}
  },
  computed: {
    banner () {
      return this.anime.bannerImage ? this.anime.bannerImage : this.anime.coverImage.large
    },
    bg () {
      return `linear-gradient(45deg, rgba(30,36,48,0.8), rgba(30,36,48,0.733), rgba(30,36,48,0.6)), url(${this.banner}) center / cover`
    },
    episodes () {
      if (this.anime.format === 'MOVIE') {
        return 'Film'
      } else {
        return this.anime.episodes
      }
    },
    currentStatus () {
      switch (this.status) {
        case -1: return 'Nejpíš ne'
        case 0: return 'Rozmýšlíme to'
        case 1: return 'Přeložíme to'
      }
    },
    statusIcon () {
      switch (this.status) {
        case -1: return 'thumb-down'
        case 0: return 'email-open'
        case 1: return 'thumb-up'
      }
    },
    statusColor () {
      switch (this.status) {
        case -1: return 'hsl(350, 80%, 50%)'
        case 0: return false
        case 1: return 'hsl(150, 70%, 60%)'
      }
    }
  },
  methods: {
    tilt,
    suggest (e) {
      e.stopPropagation()
      e.preventDefault()
      this.$emit('suggested', this.anime, this.banner)
    }
  }
}
</script>

<style lang="stylus">
.tl
  --tilt-x 0deg
  --tilt-y 0deg
  --parallax-x 0px
  --parallax-y 0px
  width 300px
  margin-bottom 30px
  border-radius 10px
  overflow hidden
  text-align center
  cursor pointer
  will-change transform
  outline 1px solid transparent
  transition .3s
  & > *
    transition .2s
  &:hover
    transition none
    transform perspective(700px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x))
    & > *
      transition none
      transform perspective(700px) translateY(calc(var(--parallax-y) * -1px)) translateX(calc(var(--parallax-x) * 1px))
    .tl-title
      text-shadow 0 0 1em // calc(var(--parallax-x) * -1px) calc(var(--parallax-y) * 1px) 1em
      transition box-shadow 0.2s
      transform perspective(700px) translateY(calc(var(--parallax-y) * -2px)) translateX(calc(var(--parallax-x) * 2px))

@media (max-width: 350px)
  .tl
    width 250px

.tl-title
  position relative
  top 0
  padding 0.5em
  color #fff
  font-size 1.3em
  transition 0.2s

.hentai
  color hsl(350, 80%, 70%)

.tl-info
  display flex
  justify-content space-between
  align-items center

.eps
  position relative
  display flex
  justify-content center
  align-items center
  margin-right 1em
  color #000
  background rgba(255,255,255,0.8)
  width 80px
  flex-shrink 0
  border-radius 40px
  font-size 1.3em
  padding 0.1em 0

.all-done
  background rgba(20,184,102,0.8)
  color #fff

.status, .preview
  margin 1em 0
  text-align left
  padding 0 1em
  color white

.preview
  margin .5em 0

.how-to
  font-size .7em
</style>
