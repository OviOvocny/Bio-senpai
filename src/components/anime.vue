<template>
    <div :style='{background: bg}' class="tl" @mousemove.passive="tilt">
      <div class="tl-title">{{data.title}}</div>
      <div class="tl-info">
        <div class="people">
          <div class="person" v-for="tl in data.team.tl">
            <icon symbol="translate"></icon>
            <span>{{tl}}</span>
          </div>
          <div class="person" v-for="kor in data.team.kor">
            <icon symbol="auto-fix"></icon>
            <span>{{kor}}</span>
          </div>
        </div>
        <div :class="{'all-done': isDone, 'eps': true}">
          {{episodes}}
        </div>
      </div>
    </div>
</template>

<script>
import cl from 'cloudinary-core'
import tilt from '@/scripts/tilt'
export default {
  props: {
    data: Object
  },
  computed: {
    bg () {
      const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
      const clURL = c.url('cover/' + this.data.url_title, {fetch_format: 'auto', crop: 'scale', width: 300})
      return `linear-gradient(45deg, rgba(30,36,48,0.8), rgba(30,36,48,0.733), rgba(30,36,48,0.6)), url(${clURL}) top / cover`
    },
    isDone () {
      return this.data.eps.done === this.data.eps.total
    },
    episodes () {
      if (this.data.single_type) {
        return this.data.single_type
      } else if (parseInt(this.data.eps.total) === 1) {
        return 'Film'
      } else if (parseInt(this.data.eps.done) < parseInt(this.data.eps.total)) {
        return `${this.data.eps.done}/${this.data.eps.total}`
      } else {
        return this.data.eps.done
      }
    }
  },
  methods: {
    tilt
  }
}
</script>

<style lang="stylus">
.tl
  --tilt-x 0deg
  --tilt-y 0deg
  --parallax-x 0px
  --parallax-y 0px
  width 300px
  margin-bottom 30px
  border-radius 10px
  overflow hidden
  text-align center
  cursor pointer
  will-change transform
  outline 1px solid transparent
  transition .3s
  & > *
    transition .2s
  &:hover
    transition none
    transform perspective(700px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x))
    & > *
      transition none
      transform perspective(700px) translateY(calc(var(--parallax-y) * -1px)) translateX(calc(var(--parallax-x) * 1px))
    .tl-title
      text-shadow 0 0 1em // calc(var(--parallax-x) * -1px) calc(var(--parallax-y) * 1px) 1em
      transition box-shadow 0.2s
      transform perspective(700px) translateY(calc(var(--parallax-y) * -2px)) translateX(calc(var(--parallax-x) * 2px))

@media (max-width: 350px)
  .tl
    width 250px

.tl-title
  position relative
  top 0
  padding 0.5em
  color #fff
  font-size 1.3em
  transition 0.2s

.tl-info
  display flex
  justify-content space-between
  align-items center

.eps
  position relative
  display flex
  justify-content center
  align-items center
  margin-right 1em
  color #000
  background rgba(255,255,255,0.8)
  width 80px
  flex-shrink 0
  border-radius 40px
  font-size 1.3em
  padding 0.1em 0

.all-done
  background rgba(20,184,102,0.8)
  color #fff

.people
  margin-bottom 0.5em
  text-align left
  padding 0 1em

.person
  position relative
  color #fff
  display flex
  flex 1
  span
    padding-left 0.3em
  .mdi
    padding-top 0.2em
</style>
