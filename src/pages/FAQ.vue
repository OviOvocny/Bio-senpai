<template>
  <section>
    <h2>Časté dotazy</h2>
    <p>
      <b>Tady najdete odpovědi na nejčastější dotazy v celé řadě kategorií.</b>
      Není to tak úplně pravda, že by byly nejčastější, protože se nás na nic z toho nikdo nikdy nezeptal.
      A teď, když jsou tady, tak se na ně nejspíš ani nikdo nezeptá.
    </p>
    <p>
      Pokud máte nějaký jiný dotaz nebo jen chcete něco říct, můžete využít stránku
      <router-link to="/kontakt">kontakt</router-link>, napsat nám na
      <a href="//facebook.com/bio-senpai">Facebooku</a> nebo na nás
      <a href="//twitter.com/bio_senpai">tweetnout</a>.
    </p>
    <div class="faq-search center-text">
      <h2>Prohledejte všechny dotazy...</h2>
      <input type="search" placeholder="Vyhledat dotaz" @input="searchFAQs">
    </div>
    <h2 class="center-text">...nebo vyberte kategorii</h2>
    <div class="faq-categories">
      <router-link replace v-for="cat in categories" :to="'/faq/' + cat.slug" :key="cat.slug" class="faq-category">
          <icon :symbol="cat.icon" class="faq-category__icon"></icon>
          <div class="faq-category__name">{{cat.category}}</div>
      </router-link>
    </div>
    <div ref="faqView" class="faq-category-view" v-if="results">
      <h3>{{results.category}}</h3>
      <article class="qa" v-for="qa in results.qa">
        <h4>{{qa[0]}}</h4>
        <bubble>
          <span v-html="qa[1]"></span>
        </bubble>
      </article>
    </div>
  </section>
</template>

<script>
import API from 'api'
import {union} from 'lodash'
import FuzzySearch from 'fuzzysearch-js'
import lfs from 'fuzzysearch-js/js/modules/LevenshteinFS'
import iofs from 'fuzzysearch-js/js/modules/IndexOfFS'
import wcfs from 'fuzzysearch-js/js/modules/WordCountFS'
export default {
  data () {
    return {
      categories: [],
      beforeSearch: '',
      found: []
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    selected () {
      return this.categories.filter(c => c.slug === this.$route.params.category)[0]
    },
    all () {
      return this.categories.map(c => c.qa).reduce((acc, current) => acc.concat(current))
    },
    results () {
      return this.found.length > 0 ? {
        category: 'Výsledky hledání',
        qa: this.found
      } : this.selected
    }
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('faqs')
        .order('category')
        .call()
        .then(res => {
          this.categories = res.data
        })
        .catch(err => {
          this.$emit('error', err)
        })
    },
    searchFAQs (e) {
      const val = e.target.value
      if (val === '') {
        this.$router.replace(this.beforeSearch)
      } else {
        this.$router.replace('/faq')
      }
      // Cancer
      let fs0 = new FuzzySearch(this.all.map(qa => qa[0]), {'minimumScore': 300})
      fs0.addModule(lfs({'maxDistanceTolerance': 3, 'factor': 3}))
      fs0.addModule(iofs({'minTermLength': 3, 'maxIterations': 500, 'factor': 3}))
      fs0.addModule(wcfs({'maxWordTolerance': 3, 'factor': 1}))
      let fs1 = new FuzzySearch(this.all.map(qa => qa[1]), {'minimumScore': 300})
      fs1.addModule(lfs({'maxDistanceTolerance': 3, 'factor': 3}))
      fs1.addModule(iofs({'minTermLength': 3, 'maxIterations': 500, 'factor': 3}))
      fs1.addModule(wcfs({'maxWordTolerance': 3, 'factor': 1}))
      let res0 = fs0.search(val)
      res0 = res0 ? res0.map(r => this.all.filter(qa => qa[0] === r.value)[0]) : []
      let res1 = fs1.search(val)
      res1 = res1 ? res1.map(r => this.all.filter(qa => qa[1] === r.value)[0]) : []
      let res = union(res0, res1)
      this.found = val === '' ? [] : res // this.all.filter(qa => qa[0].toLowerCase().includes(val.toLowerCase()) || qa[1].toLowerCase().includes(val.toLowerCase()))
    }
  },
  watch: {
    '$route' () {
      if (this.$route.params.category) {
        this.beforeSearch = this.$route.path
      }
    }
  }
}
</script>

<style lang="stylus">
.faq-category-view
  min-height calc(100vh - 180px)
  counter-reset i

.qa h4::before
  counter-increment i
  content counter(i)
  display inline-block
  background #eee
  color #111
  width 1.2em
  height 1.2em
  border-radius .6em
  text-align center
  line-height 1.2em
  margin-right .5em

.faq-categories
  display flex
  justify-content center
  flex-wrap wrap

.faq-category
  color #1e2430
  text-decoration none
  background-color white
  border-radius 15px
  text-align center
  width 120px
  margin 1em
  padding 1em
  &:visited
    color @color
  &:hover .faq-category__icon
    color hsl(150, 80%, 60%)
  &.router-link-active .faq-category__icon
    color white
    background-color hsl(150, 80%, 40%)

.faq-category__icon
  background-color #1e2430
  color white
  padding .4em
  font-size 2em
  border-radius @font-size
  margin-bottom .35em
  transition background-color .3s, color.2s

.faq-category__name
  font-size 1.1em

@media (max-width: 690px)
  .faq-category
    width 100%
    text-align left
    margin .5em

  .faq-category__icon
    font-size 1.3em
    margin-bottom 0
    margin-right .5em

  .faq-category__name
    font-size 1em
    display inline
</style>
