<template>
  <div :class="['message', {reply}]">
    <div :class="['msg-infobar', {team}]">
      <div class="msg-info">
        <span class="msg-sender">{{sender}}</span>
        <span class="msg-time">{{humanTime}}</span>
      </div>
    </div>
    <div class="msg-contents" v-html="sanitizedText">
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import anchorme from 'anchorme'
export default {
  props: {
    text: String,
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
    },
    sanitizedText () {
      return anchorme(this.text.replace(/(?:\r\n|\r|\n)/g, '<br/>'))
    }
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430
fgcolor = lighten(bgcolor, 15%)

.message
  background fgcolor
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
  background hsl(220, 30%, 50%)
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
  font-weight bold
  margin 0 .3em
  padding-right .6em
  border-right 2px solid alpha(white, 30%)

.msg-time
  font-size .9em

.msg-contents
  position relative
  padding .5em 1em
  & img
    border-radius 5px
  &::before
    content: "";
    position: absolute;
    top: -.65em;
    left: 1em;
    border-style: solid;
    border-width: 0 0 .7em .7em;
    border-color: transparent transparent fgcolor transparent;
</style>
