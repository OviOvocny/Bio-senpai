<template>
    <div :style='{background: bg}' class="tl" @mousemove.passive="tilt" :data-animeID="id">
      <div class="title">
        <span :class="{hentai: anilistData.adult}"><icon v-if="anilistData.adult" symbol="brightness-3"></icon> <span class="anime_title">{{anilistData.title_romaji}}</span></span>
        <div class="how-to" v-if="status === undefined">Kliknutím navrhnete</div>
      </div>
      <div class="tl-info">
        <div v-if="status !== undefined" class="status" :style="{color: statusColor}">
          <icon :symbol="statusIcon"></icon>
          {{currentStatus}}
        </div>
        <div v-else class="preview">
          <a :href="'https://anilist.co/anime/' + this.id">
            <btn>Detail</btn>
          </a>
        </div>
        <div class="eps">
          {{episodes}}
        </div>
      </div>
    </div>
</template>

<script>
import tilt from '@/scripts/tilt'
import API from 'api'
export default {
  props: {
    id: Number,
    status: Number
  },
  data () {
    return {
      anilistData: {}
    }
  },
  computed: {
    bg () {
      const banner = this.anilistData.image_url_banner ? this.anilistData.image_url_banner : this.anilistData.image_url_lge
      return `linear-gradient(45deg, rgba(30,36,48,0.8), rgba(30,36,48,0.733), rgba(30,36,48,0.6)), url(${banner}) center / cover`
    },
    episodes () {
      if (this.anilistData.type === 'Movie') {
        return 'Film'
      } else {
        return this.anilistData.total_episodes
      }
    },
    currentStatus () {
      switch (this.status) {
        case -1: return 'Zámítá se'
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
        case 1: return 'hsl(150, 80%, 50%)'
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    tilt,
    fetchData () {
      const id = this.id
      new API(`anilist/show?id=${id}`)
        .call()
        .then(res => {
          this.anilistData = res.data.anime
          this.$emit('done')
        })
        .catch(err => {
          console.log(err)
        })
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
    .title
      text-shadow 0 0 1em // calc(var(--parallax-x) * -1px) calc(var(--parallax-y) * 1px) 1em
      transition box-shadow 0.2s
      transform perspective(700px) translateY(calc(var(--parallax-y) * -2px)) translateX(calc(var(--parallax-x) * 2px))

@media (max-width: 350px)
  .tl
    width 250px

.title
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
