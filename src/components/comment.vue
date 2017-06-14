<template>
  <div :class="['message', {reply}]">
    <div :class="['msg-infobar', {team}]">
      <div class="msg-info">
        <span class="msg-sender">{{sender}}</span>
        {{humanTime}}
      </div>
    </div>
    <div class="msg-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    reply: {
      type: Boolean,
      default: false
    },
    sender: String,
    time: String,
    team: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    humanTime () {
      return this.time ? moment(this.time).locale('cs').fromNow() : null
    }
  }
}
</script>

<style lang="stylus">
.message
  background #eee
  border-radius 15px 15px 10px 10px
  text-align left
  position relative
  margin-top 2em
  &:hover .reply-buttons
    border-color #eee
  a
    color hsl(150, 80%, 35%)
  a:visited
    color hsl(150, 80%, 25%)
  &.reply
    margin-left calc(1em + 5%)
    margin-top .5em
    .reply-btn
      display none

.msg-info
  margin .5em 0

.msg-infobar
  background hsl(220, 23%, 35%)
  border-radius 10px 10px 0 0
  padding 0 1em
  padding-left 2em
  display flex
  align-items center
  flex-wrap wrap-reverse
  &.team
    background hsl(150, 70%, 40%)
  &.new-msg
    background hsl(220, 70%, 50%)

.msg-sender
  background #eee
  padding .1em .5em
  margin 0 .3em
  border-radius 1em
  color hsl(220, 23%, 25%)

.msg-contents
  position relative
  padding .5em 1em
  color #111
  &::before
    content: "";
    position: absolute;
    top: -.65em;
    left: 1em;
    border-style: solid;
    border-width: 0 0 .7em .7em;
    border-color: transparent transparent #eee transparent;
</style>
