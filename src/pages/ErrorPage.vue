<template>
  <section>
    <cl-image src="404nani" alt="NANI" width="500"></cl-image>
    <h2>Tady nic není...</h2>
    <h3>{{what}}</h3>
    <div class="suggestions" v-if="suggested.length > 0">
      <router-link v-for="(s, i) in suggested" :to="s.to" :key="i" class="s-link">
        <icon :symbol="s.icon"></icon>
        {{s.label}}
      </router-link>
    </div>
    <p class="center-text">
      Můžete také web projít sami a zksuit najít, co jste hledali.
    </p>
  </section>
</template>

<script>
import {allItems} from '@/router/routes'
import FuzzySearch from 'fuzzysearch-js'
import lfs from 'fuzzysearch-js/js/modules/LevenshteinFS'
import iofs from 'fuzzysearch-js/js/modules/IndexOfFS'
import wcfs from 'fuzzysearch-js/js/modules/WordCountFS'

export default {
  data () {
    return {
      what: '...a bohužel jsme nenašli žádnou stránku s podobným názvem.',
      suggested: []
    }
  },
  created () {
    let i = allItems.map(item => item.to)
    let fuzzySearch = new FuzzySearch(i, {'minimumScore': 300})
    fuzzySearch.addModule(lfs({'maxDistanceTolerance': 3, 'factor': 3}))
    fuzzySearch.addModule(iofs({'minTermLength': 3, 'maxIterations': 500, 'factor': 3}))
    fuzzySearch.addModule(wcfs({'maxWordTolerance': 3, 'factor': 1}))

    let result = fuzzySearch.search(this.$route.path).map(r => r.value)
    result = allItems.filter(item => result.includes(item.to) && item.icon)

    if (result.length === 1) {
      this.what = '...ale našli jsme stránku, kterou jste možná mysleli.'
    } else if (result.length > 1) {
      this.what = '...ale našli jsme nějaké stránky, které jste možná mysleli.'
    }

    this.suggested = result
  }
}
</script>

<style scoped lang="stylus">
  section
    text-align center
  .s-link
    display inline-block
    text-decoration none
    background-color #475674
    color white
    border-radius 2em
    text-align center
    margin .75em
    padding .5em 1em
    transition background-color .15s
    &:hover
      background-color hsl(150, 80%, 40%)
</style>
