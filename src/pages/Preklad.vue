<template>
  <section>
    <div :class="{'hero-wrap': true, 'revealed': heroVisible && heroLoaded}">
      <cl-image class="hero" :src="'cover/' + $route.params.anime" :alt="'Obal ' + project.title" @imageloaded="heroLoaded = true"></cl-image>
    </div>

    <h1 :class="{'hero-title': true, 'long': isLong}">{{project.title}}</h1>
    <div class="project-data-wrap">
      <span :class="{'project-data': true, 'episodes': true, 'complete': eps.done === eps.total}">
        {{epsVerbose}}
        <span v-if="eps.done < eps.total"> z {{eps.total}}</span>
      </span>
      <router-link class="project-data" v-for="tl in project.team.tl" :to="'/tym/' + tl" :key="tl">
        <icon symbol="translate"></icon> Překlad: {{tl}}
      </router-link>
      <router-link class="project-data" v-for="kor in project.team.kor" :to="'/tym/' + kor" :key="kor">
        <icon symbol="auto-fix"></icon> Korekce: {{kor}}
      </router-link>
    </div>

    <div class="project-card">
      <div class="actions" v-if="$route.name === 'Překlad'">
        <div class="actions-inner">
          <a tabindex="-1" :href="project.mega">
            <btn variant="red" icon="download">Přeložená videa</btn>
          </a>
          <a tabindex="-1" :href="'/static/data/' + project.url_title + '/ass.zip'" download>
            <btn icon="attachment">Všechny titulky</btn>
          </a>
        </div>
      </div>
      <transition-group name="list" tag="div" class="episode-list">
        <div class="episode" v-if="eps.done === 1 && !project.single_type" key="film">
          Film
          <div class="episode-actions">
            <a tabindex="-1" :href="`/static/data/${project.url_title}/[Bio-senpai] ${project.title}.ass`" download>
              <btn icon="attachment"></btn>
            </a>
            <router-link tabindex="-1" :to="`/stream/${project.url_title}`">
              <btn icon="play"></btn>
            </router-link>
          </div>
        </div>
        <div class="episode" v-else v-for="i in eps.done" :key="i">
          Epizoda {{i}}
          <div class="episode-actions">
            <a tabindex="-1" :href="`/static/data/${project.url_title}/[Bio-senpai] ${project.title} - Epizoda ${i}.ass`" download>
              <btn icon="attachment"></btn>
            </a>
            <router-link tabindex="-1" :to="`/stream/${project.url_title}/${i}`">
              <btn icon="play"></btn>
            </router-link>
          </div>
        </div>
      </transition-group>
      <div class="project-desc" v-if="$route.name === 'Překlad'">
        <div v-html="project.desc"></div>
        <div class="relatives" v-if="project.relatives">
          <div class="prequels" v-if="project.relatives.prequels">
            <h3>Předcházející:</h3>
            <router-link class="tl-link" v-for="prequel in prequelArr" :key="prequel" :to="'/projekty/' + prequel.url_title">
              <anime :data="prequel"></anime>
            </router-link>
          </div>
          <div class="sequels" v-if="project.relatives.sequels">
            <h3>Následující:</h3>
            <router-link class="tl-link" v-for="sequel in sequelArr" :key="sequel" :to="'/projekty/' + sequel.url_title">
              <anime :data="sequel"></anime>
            </router-link>
          </div>
          <div class="other" v-if="project.relatives.other">
            <h3>Související:</h3>
            <router-link class="tl-link" v-for="other in otherArr" :key="other" :to="'/projekty/' + other.url_title">
              <anime :data="other"></anime>
            </router-link>
          </div>
        </div>
      </div>
      <div class="project-stream" v-if="$route.name === 'Stream'">
        <div class="video-wrap">
          <iframe id="plr" :src="'https://drive.google.com/file/d/' + file + '/preview'" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import API from 'api'
export default {
  data () {
    return {
      error: false,
      project: {
        title: 'Hned to bude...',
        eps: {
          done: 0,
          total: 0
        },
        team: {
          tl: [],
          kor: []
        },
        stream: [],
        relatives: {}
      },
      relativeArr: [],
      heroVisible: false,
      heroLoaded: false
    }
  },
  mounted () {
    this.fetchData()
    setTimeout(() => {
      this.heroVisible = true
    }, 700)
  },
  beforeRouteLeave (to, from, next) {
    if (to.params.anime !== this.$route.params.anime) {
      this.heroVisible = false
      setTimeout(next, 200)
    } else {
      next()
    }
  },
  computed: {
    eps () {
      return {
        done: parseInt(this.project.eps.done),
        total: parseInt(this.project.eps.total)
      }
    },
    isLong () {
      return this.project.title.length > 30
    },
    epsVerbose () {
      if (this.project.single_type) {
        return this.project.single_type
      } else if (this.eps.total === 1) {
        return 'Film'
      } else if (this.eps.done === 1) {
        return this.eps.done + ' epizoda'
      } else if (this.eps.done > 1 && this.eps.done <= 4) {
        return this.eps.done + ' epizody'
      } else {
        return this.eps.done + ' epizod'
      }
    },
    prequelArr () {
      return this.relativeArr.filter(rel => this.project.relatives.prequels.includes(rel.url_title))
    },
    sequelArr () {
      return this.relativeArr.filter(rel => this.project.relatives.sequels.includes(rel.url_title))
    },
    otherArr () {
      return this.relativeArr.filter(rel => this.project.relatives.other.includes(rel.url_title))
    },
    file () {
      const ep = this.$route.params.episode ? parseInt(this.$route.params.episode) - 1 : 0
      return this.project.stream[ep]
    }
  },
  methods: {
    relativeData () {
      let apicall = new API('anime')
      if (this.project.relatives.prequels) {
        this.project.relatives.prequels.forEach(prequel => {
          apicall.where('url_title', prequel)
        })
      }
      if (this.project.relatives.sequels) {
        this.project.relatives.sequels.forEach(sequel => {
          apicall.where('url_title', sequel)
        })
      }
      if (this.project.relatives.other) {
        this.project.relatives.other.forEach(other => {
          apicall.where('url_title', other)
        })
      }
      apicall.call().then(res => {
        this.relativeArr = res.data
      }).catch(err => {
        this.$emit('error', err)
      })
    },
    fetchData () {
      this.$emit('error', false)
      new API('anime')
        .where('url_title', this.$route.params.anime)
        .limit(1)
        .call()
        .then(res => {
          this.project = res.data[0]
          document.title = `${this.project.title} | Bio-senpai`
          if (this.project.relatives) this.relativeData()
        })
        .catch(err => {
          this.$emit('error', err)
        })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.anime !== from.params.anime) {
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430

.project-desc
  padding 1em
  grid-area desc
  -ms-grid-column 2

.episode-list
  padding 1em
  border-right 2px solid bgcolor
  grid-area eps
  -ms-grid-row 2

.actions
  display flex
  align-items center
  padding 1em
  border-right 2px solid bgcolor
  grid-area actions
  -ms-grid-row 1

.actions-inner
  width 100%
  & > a
    display block
  button
    width 100%

.episode
  display flex
  align-items center
  justify-content space-between
  padding .5em 1em
  border-top 1px solid alpha(bgcolor, 50%)

.episode-actions
  margin-left 1em

.project-card
  background white
  color bgcolor
  border-radius 15px
  margin-top 1.5em
  margin-top calc(1em + 1vw)
  margin-bottom 3em
  display grid
  grid-template-areas "actions desc desc" \
                      "eps     desc desc"

@media (max-width: 625px)
  .project-card
    grid-template-areas "actions" \
                        "desc"    \
                        "eps"

  .episode-list, .actions
    border 0

  .project-desc
    -ms-grid-column 1
    -ms-grid-row 3

@supports not (display: -ms-grid)
  @media (min-width: 1055px)
    .project-card
      grid-template-areas "actions desc" \
                          "eps     eps"

    .actions
      margin 1em 0
      border-right 1px solid alpha(bgcolor, 50%)

    .episode-list
      border 0
      border-top 2px solid alpha(bgcolor, 100%)
      display grid
      grid-template-columns repeat(4, 1fr)

    .episode
      border 0
      border-right 1px solid alpha(bgcolor, 50%)
      &:nth-child(4n)
        border 0

.project-data-wrap
  text-align center

.project-data
  display inline-block
  background white
  color bgcolor
  border-radius 1em
  padding .3em 1em
  margin 0 .5em 1em .5em
  text-decoration none
  &.episodes
    background transparent
    color white
    padding .2em .9em
    border .1em solid white
    &.complete
      border-color hsl(150, 80%, 50%)

.hero-wrap
  position absolute
  z-index -1
  top 200px
  left 0
  width 100%
  opacity 0
  //filter blur(0.3vw)
  //transform scale(1.05)
  transition opacity .2s
  &::before
    content ''
    position absolute
    width 100%
    height 100%
    background linear-gradient(alpha(bgcolor, 60%) 0%, alpha(bgcolor, 90%) 50%, bgcolor 80%)
  &.revealed
    opacity 1
    transition opacity 1s

.hero
  width 100%

@media (orientation: portrait)
  .hero-wrap
    top 0

.hero-title
  font-size 3em
  font-size calc(1.5em + 1.5vw)
  margin .5em
  padding 0.3em
  text-align center
  font-family Unica One
  // border solid
  // border-width 1px 0
  &.long
    font-size calc(1.5em + 1vw)

.tl-link
  text-decoration none

.project-stream
  padding 1em
  padding-bottom 2.5em
  grid-area desc

@supports not (display: -ms-grid)
  @media (min-width: 1055px)
    .project-stream
      grid-column 1 / span 2


    .video-wrap
      position relative
      padding-bottom 54% /* 16:9 */
      padding-top 25px
      height 0
    
    .video-wrap iframe
      position absolute
      top 0
      left 0
      width 100%
      height 100%
</style>
