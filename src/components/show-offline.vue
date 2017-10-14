<template>
  <span v-if="offline">
    <slot></slot>
  </span>
</template>

<script>
let onlineEvent
let offlineEvent
export default {
  data () {
    return {
      offline: !navigator.onLine
    }
  },
  created () {
    onlineEvent = window.addEventListener('online', () => {
      this.offline = false
    })
    offlineEvent = window.addEventListener('offline', () => {
      this.offline = true
    })
  },
  destroyed () {
    window.removeEventListener('online', onlineEvent)
    window.removeEventListener('offline', offlineEvent)
  }
}
</script>
