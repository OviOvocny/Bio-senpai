<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
    :css="false"
    :mode="mode"
  >
    <slot></slot>
  </transition>
</template>

<script>
import dynamics from 'dynamics.js'
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    mode: String,
    from: {
      type: String,
      default: 'below'
    },
    distance: {
      type: Number,
      default: 1
    },
    twist: {
      type: Number,
      default: 0
    },
    stiffness: {
      type: Number,
      default: 120
    }
  },
  computed: {
    scaleOut () {
      return this.from === 'below' ? 1 - this.distance : 1 + this.distance
    }
  },
  methods: {
    beforeEnter (el) {
      if (!this.enabled) return
      dynamics.css(el, {
        opacity: 0,
        scale: this.scaleOut,
        rotate: `${this.twist}deg`
      })
    },
    enter (el, next) {
      if (!this.enabled) return
      dynamics.animate(el, {
        opacity: 1,
        scale: 1,
        rotate: 0
      }, {
        type: dynamics.spring,
        frequency: this.stiffness,
        friction: 170,
        duration: 700,
        complete: next
      })
    },
    afterEnter (el) {
      if (!this.enabled) return
      el.style = null
      this.$emit('after-enter')
    },
    leave (el, next) {
      if (!this.enabled) return
      dynamics.animate(el, {
        opacity: 0,
        scale: this.scaleOut
      }, {
        type: dynamics.easeIn,
        friction: 200,
        duration: 100,
        complete: next
      })
    }
  }
}
</script>
