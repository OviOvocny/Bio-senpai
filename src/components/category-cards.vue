<template>
  <div class="card-categories">
    <router-link replace v-for="cat in categories" :to="`/${page}/${cat.slug}`" :key="cat.slug" class="card-category">
        <icon :symbol="cat.icon" class="card-category__icon"></icon>
        <div class="card-category__name">{{cat.category}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    page: String,
    categories: Array
  }
}
</script>

<style lang="stylus">
.card-categories
  display flex
  justify-content center
  flex-wrap wrap

.card-category
  color #1e2430
  text-decoration none
  background-color white
  border-radius 15px
  text-align center
  width 120px
  margin 1em
  padding 1em
  &:visited
    color @color
  &:hover .card-category__icon
    color hsl(150, 80%, 60%)
  &.router-link-active .card-category__icon
    color white
    background-color hsl(150, 80%, 40%)

.card-category__icon
  display inline-block
  background-color #1e2430
  color white
  font-size 2em
  vertical-align top
  width @font-size
  height @width
  padding-top (@height / 8)
  border-radius @font-size
  margin-bottom .35em
  transition background-color .3s, color.2s

.card-category__name
  font-size 1.1em

@media (max-width: 690px)
  .card-category
    width 100%
    text-align left
    margin .5em

  .card-category__icon
    font-size 1.3em
    margin-bottom 0
    margin-right .5em

  .card-category__name
    font-size 1em
    display inline
</style>
