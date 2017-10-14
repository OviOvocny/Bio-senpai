<template>
    <transition-group-spring tag="div" class="submenu" :stagger="60" noStaggerLeave>
      <router-link v-for="(item, index) in subnavItems" :to="item.to" :key="item.to" :data-idx="index">
        <icon :symbol="item.icon"></icon> {{item.label}}
      </router-link>
    </transition-group-spring>
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
        this.items.forEach(name => {
          if (item.label === name) result = true
        })
        return result
      })
    }
  }
}
</script>

<style lang="stylus">
.submenu
  margin-bottom 1em
  display flex
  justify-content center
  align-items center
  flex-wrap wrap-reverse
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
