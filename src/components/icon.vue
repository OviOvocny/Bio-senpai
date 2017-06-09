<template>
  <i :class="symbolClass"></i>
</template>

<script>
export default {
  props: {
    symbol: String
  },
  computed: {
    symbolClass: function () {
      return `mdi mdi-${this.symbol}`
    }
  }
}
</script>
