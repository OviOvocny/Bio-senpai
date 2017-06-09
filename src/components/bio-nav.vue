<template>
  <div>
    <nav>
      <ul :class="{'fullscreen-nav': isFull, 'nav-burger-margin': isPriority}">
        <router-link v-for="item in items" :to="item.to" :key="item.label" @click.native="hideFull">
          <li>
            <icon :symbol="item.icon"></icon>
            <span>{{item.label}}</span>
          </li>
        </router-link>
      </ul>
    </nav><span class="show-all" :class="{'burgerized': isPriority}" @click="toggleFull"><icon :symbol="navToggle"></icon></span>
  </div>
</template>

<script>
import debounce from '@/scripts/debounce'
export default {
  name: 'bio-nav',
  data: function () {
    return {
      isFull: false,
      isPriority: false
    }
  },
  props: {
    items: Array
  },
  computed: {
    navToggle: function () {
      return this.isFull ? 'close' : 'menu'
    }
  },
  methods: {
    toggleFull: function () {
      this.isFull = !this.isFull
    },
    hideFull: function () {
      this.isFull = false
    }
  },
  mounted: function () {
    const allButton = () => {
      this.isPriority = (this.$el.querySelector('a:last-child').offsetTop >= 60 || this.$el.querySelector('nav ul').classList.contains('fullscreen-nav'))
    }
    window.onresize = debounce(allButton, 50)
    allButton()
  }
}
</script>

<style lang="stylus">
nav
  position absolute
  bottom 0
  right 0
  height 60px
  display flex
  align-items center
  justify-content flex-end
  padding 0 1em

nav ul
  display block
  font-size 1.1em
  font-weight 300
  list-style none
  padding-left 6em
  height 60px
  overflow-y hidden
  text-align right
  transition margin .2s

  li
    position relative
    display inline-block
    height 60px
    line-height @height*1.1
    padding 0 .5em
    cursor pointer
    border-bottom 0px solid white
    transition border .2s, text-shadow .4s

  a
    color white
    text-decoration none
    outline 0
    &:visited
      color white

  a:focus li, li:hover
    border-bottom-width 5px
    text-shadow -.2em -.2em 1.5em white, .2em .2em 1.5em white, 0 0 .5em white
  a.router-link-active li
    border-bottom-width 5px

.show-all
  color white
  position absolute
  height 55px
  line-height @height
  bottom 0
  right .4em
  margin-left .5em
  font-size 1.5em
  cursor pointer
  transform scale(0)
  transition .2s
  z-index 30
  &:hover
    text-shadow -.2em -.2em 1em white, .2em .2em 1em white, 0 0 .5em white
.burgerized
  display inline-block
  transform scale(1)
.fullscreen-show-all
  position fixed
.nav-burger-margin
  margin-right 1.5em

.fullscreen-nav
  position fixed
  background-color alpha(#1e2430, 95%)
  left 0
  bottom 0
  width 100%
  height 100vh
  margin 0
  padding 0 15%
  padding-bottom 4em
  padding-top 1em
  z-index 30
  display flex
  flex-direction column
  justify-content flex-end
  flex-wrap wrap
  animation flyUp .7s cubic-bezier(0.190, 1.000, 0.220, 1.000)
  li
    display block
    border-bottom-width 1px
    border-bottom-color white
    //animation flyUp 1s cubic-bezier(0.190, 1.000, 0.220, 1.000)

@keyframes flyUp
  from
    transform translateY(50px)
    opacity 0
</style>
