<template>
  <div :class="['audio', {active}]">
    <audio :src="source" ref="audio" @loadedmetadata="updateMeta" @loadeddata="start" @timeupdate="updateTime"></audio>
    <div :class="['audio-chapter-list', {'chlist-open': chapterList && active && metadata.chapters}]">
      <ul class="chlist">
        <li v-for="m in metadata.chapters" :class="{chcurrent: activeChapter === m}" @click="seek(m.time)">
          <span class="chname">{{m.name}}</span>
          <span class="chtime">
            {{toHuman(m.time)}}
            <span class="chend" v-if="m.duration > 0"> – {{toHuman(m.time + m.duration)}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="audio-panel">
      <div class="meta-title">
        <span>{{metadata.epName}}</span>
        <button class="audio-button chapter-button" title="Kapitoly" @click="chapterList = !chapterList" v-if="metadata.chapters">
          <icon symbol="format-list-checks"></icon> <span class="active-chapter" v-if="activeChapter">{{activeChapter.name}}</span>
        </button>
      </div>
      <div class="audio-controls">
        <span class="audio-timestamp">
          {{humanTime}}
          <span class="audio-timestamp-divider">/</span>
          {{humanDuration}}
        </span>
        <button class="audio-button" title="Zpět o 15s" @click="$refs.audio.currentTime -= 15">
          <icon symbol="undo"></icon>
        </button>
        <button class="audio-button" title="Napřed o 30s" @click="$refs.audio.currentTime += 30">
          <icon symbol="redo"></icon>
        </button>
        <router-link to="/podcast">
          <button class="audio-button" title="Zpět na seznam epizod">
            <icon symbol="backburger"></icon>
          </button>
        </router-link>
        <button class="audio-button" title="Vypnout" @click="$emit('close')">
          <icon symbol="power"></icon>
        </button>
      </div>
    </div>
    <div class="audio-time">
      <div class="audio-markers" v-if="metadata.chapters && duration !== 0">
        <div class="marker" v-for="m in metadata.chapters" :style="{left: mPercent(m.time) + '%'}" :title="m.name"></div>
      </div>
      <input class="audio-scrubber" type="range" :min="0" :max="duration" :value="time" @input="seek" />
    </div>
    <div class="audio-cover">
      <cl-image v-if="metadata.file" :src="'podcast/icons/' + metadata.file.substr(0, metadata.file.length - 4)" width="80"></cl-image>
    </div>
    <button class="audio-play" title="Přehrát nebo pozastavit" @click="playPause">
      <icon :symbol="playIcon"></icon>
    </button>
  </div>
</template>

<script>
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

function index (arr, compare) {
  let l = 0
  let r = arr.length - 1
  while (l <= r) {
    let m = l + ((r - l) >> 1)
    let comp = compare(arr[m])
    if (comp < 0) {
      l = m + 1
    } else if (comp > 0) {
      r = m - 1
    } else {
      return m
    }
  }
  return l - 1
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
          epName: 'Žádné audio',
          file: '',
          chapters: undefined
        }
      }
    }
  },
  data () {
    return {
      playing: false,
      time: 0,
      duration: 0,
      chapterList: false
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
    },
    activeChapter () {
      const ch = this.metadata.chapters
      const i = index(ch, n => n.time - this.time)
      const active = ch[i]
      if (i >= 0 && this.time < active.time + active.duration) {
        return active
      } else {
        const prev = ch.filter(c => c.time < this.time && c.time + c.duration > this.time)
        if (prev.length > 0) {
          return prev[prev.length - 1]
        } else {
          return false
        }
      }
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
    seek (e) {
      e = e.target ? e.target.value : e
      this.$refs.audio.currentTime = e
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
      const ch = this.metadata.chapters
      switch (e.keyCode) {
        case 32: // space
          e.preventDefault()
          this.playPause()
          break
        case 37: // left
          this.seek(this.time - 5)
          break
        case 39: // right
          this.seek(this.time + 5)
          break
        case 38: // up
          const i = index(ch, n => n.time - this.time) - 1
          if (i >= 0) this.seek(ch[i].time)
          break
        case 40: // down
          const j = index(ch, n => n.time - this.time) + 1
          if (j < ch.length) this.seek(ch[j].time)
          break
      }
    },
    mPercent (sec) {
      return (100 / this.duration) * sec
    },
    toHuman
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
  }
}
</script>

<style lang="stylus">
pcolor = #374258
paccent = #e6195d
eoe = cubic-bezier(0.190, 1.000, 0.220, 1.000)

.audio
  position fixed
  z-index 1
  bottom 0
  left 0
  width 100%
  transform translateY(5em)
  transition transform .1s ease-in
  &.active
    transition transform .7s eoe
    transform translateY(0)

@media (orientation: portrait)
  .audio
    bottom 60px

.audio-cover
  position absolute
  bottom .35em
  left .5em
  transform-origin bottom left
  transform scale(.6)
  transition transform .5s 50ms eoe
  img
    border-radius 5px

.audio-play
  position absolute
  bottom 1.85em
  left 1em
  width 2em
  height @width
  border-radius @width
  border 2px solid
  color white
  background-color pcolor
  cursor pointer
  opacity 0
  transform-origin bottom left
  transform scale(.5) translateY(2em)
  transition .5s 50ms eoe
  outline 0
  &:hover, &:focus
    color paccent

.audio-panel
  min-height 2em
  margin-bottom 1em
  padding-left 6.5em
  padding-right .5em
  background-color lighten(pcolor, 10%)
  display flex
  align-items center
  justify-content space-between
  transform translateY(100%)
  transition transform .5s 50ms eoe

.meta-title
  cursor default
  font-size .9em
  transform translateX(-6em) scale(.5)
  transition inherit

.audio-controls
  cursor default

.audio-timestamp
  font-size .8em
  margin-right .5em

.audio-timestamp-divider
  opacity .5
  margin 0 .5ch

.audio-button
  border 0
  border-radius 1em
  color darken(pcolor, 10%)
  cursor pointer
  transition color .5s
  outline 0
  &:hover, &:focus
    color paccent
    transition none

.audio.active:hover
  .audio-cover
    transform scale(1) translateY(-.8em)
  .audio-play
    opacity 1
    pointer-events auto
    transform scale(1)
  .audio-panel
    transform translateY(0)
    .meta-title
      transform translateX(0) scale(1)

.audio-time
  position absolute
  bottom 0
  width 100%
  height 1em
  background-color pcolor

.audio-markers
  position absolute
  left 1em
  bottom 0
  width 100%
  width calc(100% - 2em)
  height .3em
  pointer-events none
  z-index 0
  .marker
    position absolute
    width 2px
    height 100%
    background-color alpha(white, 30%)

.chapter-button
  margin-left .25em
  .active-chapter
    font-family Noto Sans

.audio-chapter-list
  position fixed
  bottom 0
  left 0
  width 100%
  width calc(100% - 7em)
  max-width 800px
  padding 1em
  padding-bottom 3em
  margin-bottom 1em
  margin-left 6em
  border-radius 10px 10px 0 0
  background-color alpha(pcolor, 95%)
  transform translateY(100%)
  transition transform .1s ease-in
  &.chlist-open
    transform translateY(0)
    transition transform .5s eoe

.chlist
  list-style none
  padding 0
  margin 0
  font-size .9em
  li
    display flex
    justify-content space-between
    margin-bottom .3em
    cursor pointer
    .chname
      margin-right 1em
    &:hover
      color lighten(paccent, 30%)
    &.chcurrent
      color hsl(150, 80%, 60%)
      .chname
        font-weight bold

thumb-style =
  width 2em
  height 1em
  border .35em solid pcolor
  border-radius .5em
  background-color white
  cursor ew-resize
  cursor grab
  &:hover, &:active
    background-color paccent
  &:active
    cursor grabbing

track-style =
  width 100%
  cursor pointer
  background transparent
  border-color transparent
  color transparent

.audio-scrubber
  position relative
  width 100%
  height 1em
  -webkit-appearance none
  background-color transparent
  &::-webkit-slider-thumb
    -webkit-appearance none
    {thumb-style}
  &::-moz-range-thumb
    {thumb-style}
    height .4em
  &::-ms-thumb
    {thumb-style}
    height .4em
    margin-top .3em
  &:focus
    outline 0
  &::-ms-track
    {track-style}
  &::-webkit-slider-runnable-track
    {track-style}
  &::-moz-range-track
    {track-style}

@media (max-width: 450px)
  .meta-title
    display none
  .audio-play
    opacity 1
    transform translateY(1em)
</style>
