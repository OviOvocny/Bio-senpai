<template>
  <transition-group
    :tag="tag"
    name="group"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
import translationMap from './maps/translation'
import dynamics from 'dynamics.js'
export default {
  props: {
    tag: String,
    back: Boolean,
    from: {
      type: String,
      default: 'bottom'
    },
    distance: {
      type: Number,
      default: 1
    },
    stagger: {
      type: Number,
      default: 0
    },
    noStaggerLeave: Boolean
  },
  computed: {
    translations () {
      return translationMap(this.distance, this.back)[this.from]
    }
  },
  methods: {
    beforeEnter (el) {
      dynamics.css(el, {
        opacity: 0,
        ...this.translations.beforeEnter
      })
    },
    enter (el, next) {
      el.style.transition = 'none'
      dynamics.animate(el, {
        opacity: 1,
        translateY: 0,
        translateX: 0
      }, {
        type: dynamics.spring,
        frequency: 220,
        friction: 170,
        duration: 700,
        delay: el.dataset.idx * this.stagger,
        complete: next
      })
    },
    afterEnter (el) {
      el.style = null
      this.$emit('after-enter')
    },
    leave (el, next) {
      el.style.transition = 'none'
      dynamics.animate(el, {
        opacity: 0,
        height: 0,
        ...this.translations.leave
      }, {
        type: dynamics.easeIn,
        friction: 200,
        duration: 100,
        delay: this.noStaggerLeave ? 0 : el.dataset.idx * this.stagger,
        complete: next
      })
    }
  }
}
</script>

<style lang="stylus">
.group-move:not(.immune)
  transition all .3s
</style>
