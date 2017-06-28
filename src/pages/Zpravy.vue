<template>
  <section>
    <h2 class="center-text">Zprávy</h2>
    <div class="comment-form-wrap">
      <comment-form :disabled="formDisabled" @send="handleMessage"></comment-form>
      <div v-if="pending.length > 0" class="pending-messages">
        <p class="center-text">
          <icon symbol="alert"></icon>
          Tyto zprávy se zatím nepodařilo poslat
        </p>
        <comment v-for="msg in pending" :key="msg.data.time" :text="msg.data.msg" :sender="msg.data.sender"></comment>
        <p>
          <btn variant="red" icon="autorenew" @click="retryPendingMessages">Zkusit znovu odeslat</btn>
        </p>
      </div>
    </div>
    <div class="comment-threads">
      <transition-group-spring :stagger="60" from="top">
        <comment-thread v-for="(comment, index) in comments" :message="comment" :key="comment.id" :data-idx="index % 10" @reply="handleReply" @replyOpen="scrollToThread"></comment-thread>
      </transition-group-spring>
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
import comment from '@/components/comment'
import commentThread from '@/components/comment-thread'
import commentForm from '@/components/comment-form'
import Infinite from 'vue-infinite-loading'
import nano from '@/scripts/nano-scroll'
export default {
  data () {
    return {
      comments: [],
      commentCount: 0,
      formDisabled: false,
      pending: []
    }
  },
  created () {
    this.updatePending()
  },
  methods: {
    fetchData () {
      if (this.comments.length > 0 && this.comments.length === this.commentCount) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        return
      }
      this.$emit('error', false)
      const api = new API('messages')
        .limit(10)
        .skip(this.comments.length)
        .order('time DESC')
      api.call()
        .then(res => {
          if (this.comments.length === 0) {
            new API('messages/count').call().then(res => {
              this.commentCount = res.count
            })
          }
          this.comments = this.comments.concat(res.results)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(err => {
          console.error(err)
          api.offline().then(res => {
            this.$emit('ticker', 'Jste offline. Možná tu chybí některé zprávy!')
            this.comments = this.comments.concat(res.results)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          })
          .catch(err => {
            console.error(err)
            this.$emit('error', new Error('Network Error'))
          })
        })
    },
    handleMessage (data) {
      this.$emit('error', false)
      this.formDisabled = true
      new API('messages')
        .body(data)
        .call('post')
        .then(res => {
          this.comments.unshift(res)
          this.$emit('ticker', 'Zpráva se uložila', 'emoticon')
          this.formDisabled = false
        })
        .catch(err => {
          this.formDisabled = false
          console.error(err)
          if (err.message === 'Network Error') {
            API.addPending('messages', data)
              .then(res => {
                this.$emit('ticker', 'Zpráva nešla odeslat, tak jsme ji uložili. Až to půjde, odešleme ji.', 'archive')
                this.updatePending()
              })
              .catch(err => {
                console.error(err)
                this.$emit('error', 'Zprávu se nepodařilo odeslat, zkuste to znovu.')
              })
          } else {
            this.$emit('error', 'Zprávu se nepodařilo odeslat, zkuste to znovu.')
          }
        })
    },
    handleReply (thread, data) {
      this.$emit('error', false)
      thread.formDisabled = true
      new API('messages/reply')
        .body(data)
        .call('post')
        .then(res => {
          thread.replies = res.results.replies
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
    updatePending () {
      API.getPending('messages').then(pending => {
        this.pending = pending
      })
    },
    retryPendingMessages () {
      API.retryPending('messages')
        .then(res => {
          res.resolved.forEach(r => {
            this.comments.unshift(r.data)
          })
          this.updatePending()
        })
        .catch(err => {
          console.error(err)
          this.$emit('error', 'Odesílání čekajících zpráv selhalo.')
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
    comment,
    commentThread,
    commentForm,
    Infinite
  }
}
</script>

<style lang="stylus">
.comment-form-wrap
  max-width 700px
  margin auto

.pending-messages
  .msg-infobar
    background-color hsl(350, 70%, 50%)
</style>
