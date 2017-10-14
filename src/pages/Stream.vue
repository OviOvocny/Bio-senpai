DEPRECATED

<template>
  <div>
    <h1>{{title}}</h1>
    <div class="video-wrap">
      <iframe id="plr" :src="'https://drive.google.com/file/d/' + file + '/preview'" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
import API from 'api'
export default {
  data () {
    return {
      file: '0BxQKLjvK-yiXZGZlVTdjWUxyQ2c',
      title: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('anime')
        .where('url_title', this.$route.params.anime)
        .limit(1)
        .call()
        .then(res => {
          let ep = this.$route.params.episode ? parseInt(this.$route.params.episode) - 1 : 0
          this.file = res[0].stream[ep]
          this.title = res[0].title
        })
        .catch(err => {
          this.$emit('error', err)
        })
    }
  }
}
</script>

<style lang="stylus">
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
