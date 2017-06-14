const base = 'api.bio-senpai.tk/api'

import axios from 'axios'
export default class {

  constructor (endpoint) {
    this.base = base
    this.endpoint = endpoint
    this.filters = []
    this.postBody = {}
  }

  body (hash) {
    this.postBody = hash
    return this
  }

  filter (key, val) {
    this.filters.push([key, val])
    return this
  }

  where (prop, equals) {
    this.filters.push([`where][${prop}`, equals])
    return this
  }

  limit (num) {
    this.filters.push(['limit', num])
    return this
  }

  order (by) {
    this.filters.push(['order', by])
    return this
  }

  byIdDesc () {
    this.filters.push(['order', '_id DESC'])
    return this
  }

  call (verb = 'get') {
    let url = `//${this.base}/${this.endpoint}`
    if (this.filters.length > 0) {
      let f = this.filters.length
      for (let i = 0; i < f; i++) {
        const prefix = i === 0 ? '?' : '&'
        const [t, v] = this.filters[i]
        url += `${prefix}filter[${t}]=${v}`
      }
    }
    return axios[verb](url, this.postBody)
  }

}
