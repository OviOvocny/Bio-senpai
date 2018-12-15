<template>
  <form @submit.prevent="handleMessage">
    <div class="tr-msg">
      <textarea ref="txt" :disabled="disabled" class="text" name="msg" placeholder="Zpráva" required @input="storeMessage" :value="storedMessage"></textarea>
    </div>
    <div class="tr-detail">
      <input :disabled="disabled" type="text" name="sender" placeholder="Jméno" @input="storeName" :value="storedName">
      <div>
        <btn :disabled="disabled" v-if="reply" @click="$emit('cancel')" icon="close">Zrušit</btn>
        <btn :disabled="disabled" type="submit" icon="send">Odeslat<show-offline> později</show-offline></btn>
      </div>
    </div>
  </form>
</template>

<script>
import showOffline from '@/components/show-offline'
export default {
  props: {
    reply: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    storedName () {
      return window.localStorage.getItem('name')
    },
    storedMessage () {
      return window.localStorage.getItem('message')
    }
  },
  methods: {
    storeName (e) {
      window.localStorage.setItem('name', e.target.value)
    },
    storeMessage (e) {
      window.localStorage.setItem('message', e.target.value)
    },
    handleMessage (e) {
      let form = new FormData(e.target)
      let data = {
        msg: 'Neuvedeno',
        replies: []
      }
      for (let [key, value] of form.entries()) {
        data[key] = value
      }
      if (data.sender === '') data.sender = 'Anonym'
      data.time = new Date().toISOString()
      this.$emit('send', data)
    }
  },
  mounted () {
    this.$refs.txt.focus()
    this.$emit('mount')
  },
  components: {
    showOffline
  }
}
</script>

<style lang="stylus">
bgcolor = #1e2430

.tr-msg
  background-color lighten(bgcolor, 15%)
  padding .7em
  padding-bottom 0
  border-radius 10px

.tr-detail
  margin .5em .8em
  display flex
  justify-content space-between
  align-items center
  flex-wrap wrap
@media (max-width: 420px)
  .tr-detail > div, .tr-detail button, .tr-detail > input
    width 100%
  .tr-detail button
    margin .3em 0

.text
  width 100%
  background none
  background-color lighten(bgcolor, 15%)
  color white
  font-family Noto Sans
  border 0
  outline 0
  padding .3em
  transition border-color .2s


textarea.text
  resize none
  border-bottom 2px solid lighten(bgcolor, 50%)
  font-family Noto Sans
  &::placeholder
    color alpha(white, 90%)
  &:hover, &:focus
    border-bottom-color hsl(150, 80%, 50%)
</style>
