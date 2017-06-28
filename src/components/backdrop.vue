<template>
  <div ref="wrapper" class="backdrop-wrap">
  </div>
</template>

<script>
import cl from 'cloudinary-core'
function getUrl (src, params) {
  const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
  let parameters = {
    fetch_format: 'auto',
    quality: 90,
    effect: 'gradient_fade:20',
    background: '#1e2430',
    y: -0.9,
    opacity: 40,
    ...params
  }
  return c.url(src, parameters)
}

export default {
  props: {
    src: String,
    params: Object
  },
  methods: {
  },
  watch: {
    'src' () {
      const {wrapper} = this.$refs
      if (this.src === '') {
        wrapper.children[0].classList.add('hiding')
        setTimeout(() => {
          wrapper.removeChild(wrapper.children[0])
        }, 1000)
        return
      }
      const source = getUrl(this.src, this.params)
      const next = new Image()
      next.className = 'backdrop'
      next.addEventListener('load', () => {
        wrapper.appendChild(next)
        setTimeout(() => {
          if (wrapper.children.length > 1) wrapper.removeChild(wrapper.children[0])
        }, 1000)
      })
      next.src = source
    }
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430

.backdrop-fade-enter-active, .backdrop-fade-leave-active
  transition opacity 1s
.backdrop-fade-enter, .backdrop-fade-leave-to
  opacity 0

.backdrop-wrap
  position absolute
  z-index -1
  top 200px
  left 0
  width 100%
  //filter blur(0.3vw)
  //transform scale(1.05)

.backdrop
  position absolute
  top 0
  left 0
  width 100%
  animation backdropFadeIn 1s
  &.hiding
    transition opacity .6s
    opacity 0

@keyframes backdropFadeIn
  from
    opacity 0
    transform scale(1.1)

@media (orientation: portrait)
  .backdrop-wrap
    top 0

.backdrop-overlay
  position absolute
  width 100%
  background linear-gradient(alpha(bgcolor, 60%) 0%, alpha(bgcolor, 90%) 50%, bgcolor 80%)
</style>
