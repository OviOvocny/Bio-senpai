<template>
  <div>
    <audio :src="source" ref="audio" @loadedmetadata="updateMeta" @loadeddata="start" @timeupdate="updateTime"></audio>
    <div class="pod-main">
      <button @click="playPause" class="play"><icon :symbol="playIcon"></icon></button>
      <div class="title">
        <div>{{metadata.epName}}</div>
        <div class="chapter" v-if="activeChapter" @click="chapterList = !chapterList">{{activeChapter.name}}</div>
      </div>
    </div>
    <div class="pod-time">
      <input type="range" :min="0" :max="duration" :value="time" @input="seek"/>
      <div class="stamps">
        <span>{{humanTime}}</span>
        <span>{{humanDuration}}</span>
      </div>
    </div>
    <div class="pod-controls">
      <button title="Zpět o 15s" @click="$refs.audio.currentTime -= 15"><icon symbol="undo"></icon></button>
      <button title="Kapitoly" @click="chapterList = !chapterList" :disabled="!metadata.chapters"><icon symbol="format-list-bulleted"></icon></button>
      <button title="Zastavit" @click="$emit('close')"><icon symbol="stop"></icon></button>
      <button title="Napřed o 30s" @click="$refs.audio.currentTime += 30"><icon symbol="redo"></icon></button>
    </div>
    <!-- Floating pane -->
    <div :class="[
      'pod-chapter-list', 
      {'chlist-open': chapterList && active && metadata.chapters,
       'pod-chapter-list-blur': hp}]">
      <div class="chlist-head">
        <h4>Seznam kapitol</h4>
        <icon symbol="close" @click.native="chapterList = false"></icon>
      </div>
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
    hp: Boolean,
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
      if (!this.metadata.chapters) {
        return false
      }
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
paccent = #ff99bb
ease-out-expo = cubic-bezier(0.190, 1.000, 0.220, 1.000)

.pod-chapter-list
  position fixed
  background-color #374258
  padding 1em
  transition .5s ease-out-expo
  transform-origin top left
  // hidden state
  transform scale(0)
  opacity 0
  pointer-events none
  &.chlist-open
    transform none
    opacity 1
    pointer-events auto

@supports (backdrop-filter: blur(10px))
  .pod-chapter-list-blur
    background-color alpha(#374258, 70%)
    backdrop-filter blur(10px)

@media (max-width: 699.9px)
  .pod-chapter-list
    top 0
    left 0
    width 100vw
    height 100vh
    overflow auto

@media (min-width: 700px)
  .pod-chapter-list
    top 1.5em
    left 250px
    border-radius 10px
    max-height 100vh
    overflow auto

.chlist-head
  display flex
  justify-content space-between
  align-items center
  margin-bottom 1em
  h4
    margin 0
  .mdi-close
    cursor pointer
    &:hover
      color #75f0b3

.chlist
  list-style none
  padding 0
  margin 0
  li
    display flex
    justify-content space-between
    margin-bottom .75em
    cursor pointer
    &:hover, &.chcurrent
      color #75f0b3
    .chtime
      margin-left 2em


.pod-main
  display flex
  align-items center
  .play
    border 0
    color #40071A
    background-color white
    flex-shrink 0
    width 2em
    height @width
    border-radius @width
    cursor pointer
    margin-right .75em
    transform scale(.5)
    opacity 0
    animation zmf .7s ease-out-expo forwards
    &:focus
      outline 0
      background-color paccent
  .title
    font-size .9em
    transform translateX(-10px)
    opacity 0
    animation tsf .7s ease-out-expo forwards
  .chapter
    margin-top .2em
    font-size .9em
    font-weight bold
    cursor pointer

.pod-time
  input
    width 100%
    transform scaleX(0)
    opacity 0
    animation zmf .7s ease-out-expo forwards
  .stamps
    display flex
    justify-content space-between
    margin-top .2em
    font-size .9em
    transform translateY(-5px)
    opacity 0
    animation tsf .7s .2s ease-out-expo forwards

.pod-controls
  display flex
  justify-content space-between
  margin-top .5em
  button
    border 0
    background-color transparent
    color white
    cursor pointer
    transform translateY(150%)
    animation tsf .7s .3s ease-out-expo forwards
    &:nth-child(2)
      animation-delay .35s
    &:nth-child(3)
      animation-delay .4s
    &:nth-child(4)
      animation-delay .45s
    &:disabled
      color alpha(white, 50%)
      cursor not-allowed
    &:focus
      outline 0
      color paccent


input[type="range"]
  margin auto
  -webkit-appearance none
  position relative
  overflow hidden
  height 2px
  cursor pointer
  background transparent
  border-radius 2px
  transition height .2s
  &:focus
    outline 0
    height 4px

::-webkit-slider-runnable-track
  background alpha(white, 50%)

::-webkit-slider-thumb
  -webkit-appearance none
  width 0
  height 4px
  box-shadow -100vw 0 0 100vw white

::-moz-range-track
  height 4px
  background alpha(white, 50%)

::-moz-range-thumb
  background #fff
  height 4px
  width 0
  border-radius 0 !important
  box-shadow -100vw 0 0 100vw dodgerblue
  box-sizing border-box

::-ms-fill-lower
  background white

::-ms-thumb
  height 4px
  width 0
  box-sizing border-box

::-ms-ticks-after
  display none

::-ms-ticks-before
  display none

::-ms-track
  background alpha(white, 50%)
  color transparent
  height 4px
  border none

::-ms-tooltip
  display none
</style>
