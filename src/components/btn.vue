<template>
  <button :class="[variantClass, {'btn-icon-only': iconOnly}]" @click="$emit('click')">
    <icon v-if="icon" :symbol="icon"></icon>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: String,
    variant: {
      type: String,
      default: 'green'
    }
  },
  computed: {
    variantClass () {
      return `btn-${this.variant}`
    },
    iconOnly () {
      return !this.$slots.default
    }
  }
}
</script>

<style scoped lang="stylus">
  button
    font-family Noto Sans
    padding 0.3em 1em
    margin 0.3em
    border-radius 2em
    color #fff
    border-width 2px
    border-style solid
    outline none
    transition-property box-shadow, border-color, transform
    transition-duration: 0.5s
    &:focus
      &:not(:hover)
        border-color currentColor
        animation pop .5s
    &:hover
      &:not([disabled])
        border-color currentColor
        transition-duration 0.15s
    &:active
      transform scale(0.95)
      transition-duration 0.1s

  .btn-green
    &:not([disabled])
      border-color #0a5c33
      background-color #14b866

  .btn-red
    &:not([disabled])
      border-color #8a0f38
      background-color #e6195d

  .btn-icon-only
    font-size 1.5em
    padding 0em .3em

</style>
