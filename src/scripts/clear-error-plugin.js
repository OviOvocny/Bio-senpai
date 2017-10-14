export default function install (Vue) {
  Vue.mixin({
    created () {
      this.$emit('error', false)
    }
  })
}
