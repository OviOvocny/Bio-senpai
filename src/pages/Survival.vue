<template>
  <section>
    <h2></h2>
    <category-cards page="survival-guide" :categories="categories"></category-cards>

    <div :class="categories[0].slug" v-if="$route.params.category === categories[0].slug">
      Oops...
    </div>
  </section>
</template>

<script>
import categoryCards from '@/components/category-cards'
export default {
  data () {
    return {
      categories: [
        {
          category: 'Manuál',
          slug: 'manual',
          icon: 'book'
        }
      ]
    }
  },
  components: {
    categoryCards
  }
}
</script>

<style scoped lang="stylus">
h2, h3
  margin-top 1.5em
  color hsl(150,80%,50%)

.note
  border 2px solid hsl(150,80%,30%)
  padding .5em
  border-radius 10px
</style>
