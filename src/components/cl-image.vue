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
    width: String
  },
  computed: {
    url: function () {
      const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
      let params = {
        fetch_format: 'auto',
        crop: 'scale'
      }
      if (this.width) params['width'] = parseInt(this.width)
      return c.url(this.src, params)
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
