<template>
  <section>
    <h2 class="center-text">Zprávy</h2>
    <div class="comment-form-wrap">
      <comment-form :disabled="formDisabled" @send="handleMessage"></comment-form>
    </div>
    <div class="comment-threads">
      <transition-group name="shift-down">
        <comment-thread v-for="comment in comments" :message="comment" :key="comment.id" @reply="handleReply" @replyOpen="scrollToThread"></comment-thread>
      </transition-group>
      <infinite :on-infinite="fetchData" ref="infiniteLoading" spinner="waveDots">
        <span slot="no-more">
          <div style="color:white">Jste na konci. Nebo spíš na začátku.</div>
          <btn icon="arrow-up-bold" @click="elevator">Zpátky nahoru</btn>
        </span>
        <span slot="no-results">Tohle není konec. Ale bohužel se nám nepovedlo načíst zbytek. Poněkud trapné.</span>
      </infinite>
    </div>
  </section>
</template>

<script>
import API from 'api'
import commentThread from '@/components/comment-thread'
import commentForm from '@/components/comment-form'
import Infinite from 'vue-infinite-loading'
import nano from '@/scripts/nano-scroll'
export default {
  data () {
    return {
      comments: [],
      commentCount: 0,
      formDisabled: false
    }
  },
  methods: {
    fetchData () {
      if (this.comments.length > 0 && this.comments.length === this.commentCount) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        return
      }
      this.$emit('error', false)
      new API('messages')
        .limit(10)
        .skip(this.comments.length)
        .byIdDesc()
        .call()
        .then(res => {
          if (this.comments.length === 0) {
            new API('messages/count').call().then(res => {
              this.commentCount = res.data.count
            })
          }
          this.comments = this.comments.concat(res.data.results)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(err => {
          this.$emit('error', err)
        })
    },
    handleMessage (data) {
      this.$emit('error', false)
      this.formDisabled = true
      new API('messages')
        .body(data)
        .call('post')
        .then(res => {
          this.comments.unshift(res.data)
          this.$emit('ticker', 'Zpráva se uložila', 'emoticon')
          this.formDisabled = false
        })
        .catch(err => {
          this.formDisabled = false
          console.error(err)
          this.$emit('error', 'Zprávu se nepodařilo odeslat, zkuste to znovu')
        })
    },
    handleReply (thread, data) {
      this.$emit('error', false)
      thread.formDisabled = true
      new API('messages/reply')
        .body(data)
        .call('post')
        .then(res => {
          thread.replies = res.data.results.replies
          this.$emit('ticker', 'Odpověď se uložila', 'emoticon')
          thread.formDisabled = false
          thread.replying = false
          thread.showingAllReplies = true
        })
        .catch(err => {
          thread.formDisabled = false
          console.error(err)
          this.$emit('error', 'Odpověď se nepodařilo odeslat, zkuste to znovu')
        })
    },
    scrollToThread (offset) {
      nano(offset - window.innerHeight / 2)
    },
    elevator () {
      nano(0)
    }
  },
  components: {
    commentThread,
    commentForm,
    Infinite
  }
}
</script>

<style lang="stylus">
.shift-down-enter-active, .shift-down-move
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
.shift-down-leave-active
  transition .1s ease-in

.shift-down-leave-to
  opacity 0
  transform translateY(-1em)
.shift-down-enter
  opacity 0
  transform translateY(-2em)

.comment-form-wrap
  max-width 700px
  margin auto
</style>
