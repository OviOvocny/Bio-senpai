<template>
  <div>
    <section>
      <div class="top-container">
          <svg id="bio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" version="1.1">
              <g>
                  <path d="m45.041 198.32a119.61 100.17 0 0 0 220.14 -16.18"/>
                  <g id="eyes">
                      <path d="m105.79 152.77a12.767 12.767 0 1 0 -25.534 0 12.767 12.767 0 0 0 25.534 0z"/>
                      <path d="m221.96 151.99a12.767 12.767 0 1 0 -25.534 0 12.767 12.767 0 0 0 25.534 0z"/>
                  </g>
                  <path d="m148.35 197.16-8.6748 15.025a3.1918 3.1918 0 0 0 2.7642 4.7877h17.35a3.1918 3.1918 0 0 0 2.7642 -4.7877l-8.6748-15.025a3.1918 3.1918 0 0 0 -5.5283 0z"/>
                  <path d="m151.11 45.192a113.66 113.66 0 0 0 -124.84 168.1"/>
                  <g id="bang">
                      <path d="m120.59 166.2a121.01 121.01 0 0 0 33.51 -107.56"/>
                      <path d="m120.59 166.2a64.853 64.853 0 0 0 33.51 -107.56"/>
                  </g>
                  <path d="m87.934 116.54a83.357 83.357 0 0 0 66.166 -57.9"/>
                  <path d="m265.59 179.86a122.24 122.24 0 0 0 -111.49 -121.22"/>
                  <path d="m248.81 232.89a107.82 107.82 0 0 0 -97.7 -187.7"/>
                  <path d="m45.041 198.32a51.525 51.525 0 0 0 21.835 41.464"/>
                  <path d="m26.271 213.29a69.972 69.972 0 0 0 40.604 26.493"/>
                  <path class="blush" d="m79.208 190.58 10.879-11.35"/>
                  <path class="blush" d="m85.592 190.58 10.879-11.35"/>
                  <path class="blush" d="m91.975 190.58 10.875-11.35"/>
                  <path class="blush" d="m195.38 190.58 10.879-11.345"/>
                  <path class="blush" d="m201.77 190.58 10.879-11.345"/>
                  <path class="blush" d="m208.15 190.58 10.88-11.35"/>
                  <path d="m265.18 182.14a6.3836 6.3836 0 0 0 0.40904 -2.2768"/>
                  <path d="m87.934 116.65a18.828 18.828 0 1 0 -37.657 0 18.828 18.828 0 0 0 37.657 0z"/>
                  <path d="m75.302 129.34a14.121 14.121 0 1 0 -3.84 1.2339"/>
                  <path d="m75.302 129.34 2.573-11.914a2.7547 2.7547 0 0 0 -3.5354 -3.2042l-10.902 3.5031a2.7547 2.7547 0 0 0 -1.0072 4.6638l9.0316 8.1855"/>
                  <path d="m54.651 128.72a73.899 73.899 0 0 0 12.224 111.06"/>
                  <path d="m248.81 232.89a125.21 125.21 0 0 0 -97.7 -187.7"/>
                  <g id="ahoge">
                      <path d="m151.11 45.192a35.004 35.004 0 0 0 -68.993 -11.643"/>
                      <path d="m151.11 45.192a41.654 41.654 0 0 0 -68.993 -11.643"/>
                  </g>
                  <path d="m87.934 116.54a54.464 54.464 0 0 0 28.756 -53.571"/>
              </g>
          </svg>
          <div class="top-title">Bio-senpai</div>
          <div class="top-version">{{latest.hana}} | {{latest.version}}</div>

          <div class="licence">Bio-senpai je progresivní webová aplikace postavená na <a href="https://vuejs.org">Vue 2</a>, <a href="https://github.com/mzabriskie/axios">Axiosu</a> a <a href="https://cloudinary.com">Cloudinary</a>. O data se nám stará <a href="https://loopback.io">LoopBack</a> a <a href="https://www.mongodb.com">MongoDB</a>.</div>
      </div>
    </section>

    <section class="log" v-for="log in logs">
        <h2>Verze {{log.version}} — {{log.hana}}</h2>
        <p>
            {{log.desc}}
        </p>
        <h3>Seznam změn</h3>
        <ul>
            <li v-for="change in log.changelog">{{change}}</li>
        </ul>
    </section>
  </div>
</template>

<script>
import API from 'api'
export default {
  data () {
    return {
      error: false,
      logs: [],
      latest: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$emit('error', false)
      new API('changelogs')
        .byIdDesc()
        .call()
        .then(res => {
          this.logs = res.data
          this.latest = this.logs[0]
        })
        .catch(err => {
          this.$emit('error', err)
        })
    }
  }
}
</script>

<style lang="stylus">
.top-container
  width 100%
  text-align center

.top-title
  font calc(2em + 1.5vw) Unica One
.top-version
  font-size calc(.9em + .8vw)
  margin-bottom 1em

.log
  margin-bottom 6em

#bio path
  stroke #fff
  fill none
  stroke-linecap round

@supports (background-blend-mode: normal)
  #bio path:not(.blush)
    stroke-dasharray 300
    animation draw 3s

#bio .blush
  transition 1s
  opacity 0
  stroke-dasharray 20
  stroke-dashoffset 20
  &:nth-child(even)
    stroke-dashoffset -20

#bio
  width 80%
  max-width 400px
  transition transform .3s
  &:hover .blush
    stroke-dashoffset 0
    opacity 1
  &:active
    transform scaleY(.9)

@supports (tab-size 4)
  #ahoge
    transform-origin 95% 100%
    animation wind 2s alternate infinite
  #bang
    transform rotate(-8deg)
    transform-origin 60% -5%
    animation breeze 2s alternate infinite
  #eyes
    transform-origin 0 70%
    animation blink 5s infinite

@-webkit-keyframes draw
  from
    stroke-dashoffset 300
@keyframes draw
  from
    stroke-dashoffset 300
@-webkit-keyframes float-in
  to
    transform translateY(0)
    opacity 1
@keyframes float-in
  to
    transform translateY(0)
    opacity 1
@-webkit-keyframes wind
  from
    transform rotate(8deg)
  to
    transform rotate(-10deg)
@keyframes wind
  from
    transform rotate(8deg)
  to
    transform rotate(-10deg)
@-webkit-keyframes breeze
  to
    transform rotate(0)
@keyframes breeze
  to
    transform rotate(0)
@-webkit-keyframes blink
  48%, 55%
    transform scaleY(1)
  50%
    transform scaleY(0)
@keyframes blink
  48%, 55%
    transform scaleY(1)
  50%
    transform scaleY(0)
</style>
