<template>
  <div class="msg-container" :id="id">
    <comment :sender="sender" :time="time" :team="team">{{msg}}</comment>
    <transition-group name="shift-down">
      <comment reply v-for="reply in replies" :key="reply.msg" :sender="reply.sender" :time="reply.time" :team="reply.team">{{reply.msg}}</comment>
    </transition-group>

    <transition name="shift-down">
      <div class="reply-box" v-if="replying">
        <comment-form reply @send="handleReply" @cancel="replying = false" :disabled="formDisabled"></comment-form>
      </div>
    </transition>
    <div class="reply-btn-outer" v-show="!replying">
      <button class="reply-buttons reply-btn" @click="replying = true"><i class="mdi mdi-reply"></i> Odpovědět</button>
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
      ...this.message
    }
  },
  methods: {
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
</style>
