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
import translationMap from './maps/translation'
import dynamics from 'dynamics.js'
export default {
  props: {
    mode: String,
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
    }
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
      dynamics.animate(el, {
        opacity: 1,
        translateY: 0,
        translateX: 0
      }, {
        type: dynamics.spring,
        frequency: this.stiffness,
        friction: this.friction,
        duration: this.duration,
        complete: next
      })
    },
    afterEnter (el) {
      el.style = null
      this.$emit('after-enter')
    },
    leave (el, next) {
      dynamics.animate(el, {
        transformOrigin: this.stretch !== 1 ? 'top' : 'center',
        opacity: 0,
        scaleY: this.stretch,
        ...this.translations.leave
      }, {
        type: dynamics.easeIn,
        friction: 20,
        duration: 70,
        complete: next
      })
    }
  }
}
</script>
