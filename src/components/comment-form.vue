<template>
  <form @submit.prevent="handleMessage">
    <div class="tr-msg">
      <textarea :disabled="disabled" class="text" name="msg" placeholder="Zpráva" required @input="storeMessage" :value="storedMessage"></textarea>
    </div>
    <div class="tr-detail">
      <input :disabled="disabled" type="text" name="sender" placeholder="Jméno" @input="storeName" :value="storedName">
      <div>
        <btn :disabled="disabled" v-if="reply" @click="$emit('cancel')" icon="close">Zrušit</btn>
        <btn :disabled="disabled" type="submit" icon="send">Odeslat</btn>
      </div>
    </div>
  </form>
</template>

<script>
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
  }
}
</script>

<style lang="stylus">
.tr-msg
  background #fff
  padding .7em
  padding-bottom 0
  border-radius 10px

.tr-detail
  margin .5em .8em
  display flex
  justify-content space-between
  align-items center

.text
  width 100%
  background none
  border 0
  outline 0
  padding .3em
  transition border-color .2s

input.text
  max-width 250px
  border-bottom 2px solid hsl(220, 23%, 35%)
  color hsl(150, 80%, 50%)
  margin-bottom .5em
  &:hover, &:focus
    border-bottom-color hsl(150, 80%, 50%)

textarea.text
  resize none

::-webkit-input-placeholder
  opacity .8
</style>
