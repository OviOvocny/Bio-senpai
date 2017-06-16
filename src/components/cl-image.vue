<template>
  <img ref="image" :src="url" :alt="alt" v-images-loaded="loaded">
</template>

<script>
import cl from 'cloudinary-core'
import imagesLoaded from 'vue-images-loaded'
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String,
    width: String,
    params: Object
  },
  computed: {
    url: function () {
      const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
      let parameters = {
        fetch_format: 'auto',
        crop: 'scale',
        ...this.params
      }
      if (this.width) parameters['width'] = parseInt(this.width)
      return c.url(this.src, parameters)
    }
  },
  methods: {
    loaded () {
      this.$emit('imageloaded', this.$refs.image)
    }
  },
  directives: {
    imagesLoaded
  }
}
</script>
