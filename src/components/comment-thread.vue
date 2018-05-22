<template>
  <div class="msg-container" :id="id">
    <comment :sender="sender" :time="time" :team="team" :text="msg"></comment>
    <transition-group-spring back from="top" 
      :distance="2" 
      :stiffness="0"
      :friction="170"
      :duration="250"
      :stagger="60">
      <comment reply v-for="(reply, index) in shownReplies" 
        :key="reply.msg"
        :data-idx="index % 10 - maxCompactReplies"
        :sender="reply.sender" 
        :time="reply.time" 
        :team="reply.team" 
        :text="reply.msg"></comment>
    </transition-group-spring>
    <div class="hidden-hint"
         v-if="replies.length > maxCompactReplies && !showingAllReplies && !replying"
         @click="showingAllReplies = !showingAllReplies"
    >
      Kliknutím zobrazíte zbytek odpovědí (celkem {{remainingReplies}})
    </div>

    <transition-spring back from="top" 
      :distance="4" 
      :stiffness="0"
      :friction="170"
      :duration="250"
      :stretch="1.1">
      <div class="reply-box" v-if="replying" ref="replyBoxRef">
        <comment-form reply
                      @send="handleReply"
                      @cancel="replying = false"
                      @mount="initReply"
                      :disabled="formDisabled"
        ></comment-form>
      </div>
    </transition-spring>
    <div class="reply-btn-outer" v-show="!replying">
      <button v-if="replies.length > maxCompactReplies"
              class="reply-buttons reply-btn"
              @click="showingAllReplies = !showingAllReplies"
      >
        <icon symbol="format-line-weight"></icon> {{allRepliesLabel}}
      </button>
      <button class="reply-buttons reply-btn" @click="replying = true"><icon symbol="reply"></icon> Odpovědět</button>
    </div>
  </div>
</template>

<script>
import comment from '@/components/comment'
import commentForm from '@/components/comment-form'
export default {
  props: {
    message: Object
  },
  data () {
    return {
      replying: false,
      formDisabled: false,
      maxCompactReplies: 3,
      showingAllReplies: false,
      ...this.message
    }
  },
  computed: {
    sortedReplies () {
      return this.replies.sort((a, b) => a.time - b.time)
    },
    shownReplies () {
      return this.showingAllReplies || this.replying ? this.sortedReplies : this.sortedReplies.slice(0, this.maxCompactReplies)
    },
    allRepliesLabel () {
      return this.showingAllReplies ? `Skrýt ostatní odpovědi (celkem ${this.remainingReplies})` : 'Všechny odpovědi'
    },
    remainingReplies () {
      return this.replies.length - 3
    }
  },
  methods: {
    initReply () {
      this.$emit('replyOpen', this.$refs.replyBoxRef.offsetTop)
    },
    handleReply (data) {
      delete data.replies
      this.$emit('reply', this, {reply: data, parentId: this.id})
    }
  },
  components: {
    comment,
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

.msg-container
  background linear-gradient(to bottom, transparent 3%, hsl(220, 23%, 25%) 3%, transparent)

.reply-btn-outer
  text-align right
  &:hover .reply-buttons
    border-color #eee

.reply-buttons
  outline 0
  background none
  border-radius 2em
  color #eee
  border 2px solid
  border-color transparent
  font-size .8em
  padding .2em .7em
  margin .5em
  transition .2s
  user-select none
  &:hover, &:focus
    background #eee
    color hsl(220, 23%, 25%)

.reply-box
  padding 1em
  margin-left calc(1em + 5%)

.hidden-hint
  cursor pointer
  background-color hsl(220, 23%, 35%)
  margin-left calc(1em + 5%)
  margin-top .5em
  padding 1em
  border-radius 15px
  text-align left
  position relative
</style>
