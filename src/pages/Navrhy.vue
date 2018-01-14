<template>
  <section>
    <!-- Search anilist -->
    <div class="anilist-wrap">
      <h2>Chtěli byste od nás překlad?</h2>
      <p>
        Pokud víte o anime, které potřebuje přeložit, můžete ho níže vyhledat a navrhnout k překladu našemu týmu (ne)trénovaných lenochů.
        Uvidíte je pak dole mezi ostatními návrhy.
      </p>
      <p v-if="noService">
        Stránka s návrhy bohužel offline nefunguje, protože je závislá na připojení k AniListu.
        Až se znovu připojíte, vraťte se a můžete navrhovat. Nebo napište <router-link to="/zpravy">do zpráv</router-link>.
      </p>
      <form v-if="!noService" class="center-text" @submit.prevent="fetchSearchResults">
        <input type="text" v-model="anilistSearch" placeholder="Najít anime...">
        <input type="submit" value="Hledat">
      </form>
      <p class="center-text" v-if="hentai">Ano, ty růžové jsou <span class="hentai"><icon symbol="brightness-3"></icon> hentai</span>. To je jen pro vaši informaci, nebojte se je navrhnout.</p>
      <isotope ref="searchiso" :list="results" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden}" v-show="results.length > 0">
        <anilist-anime v-for="result in results" :key="result.id" :anime="result" @done="resultDone" @click.native="handleSuggestion"></anilist-anime>
      </isotope>
    </div>
    <!-- Current suggestions -->
    <div v-if="!noService">
      <h2 ref="currentAnchor">Současné návrhy</h2>
      <p>
        Tady si můžete prohlédnout kartičky se vším, co jste nám již navrhnuli. Každá ukazuje aktualní stav návrhu a také odkazuje na
        AniList, kde si o daném anime můžete zjistit další informace.
      </p>
      <div class="center-text">
        <input class="searchfield" type="text" v-model="search" @input="$refs.iso.filter('text')" placeholder="Prohledat navržené...">
      </div>
      <isotope ref="iso" :list="suggestions" :options="isoOptions" :class="{'tiles': true, 'hidden': hidden}" v-show="suggestions.length > 0">
        <a class="tl-link" v-for="suggestion in suggestions" :data-dbid="suggestion.id" :key="suggestion.id" :href="'https://anilist.co/anime/' + suggestion.anime_id">
          <anilist-anime :anime="createAnimeObject(suggestion)" :status="suggestion.status" @done="cardDone"></anilist-anime>
        </a>
      </isotope>
    </div>
  </section>
</template>

<script>
import API from 'api'
import { anilistAPISearch } from '@/scripts/anilist'
import isotope from 'vueisotope'
import anilistAnime from '@/components/anilist-anime'

let suggestionCount = 0

function findAncestor (el, cls) {
  while (!el.classList.contains(cls)) {
    el = el.parentElement
  }
  return el
}

export default {
  submenu: ['Projekty', 'Návrhy', 'Podcast'],
  data () {
    let self = this
    return {
      noService: false,
      error: false,
      anilistSearch: '',
      results: [],
      hentai: false,
      suggestions: [],
      accepted: [],
      hidden: false,
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
        getSortData: {
          dbid (el) {
            return parseInt(el.id, 16)
          }
        },
        sortBy: 'dbid',
        sortAscending: false,
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
    createAnimeObject (s) {
      return {
        id: s.anime_id,
        title: {
          romaji: s.title
        },
        coverImage: {
          large: s.coverArt || ''
        },
        episodes: s.eps || 0,
        format: s.format || 'TV'
      }
    },
    // Get current suggestions
    fetchData () {
      this.$emit('error', false)
      new API('suggestions')
        .byIdDesc()
        .call()
        .then(res => {
          this.suggestions = res
          // Get IDS of already accepted anime
          new API('anime/anilist-ids').call().then(res => {
            this.accepted = res.anilistIds
          })
        })
        .catch(err => {
          this.$emit('error', err)
          this.noService = true
        })
    },
    fetchSearchResults () {
      this.results = []
      this.hentai = false
      // End if no query
      if (this.anilistSearch === '') {
        return
      }
      // Get results from anilist
      this.$emit('error', false)
      anilistAPISearch(this.anilistSearch)
        .then(res => {
          const data = res.data.data.Page
          console.log(data)
          const pageInfo = data.pageInfo
          const media = data.media
          if (pageInfo.total > 0) {
            let hiddenCount = 0
            this.hentai = media.filter(anime => anime.isAdult).length > 0
            media.forEach(anime => {
              if (this.suggestions.map(s => s.anime_id).includes(anime.id) || this.accepted.includes(anime.id)) {
                hiddenCount++
              } else {
                this.results.push(anime)
              }
            })
            if (hiddenCount > 0) {
              this.$emit('ticker', `Skryli jsme již navrhnuté nebo přijaté výsledky (${hiddenCount})`)
            }
          } else {
            this.$emit('ticker', 'Nic jsme nenašli')
          }
        })
        .catch(err => {
          console.error(err)
          this.$emit('error', err)
        })
    },
    cardDone () {
      if (++suggestionCount >= this.suggestions.length) {
        this.$refs.iso.layout()
      }
    },
    resultDone () {
      this.$refs.searchiso.layout()
    },
    handleSuggestion (e) {
      if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'A') return
      this.results = []
      this.hentai = false
      let target = findAncestor(e.target, 'tl')
      new API('suggestions')
        .body({
          anime_id: parseInt(target.dataset.animeid),
          coverArt: target.dataset.coverart,
          title: target.querySelector('.anime_title').innerHTML,
          status: 0
        })
        .call('post')
        .then(res => {
          this.$emit('ticker', 'Máme to, díky!', 'emoticon')
          this.fetchData()
          setTimeout(this.$refs.iso.layout, 500)
        })
        .catch(err => {
          console.error(err)
          this.$emit('error', 'Návrh se nepovedlo uložit')
        })
    }
  },
  components: {
    isotope,
    anilistAnime
  },
  beforeRouteLeave (to, from, next) {
    this.hidden = true
    setTimeout(next, 200)
  }
}
</script>

<style lang="stylus">
.anilist-wrap
  margin-bottom 2em

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
