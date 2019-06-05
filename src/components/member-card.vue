<template>
  <div class="member">
    <div class="member-head" :style="{backgroundImage: headBg}">
      <div class="mh-left">
        <div class="mh-main">
          <cl-image class="member-img" :src="imgPath" width="74"></cl-image>
          <div class="mh-name">{{data.name}}</div>
        </div>
      </div>
      <div class="mh-right">
        <div class="roles">
          <div class="role-badge" v-for="role in data.role[0]" :key="role"><icon :symbol="roleIcon(role)"></icon><span>{{role}}</span></div>
        </div>
      </div>
    </div>
    <div class="member-desc" v-html="data.desc"></div>
  </div>
</template>

<script>
let icons = {
  'Překlad': 'translate',
  'Korekce': 'auto-fix',
  'Encoding': 'cube',
  'Motivace': 'cookie',
  'Web': 'code-braces',
  'Server': 'server',
  'Sociální média': 'pen',
  'Podcast': 'radio'
}

import cl from 'cloudinary-core'
export default {
  props: {
    data: Object
  },
  computed: {
    imgPath () {
      return 'team/' + this.data.url_name
    },
    headBg () {
      const c = cl.Cloudinary.new({cloud_name: 'bio-senpai'})
      const params = {
        fetch_format: 'auto',
        effect: 'blur:1400',
        width: 450,
        gravity: 'center',
        zoom: 3,
        crop: 'thumb',
        opacity: 40
      }
      const humus = c.url(this.imgPath, params)
      return `url(${humus})`
    }
  },
  methods: {
    roleIcon (role) {
      return icons[role] === undefined ? 'dots-horizontal' : icons[role]
    }
  }
}
</script>

<style lang="stylus">
.member
  width 450px
  margin-bottom 30px
  background lighten(#1e2430, 15%)
  color white
  border-radius 15px 15px 10px 10px
  text-align center
  will-change transform

@media (max-width: 500px)
  .member
    width 300px

@media (max-width: 350px)
  .member
    width 250px

.member-head
  border-radius 10px 10px 0 0
  border-bottom 2px solid alpha(white, 50%)
  background-color #2a3345
  background-size cover
  background-position center
  color white
  padding .5em
  display flex
  justify-content space-around

.member-img
  border-radius 40px
  border 2px solid white
  // box-shadow 0 3px 20px rgba(0,0,0,0.533)

.mh-name
  font-size 1.2em
  margin-top .2em

.member-desc
  padding 1em
  text-align justify

  a
    color hsl(150, 80%, 35%)
  a:visited
    color hsl(150, 80%, 30%)

.roles, .mh-main
  display flex
  flex-direction column
  justify-content center
  height 100%

.role-badge
  padding .3em
  span
    margin-left 1ch
</style>
