<template>
  <section class="reading-size-adjust">
    <h1>Survival guide</h1>
    <div class="toc highlight-block">
      <h2 class="block-title">Obsah</h2>
      <ul>
        <li>Bla</li>
        <li>Bla</li>
        <li> Bla
          <ul>
            <li>Bla</li>
            <li>Bla</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
// h2, h3
//   margin-top 1.5em
//   color hsl(150,80%,50%)

.highlight-block
  border-left 2px solid hsl(150,80%,50%)
  padding .5em 1em
  
.block-title
  color hsl(150,80%,40%)
</style>
