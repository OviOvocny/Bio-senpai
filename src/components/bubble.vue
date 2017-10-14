<template>
  <div :class="['bubble', {right}]">
    <div class="head" v-if="speaker">
      <cl-image :src="'team/' + speaker" width="50"></cl-image>
    </div>
    <div class="speech">
      <div class="speaker" v-if="speaker"><router-link :to="'/tym/' + speaker">{{speaker}}</router-link></div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    speaker: String,
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="stylus">
.bubble
  display flex
  position relative
  margin .5em 0
  margin-right 60px

.bubble.right
  right 0
  flex-direction row-reverse
  margin-right 0
  margin-left 50px

.head
  display flex
  align-items flex-end
  img
    border-radius 25px
    border 2px solid #eee
    width 50px
    animation scaleUp .5s cubic-bezier(.25,1.59,.45,.97) forwards

.speech
  background #eee
  color #111
  height auto
  margin 0 1em
  border-radius .5em .5em .5em 0
  position relative
  padding .5em 1em
  display flex
  flex-direction column
  align-items flex-start
  justify-content center
  animation slideInLeft .3s forwards
  a
    color hsl(150, 80%, 35%)
  a:visited
    color hsl(150, 80%, 25%)

.right .speech
  text-align right
  border-radius .5em .5em 0 .5em
  align-items flex-end
  animation slideInRight .3s forwards

.speech::before
  content: "";
  position: absolute;
  bottom: 0;
  left: -.5em;
  border-style: solid;
  border-width: 0 0 .5em .5em;
  border-color: transparent transparent #eee transparent;

.right .speech::before
  border-width .5em 0 0 .5em
  border-color transparent transparent transparent #eee
  right -.5em
  left initial

.speaker
  font-size .7em
  a
    color hsl(150, 80%, 25%)
  a:visited
    color hsl(150, 80%, 15%)

@keyframes slideInLeft
  from
    transform translateX(-50px) scale(.8)

@keyframes slideInRight
  from
    transform translateX(50px) scale(.8)

@keyframes scaleUp
  from
    transform scale(0)
</style>
