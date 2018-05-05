<template>
  <transition name="slide-top">
    <div v-if="error" class="error-wrap">
      <span class="error">
        <icon :symbol="errorIcon"></icon>
        {{friendlyError}}
      </span>
      <btn variant="red" @click="$emit('retry')" icon="reload" v-if="canRetry">Zkusit znovu</btn>
      <btn force-small variant="red" @click="$emit('ignore')" icon="close"></btn>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    error: [Error, String, Boolean]
  },
  computed: {
    canRetry () {
      return this.error.message === 'Network Error'
    },
    friendlyError () {
      if (typeof this.error === 'string') {
        return this.error
      }
      if (this.error.message === 'Network Error') {
        return 'Se serverem API se nepodařilo spojit.'
      } else {
        return 'Něco se nepovedlo.'
      }
    },
    errorIcon () {
      if (this.error.message === 'Network Error') {
        return 'wifi-off'
      } else {
        return 'alert'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.error-wrap
  display flex
  align-items center
  flex-wrap wrap
  position fixed
  z-index 15
  top 1em
  left 0
  right 0
  width max-content
  max-width 80%
  margin auto
  padding .2em 1em
  border-radius 2em
  color hsl(340, 100%, 70%)
  border 2px solid hsl(340, 80%, 50%)
  background-color #1e2430
  animation pulse 2s infinite

@keyframes pulse
  from
    box-shadow 0 0 0 hsl(340, 80%, 50%)

  50%, 100%
    box-shadow 0 0 0 1em transparent

.error
  display inline-block
  margin 0 1em
  border-radius 1em

.slide-top-enter-active
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
.slide-top-leave-active
  transition .1s ease-in

.slide-top-leave-to
  opacity 0
  transform translateY(-100%)
.slide-top-enter
  opacity 0
  transform translateY(-100%)
</style>
