<template>
  <section>
    <error :error="error" @retry="fetchData"></error>
    <div class="searchfield-wrap">
      <input class="searchfield" type="text" v-model="search" @input="$refs.iso.filter('text')" placeholder="Vyhledat..." autofocus>
      <div class="switches">
        <input type="radio" v-model="category" value="bio" id="category-bio">
        <label for="category-bio">Bio-senpai</label>
        <input type="radio" v-model="category" value="yoi" id="category-yoi">
        <label for="category-yoi">Yoimiru</label>
      </div>
    </div>
    <isotope ref="iso" :list="team" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden}">
      <member-card v-for="member in team" :data="member" :key="member.url_name"></member-card>
    </isotope>
  </section>
</template>

<script>
import API from 'api'
import isotope from 'vueisotope'
export default {
  submenu: ['/tym', '/prihlaska'],
  data () {
    let self = this
    return {
      error: false,
      hidden: false,
      team: [],
      category: 'bio',
      search: '',
      isoOptions: {
        itemSelector: '.member',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 30
        },
        getFilterData: {
          text (el) {
            return el.name.toLowerCase().includes(self.search.toLowerCase()) && el.categories.includes(self.category)
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
      new API('members')
        .call()
        .then(res => {
          this.team = res.data
          this.$refs.iso.filter('text')
        })
        .catch(err => {
          this.$emit('error', err)
        })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.hidden = true
    setTimeout(next, 200)
  },
  components: {
    isotope
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
