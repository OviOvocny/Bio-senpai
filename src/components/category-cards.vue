<template>
  <div class="card-categories">
    <router-link replace v-for="cat in categories" :to="`/${page}/${cat.slug}`" :key="cat.slug" class="card-category">
        <icon :symbol="cat.icon" class="card-category__icon"></icon>
        <span class="card-category__name">{{cat.category}}</span>
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
  text-decoration none
  color white
  background-color #374258
  border-radius 2em
  text-align center
  margin .75em
  padding .5em 1em
  transition background-color .3s, color.2s
  &:visited
    color @color
  &:hover
    background-color lighten(#374258, 20%)
  &.router-link-active
    background-color hsl(150, 80%, 40%)

.card-category__icon
  display inline-block
  font-size 1.2em
  margin-right .5em

.card-category__name
  display inline-block
  font-size 1em

@media (max-width: 690px)
  .card-category
    width 100%
    text-align left
    margin .5em

</style>
