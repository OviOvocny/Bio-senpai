<template>
  <section>
    <div class="searchfield-wrap">
      <input class="searchfield" type="text" v-model="search" @input="$refs.iso.filter('text')" placeholder="Vyhledat..." autofocus>
    </div>
    <isotope ref="iso" :list="anime" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden, 'zooming': zooming}">
      <router-link class="tl-link" v-for="show in anime" v-if="!show.hidden" :key="show.url_title" :to="'/projekty/' + show.url_title">
        <anime :data="show"></anime>
      </router-link>
    </isotope>
  </section>
</template>

<script>
import API from 'api'
import isotope from 'vueisotope'
export default {
  submenu: ['Projekty', 'Návrhy', 'Podcast'],
  data () {
    let self = this
    return {
      error: false,
      anime: [],
      hidden: false,
      zooming: false,
      search: '',
      isoOptions: {
        itemSelector: '.tl',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 30
        },
        getFilterData: {
          text (el) {
            return el.title.toLowerCase().includes(self.search.toLowerCase())
          }
        },
        stagger: 20,
        hiddenStyle: {
          transform: 'scale(.5)',
          opacity: 0
        }
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('anime')
        .byIdDesc()
        .call()
        .then(res => {
          this.anime = res.data
        })
        .catch(err => {
          this.$emit('error', err)
        })
    }
  },
  components: {
    isotope
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Překlad') {
      this.zooming = true
    }
    this.hidden = true
    setTimeout(next, 200)
  }
}
</script>

<style lang="stylus">
.searchfield-wrap
  text-align center

.tiles
  padding 1em
  left 0
  right 0
  margin 1em auto
  will-change width
  transition width 0.5s

.hidden
  opacity 0
  transform translateY(-1em)
  transition .1s ease-in

.zooming
  transform scale(1.2)

.tl-link
  text-decoration none
  &:focus
    outline 0
    .tl
      outline 2px solid
      animation pop .5s
</style>
