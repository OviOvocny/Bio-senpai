<template>
  <footer>
      <div>
          <router-link to="/about" style="text-decoration:none">
            <div class="footer-title">Bio-senpai</div>
            <div class="version" v-if="fHana">{{fHana}} | {{fVersion}}</div>
          </router-link>
      </div>
      <div style="text-align:right">
          <div><router-link to="/about">O webu a licence</router-link></div>
          <div><a href="//www.ovi.moe">Ovi</a> {{year}}</div>
      </div>
  </footer>
</template>

<script>
import API from 'api'
export default {
  data () {
    return {
      onlineData: false,
      fHana: '',
      fVersion: '4'
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  },
  created () {
    this.fetchVersion()
  },
  methods: {
    fetchVersion () {
      const api = new API('changelogs')
        .byIdDesc()
        .limit(1)
      api.offline()
        .then(res => {
          if (res === null) return
          if (!this.onlineData) {
            this.fHana = res[0].hana
            this.fVersion = res[0].version
          }
        })
        .catch(err => {
          console.error(err)
        })
      api.call()
        .then(res => {
          this.onlineData = true
          this.fHana = res[0].hana
          this.fVersion = res[0].version
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="stylus">
f-color = hsl(220, 23%, 50%)

footer
  position absolute
  bottom .5em
  padding 0 1em
  left 0
  right 0
  width 100%
  //max-width 1100px
  margin auto
  color f-color
  font-size .9em
  display flex
  justify-content space-between
  align-items center

  a
    color f-color
  a:visited
    color f-color
  a:hover
    color hsl(150, 80%, 50%)

  ::selection
    color white

@media (orientation: portrait)
  footer
    bottom 70px

.footer-title
  font 1.3em Unica One
</style>
