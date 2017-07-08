<template>
  <div :class="{'audio': true, 'audio-active': active}">
    <audio :src="source" ref="audio" @loadedmetadata="updateMeta" @loadeddata="start" @timeupdate="updateTime"></audio>

    <btn variant="red" :icon="playIcon" @click="playPause"></btn>

    <div class="controls">
      <div class="metadata-title">{{metadata.epName}}</div>
      <div class="scrubber-wrap">
        <span>{{humanTime}}</span>
        <range-slider class="scrubber" :min="0" :max="duration" :value="time" @input="seek"></range-slider>
        <span>{{humanDuration}}</span>
      </div>
    </div>

    <btn variant="red" icon="close" @click="$emit('close')"></btn>

  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

function toHuman (time) {
  let sec = Math.floor(time % 60)
  sec = sec < 10 ? '0' + sec : sec
  let min = Math.floor(time / 60)
  if (min >= 60) {
    let hr = Math.floor(min / 60)
    min -= 60 * hr
    min = min < 10 ? '0' + min : min
    return `${hr}:${min}:${sec}`
  }
  return `${min}:${sec}`
}

export default {
  props: {
    source: String,
    active: Boolean,
    autosave: Boolean,
    metadata: {
      type: Object,
      default () {
        return {
          epName: 'Žádné audio'
        }
      }
    }
  },
  data () {
    return {
      playing: false,
      time: 0,
      duration: 0
    }
  },
  computed: {
    playIcon () {
      return this.playing ? 'pause' : 'play'
    },
    humanTime () {
      return toHuman(this.time)
    },
    humanDuration () {
      return toHuman(this.duration)
    }
  },
  methods: {
    start () {
      const startTime = window.localStorage.getItem('podcast:' + this.source)
      if (startTime) {
        this.$refs.audio.currentTime = startTime - 5
      }
      this.playing = true
      this.$refs.audio.play()
    },
    playPause () {
      this.playing = !this.playing
    },
    seek (val) {
      this.$refs.audio.currentTime = val
    },
    updateTime (e) {
      this.time = e.target.currentTime
      if (this.autosave && this.time > 0) {
        window.localStorage.setItem('podcast:' + this.source, this.time)
      }
    },
    updateMeta (e) {
      this.duration = e.target.duration
    },
    handleKeyboard (e) {
      switch (e.keyCode) {
        case 32:
          this.playPause()
          break
        case 37:
          this.$refs.audio.currentTime = this.$refs.audio.currentTime - 5
          break
        case 39:
          this.$refs.audio.currentTime = this.$refs.audio.currentTime + 5
          break
      }
    }
  },
  watch: {
    playing () {
      if (this.playing) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    active () {
      if (this.active) {
        document.addEventListener('keydown', this.handleKeyboard)
      } else {
        this.playing = false
        document.removeEventListener('keydown', this.handleKeyboard)
      }
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430
accent = #e6195d
ease-out-expo = cubic-bezier(0.190, 1.000, 0.220, 1.000)

.audio
  position fixed
  z-index 5
  bottom 0
  left 0
  display flex
  align-items center
  justify-content center
  width 100%
  min-height 60px
  padding 0 1em
  color white
  background-color alpha(bgcolor, 80%)
  transform translateY(110%)
  transition transform .1s ease-in

@supports (backdrop-filter: blur)
  .audio
    background-color alpha(bgcolor, 50%)
    backdrop-filter blur(10px)

@media (orientation: portrait)
  .audio
    bottom 60px

.audio-active
  transform translateY(0)
  transition transform .7s ease-out-expo

.metadata-title
  white-space nowrap

.scrubber, .controls, .range-slider
  width 100% !important

.controls
  padding 0 1em

.scrubber-wrap
  display flex

.range-slider-fill
  background-color accent !important

.range-slider-rail
  background-color alpha(white, 50%) !important

.range-slider-knob
  box-shadow none !important
  transition height .3s, width .4s
  &:active
    width 15px
    height 15px

</style>
