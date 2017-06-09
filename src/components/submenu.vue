<template>
  <div class="submenu" :style="{height: h}">
    <transition-group name="list">
      <router-link v-for="item in subnavItems" :to="item.to" :key="item.to">
        <icon :symbol="item.icon"></icon> {{item.label}}
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import {allItems} from '@/router/routes'
export default {
  props: {
    items: Array
  },
  computed: {
    subnavItems () {
      return allItems.filter(item => {
        let result = false
        this.items.forEach(path => {
          if (item.to === path) result = true
        })
        return result
      })
    },
    h () {
      if (this.subnavItems.length === 0) {
        return '0'
      } else {
        return '5em'
      }
    }
  }
}
</script>

<style lang="stylus">
.list-enter-active, .list-leave-active, .list-move
  transition all .3s
.list-enter, .list-leave-to
  opacity 0
  transform scale(.5)

.submenu
  display flex
  justify-content center
  align-items center
  flex-wrap wrap-reverse
  transition height .3s

  a
    display inline-block
    text-decoration none
    padding 1em
    font-size 1.2em
    position relative
    outline 0

    &:visited
      color #47eb99

    &::before
      display block
      position relative
      content ""
      width 100%
      height 3px
      background #47eb99
      top -.5em
      border-radius: 1.5px
      transform scaleX(0)
      transition transform .2s

    &:focus::before
      transform scaleX(.3)

    &.router-link-active::before, &:hover::before
      transform scaleX(1)

@media (max-width: 550px)
  .submenu a:not(.router-link-active), .submenu a:not(.router-link-active):visited
    color #eee
  .submenu a
    padding .5em
    &::before
      top -.2em
</style>
