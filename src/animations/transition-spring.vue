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
        opacity: 0,
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
        friction: 170,
        duration: 700,
        complete: next
      })
    },
    afterEnter (el) {
      el.style = null
      this.$emit('after-enter')
    },
    leave (el, next) {
      dynamics.animate(el, {
        opacity: 0,
        ...this.translations.leave
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
