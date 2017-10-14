export default function install (Vue) {
  Vue.mixin({
    created () {
      let sub = this.$options.submenu
      if (!sub) sub = []
      this.$emit('update:subnav', sub)
    }
  })
}
