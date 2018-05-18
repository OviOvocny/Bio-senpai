<template>
  <header>
    <div class="kec">
      <transition :name="highPerf ? 'fade' : 'none'" mode="out-in">
        <div class="kec-inner" :key="quote.quote">
          <q>{{quote.quote}}</q>
          <div class="author"><router-link :to="'/tym/' + quote.author">{{quote.author}}</router-link></div>
        </div>
      </transition>
    </div>
    <transition :name="highPerf ? 'fade' : 'none'" mode="out-in">
      <div class="hlava" v-if="quote.author !== 'Tegami'" :key="quote.author">
       <cl-image width="60" :src="'team/' + quote.author"></cl-image>
      </div>
    </transition>
  </header>
</template>

<script>
import API from 'api'
export default {
  name: 'bio-header',
  data () {
    return {
      quote: {
        quote: 'To je ale blbost, co?',
        author: 'Tegami'
      },
      quoteVisible: true,
      highPerf: localStorage.getItem('high-perf') === 'true' || !localStorage.getItem('high-perf')
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route (to, from) {
      if (to.name !== from.name) this.fetchData()
    }
  },
  methods: {
    fetchData () {
      this.quoteVisible = false
      const api = new API('quotes/random')
      api.offline()
        .then(res => {
          if (res === null) return
          this.quote = res.quote
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
      api.call()
        .then(res => {
          this.quote = res.quote
          this.quoteVisible = true
        })
        .catch(err => {
          console.error(err)
        })
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

header
  position relative
  margin 2em 0 4em 0
  display flex
  align-items center
  justify-content flex-end

.hlava
  img
    border 2px solid white
    border-radius 50%

.kec
  position relative
  width 100%
  color white
  text-align right
  font-size 2em
  padding 0 1em
  line-height 1.2em
  transition opacity .3s .2s, transform .3s .2s
.kec-inner
  q::before
    content '„'
  q::after
    content '“'
  .author
    font-size .7em
    &::before
      content '— '
    a
      color white
      text-decoration none
      &:visited
        color white

@media (max-width: 900px)
  .kec
    font-size 1.5em
  .hlava img
    width 60px
@media (max-width: 500px)
  .kec
    font-size 1.1em
  .hlava img
    width 40px
</style>
