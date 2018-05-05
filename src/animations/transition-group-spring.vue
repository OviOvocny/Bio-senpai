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
    stiffness: {
      type: Number,
      default: 220
    },
    friction: {
      type: Number,
      default: 170
    },
    duration: {
      type: Number,
      default: 700
    },
    stretch: {
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
        transformOrigin: this.stretch !== 1 ? 'top' : 'center',
        opacity: 0,
        scaleY: this.stretch,
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
        frequency: this.stiffness,
        friction: this.friction,
        duration: this.duration,
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
        transformOrigin: this.stretch !== 1 ? 'top' : 'center',
        opacity: 0,
        scaleY: this.stretch,
        height: 0,
        ...this.translations.leave
      }, {
        type: dynamics.easeIn,
        friction: 20,
        duration: 70,
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
