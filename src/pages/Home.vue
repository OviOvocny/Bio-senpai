<template>
  <section style="position:relative">
    <transition name="shift">
      <cl-image v-if="entered" class="top-anime__mascot" :src="'mascot/' + randomMascot" width="250"></cl-image>
    </transition>
    <div class="top-anime">
      <div class="top-anime__cover">
        <cl-image ref="topImage" v-if="ready" :src="'cover/' + home.anime.url_title"></cl-image>
      </div>
      <div class="top-anime--info">
        <h2 class="top-anime__title">
          <router-link :to="'/projekty/' + home.anime.url_title">{{home.anime.title}}</router-link>
        </h2>
        <span class="top-anime__episodes">Epizoda {{home.anime.eps.done}}</span>
        <h3>Vyšlo {{releasedTimeAgo}}</h3>
        <div class="top-anime--buttons">
          <btn variant="red" icon="download">Stáhnout video</btn>
          <btn icon="attachment">Externí titulky</btn>
          <router-link :to="'/stream/' + home.anime.url_title + '/' + home.anime.eps.done">
            <btn icon="play">Přehrát</btn>
          </router-link>
        </div>
      </div>
    </div>

    <div class="top-grid">
      <div class="top-grid--area top-grid__social">
        <h2>Pojďte prohodit pár slov</h2>
        <div class="social-links">
          <router-link to="/kontakt" class="social-links__native">
            <icon symbol="message"></icon>
            Zprávy
          </router-link>
          <a href="//facebook.com/bio-senpai" class="social-links__facebook">
            <icon symbol="facebook"></icon>
            Facebook
          </a>
          <a href="//twitter.com/" class="social-links__twitter">
            <icon symbol="twitter"></icon>
            Twitter
          </a>
        </div>
      </div>
      <div class="top-grid--area top-grid__yoimiru">
        <div class="yoimiru__flex">
          <div class="yoimiru__flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 60 60" xmlns:xlink="http://www.w3.org/1999/xlink"><desc>Yoimiru logo</desc><g fill="#1e2430" transform="translate(30 30)"><clipPath id="a" clip-rule="evenodd"><path d="M-30-30h60v60h-60v-60z"/></clipPath><g clip-path="url(#a)"><use xlink:href="#b" transform="translate(-22 -21)"/><use xlink:href="#c" transform="translate(.5 -19.5)"/><use xlink:href="#d" transform="translate(7.5 -18)"/></g></g><defs><path id="b" d="M4 39L0 0l7 .5L21 29c-2.4 4.6-4.2 7-8.5 10H4z"/><path id="c" d="M7 .5L0 0l5.5 13.5L7 .5z"/><path id="d" d="M11.5 39l3-39h-2C6.5 23.6 3.8 31.8 0 38l11.5 1z"/></defs></svg>
            <h2>Nejnovější epizody</h2>
          </div>
          <router-link to="/podcast">
            <btn icon="radio">Podcast</btn>
          </router-link>
        </div>
        <div class="yoimiru__ep" v-for="ep in home.podcast">
          <h3>{{ep.epName}}</h3>
          <p v-html="ep.epDesc"></p>
          <btn icon="play" @click="playEpisode(ep)">Přehrát</btn>
        </div>
      </div>
      <div class="top-grid--area top-grid__tegami">
        <h2>Tegami – umělá demence</h2>
        <p>
          Náš chat bot Tegami se za umělou inteligenci označit nedá, ale i tak jej máme rádi.
          Bez něj bychom si ani nevšimli, že nám píšete zprávy nebo navrhujete anime k překladu.
          <b>Pokud byste od něj také chtěli dostávat oznámení, můžete si ho přidat do kontaktů tlačítky dole.</b>
        </p>
        <div>
          <a href="https://join.skype.com/bot/283f634c-6815-4bcb-a3c9-4b711cb35665">
            <btn icon="skype">Přidat kontakt na Skype</btn>
          </a>
        </div>
        <div>
          <a href="https://www.messenger.com/t/1642204556087603">
            <btn icon="facebook-messenger">Kontaktovat na Messengeru</btn>
          </a>
        </div>
        <router-link class="tegami__details" to="/tegami">Podrobnosti o botu</router-link>
        <cl-image src="mascot/bot" :params="{width: 150, angle: 'hflip'}" class="tegami__mascot"></cl-image>
      </div>
    </div>

    <div class="top-news">
      <h2><icon symbol="newspaper"></icon> Co je nového</h2>
      <div class="top-news__grid">
        <article v-for="article in home.news">
          <div class="article__meta">
            <div class="article__author">
              <cl-image :src="'team/' + article.author"></cl-image>
              <h4>{{article.author}}</h4>
            </div>
            <div>
              {{articleDate(article.created)}}
            </div>
          </div>
          <h3>{{article.heading}}</h3>
          <p v-html="article.body.replace(/(?:\r\n|\r|\n)/g, '<br/>')"></p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
const randomMascotArray = [
  'melt', 'message', 'assfiles'
]

import API from 'api'
import moment from 'moment'
export default {
  data () {
    return {
      ready: false,
      entered: false,
      home: {
        anime: {
          eps: {}
        }
      }
    }
  },
  computed: {
    releasedTimeAgo () {
      return moment.unix(this.home.anime.updated).locale('cs').fromNow()
    },
    randomMascot () {
      return randomMascotArray[Math.floor(Math.random() * randomMascotArray.length)]
    }
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('utils/home')
        .call()
        .then(res => {
          this.home = res.data.results
          this.ready = true
        })
        .catch(err => {
          this.$emit('error', err)
        })
    },
    handleScroll () {
      if (window.matchMedia('(prefers-reduced-motion)').matches) return
      let percent = (20 / window.innerHeight) * window.pageYOffset * 2
      if (window.pageYOffset < window.innerHeight) this.$refs.topImage.$el.style.transform = `translateY(-${(20 - percent)}%)`
    },
    playEpisode (ep) {
      this.$emit('update:audio', `static/yoimiru/${ep.file}`)
      this.$emit('update:audio-meta', ep)
    },
    articleDate (timestamp) {
      return moment.unix(timestamp).locale('cs').format('LL')
    }
  },
  created () {
    this.fetchData()
    window.addEventListener('scroll', this.handleScroll, {passive: true})
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430

.top-grid
  display grid
  margin-bottom 2em
  // grid-gap 1em
  // grid-template-areas "yoimiru social" "yoimiru tegami"

// @media (max-width: 850px)
//   .top-grid
//     grid-template-areas "social" "yoimiru" "tegami"

.top-grid--area
  position relative
  background-color white
  border-radius 15px
  color bgcolor
  padding 1em

.top-grid__yoimiru
  // grid-area yoimiru
  grid-column 1
  grid-row-start 1
  grid-row span 2
  -ms-grid-row-span 2
  margin-right 1em
  svg
    margin-right .5em
.top-grid__social
  // grid-area social
  grid-column 2
  grid-row-start 1
  margin-bottom 1em
.top-grid__tegami
  // grid-area tegami
  grid-column 2
  grid-row-start 2

@media (max-width: 850px)
  .top-grid__yoimiru
    grid-column 1
    grid-row-start 2
    grid-row span 1
    -ms-grid-row-span 1
    margin-right 0
    margin-bottom 1em
  .top-grid__social
    grid-column 1
    grid-row-start 1
  .top-grid__tegami
    grid-column 1
    grid-row-start 3


.yoimiru__flex
  display flex
  justify-content space-between
  align-items center

@media (max-width: 1000px)
  .yoimiru__flex h2
    display none

.social-links
  display flex
  justify-content space-around
  & > *
    text-align center
    text-decoration none
    border-radius 10px
    padding 1em
    margin .5em
    transition border-color .2s
    flex-grow 1
    &:visited
      color white
    &:hover
      border-color white
.social-links__native
  color white
  background-color hsl(150, 80%, 40%)
  border 2px solid darken(@background-color, 50%)
.social-links__facebook
  color white
  background-color #3b5998
  border 2px solid darken(@background-color, 50%)
.social-links__twitter
  color white
  background-color #1da1f2
  border 2px solid darken(@background-color, 50%)

.top-grid__tegami
  padding-bottom 30px
  overflow hidden

.tegami__mascot
  position absolute
  right 0
  bottom -10%
  transform-origin bottom
  animation tegami 7s ease-in infinite
@media (prefers-reduced-motion)
  .tegami__mascot
    animation none
@keyframes tegami
  50%, 78%
    transform rotateZ(0) rotateY(0)
  53%, 58%, 63%, 68%, 75%
    transform rotateZ(0) rotateY(180deg)
  55%, 60%, 65%
    transform rotateZ(20deg) rotateY(180deg)

@media (max-width: 500px)
  .tegami__mascot
    display none

.tegami__details
  padding 1em
  padding-bottom 0
  color hsl(150, 80%, 20%)

.top-news__grid
  article
    padding 1em
    border-radius 15px
    background lighten(bgcolor, 15%)
    margin-bottom 1em
  h3
    margin-top 0

.article__meta
  display flex
  align-items center
  justify-content space-between

.article__author
  display flex
  align-items center
  img
    height 40px
    width @height
    border-radius (@height / 2)
    border 2px solid
    margin-right .75em

.top-anime
  position relative
  overflow hidden
  border-radius 15px 15px 0 0
  margin-top 1em
  margin-bottom 2em

.top-anime__mascot
  position absolute
  top -.5rem
  left -5%
  transition .5s

@media (max-width: 1200px)
  .top-anime__mascot
    left 3%
    top 10em
    transform translateY(-50%)
    width 20vw
@media (max-width: 600px), (orientation: portrait)
  .top-anime__mascot
    display none

.top-anime__cover
  position absolute
  height 100%
  max-height max-content
  overflow hidden
  z-index -1
  &::before
    content ""
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image linear-gradient(alpha(bgcolor, 60%) 0%, alpha(bgcolor, 90%) 50%, bgcolor 80%)
  img
    position relative
    z-index -1
    width 100%
    transform translateY(-20%)
    object-fit cover

.top-anime--info
  text-align right
  margin 2rem
  font-size calc(0.8rem + 0.25vw)
  & > *
    padding 0.3rem
    margin 0 1rem

.top-anime__title
  font-size 3em
  margin 0 .5rem
  font-family Unica One
  a
    color white
    text-decoration none

.top-anime__episodes
  display inline-block
  background-color white
  color bgcolor
  font-size 1.25em
  padding .3em .7em
  margin .5em 1em
  border-radius 1em

.top-anime--buttons
  padding 1rem 0
</style>
