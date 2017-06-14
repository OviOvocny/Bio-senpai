<template>
  <section>
    <h2 class="center-text">Zprávy</h2>
    <div class="comment-form-wrap">
      <comment-form :disabled="formDisabled" @send="handleMessage"></comment-form>
    </div>
    <div class="comment-threads">
      <transition-group name="shift-down">
        <comment-thread v-for="comment in comments" :message="comment" :key="comment.id" @reply="handleReply"></comment-thread>
      </transition-group>
    </div>
  </section>
</template>

<script>
import API from 'api'
import commentThread from '@/components/comment-thread'
import commentForm from '@/components/comment-form'
export default {
  data () {
    return {
      comments: [],
      formDisabled: false
    }
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('messages')
        .byIdDesc()
        .call()
        .then(res => {
          this.comments = res.data
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
        })
        .catch(err => {
          thread.formDisabled = false
          console.error(err)
          this.$emit('error', 'Odpověď se nepodařilo odeslat, zkuste to znovu')
        })
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    commentThread,
    commentForm
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
