/* global API_BASE */
const base = API_BASE

import axios from 'axios'
import localForage from 'localforage'

function saveOffline (key, response) {
  localForage.setItem(key, response)
  return response
}

export default class {

  constructor (endpoint) {
    this.onlineData = false
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

  skip (num) {
    this.filters.push(['skip', num])
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

  get url () {
    let url = `//${this.base}/${this.endpoint}`
    if (this.filters.length > 0) {
      let f = this.filters.length
      for (let i = 0; i < f; i++) {
        const prefix = i === 0 ? '?' : '&'
        const [t, v] = this.filters[i]
        url += `${prefix}filter[${t}]=${v}`
      }
    }
    return url
  }

  call (verb = 'get') {
    return axios[verb](this.url, this.postBody).then(res => verb === 'get' ? saveOffline(this.url, res.data) : res.data)
  }

  offline () {
    return localForage.getItem(this.url)
  }

  // Offline pending items

  static addPending (endpoint, data) {
    return new Promise((resolve, reject) => {
      localForage.getItem('pending')
        .then(res => res === null ? [] : res)
        .then(res => {
          res.push({endpoint, data})
          localForage.setItem('pending', res)
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  static getPending () {
    const args = Array.from(arguments)
    return new Promise((resolve, reject) => {
      localForage.getItem('pending')
        .then(pendingItems => {
          if (pendingItems == null) resolve([])
          if (args.length === 0) {
            resolve(pendingItems)
          } else {
            resolve(pendingItems.filter(i => args.some(endpoint => endpoint === i.endpoint)))
          }
        })
        .catch(reject)
    })
  }

  static retryPending () {
    const args = Array.from(arguments)
    return new Promise((resolve, reject) => {
      localForage.getItem('pending')
        .then(pendingItems => {
          if (pendingItems == null) {
            // It's ok, but I didn't do anything
            resolve(false)
          }
          let items
          if (args.length > 0) {
            items = pendingItems.filter(i => args.some(endpoint => endpoint === i.endpoint))
          } else {
            items = pendingItems
          }
          if (items.length === 0) {
            // It's ok, but I didn't do anything
            resolve(false)
          }
          const promises = items.map(i => axios.post(`//${base}/${i.endpoint}`, i.data))
          Promise.all(promises)
            .then(res => {
              let localForagePromise
              if (args.length === 0) {
                localForagePromise = localForage.removeItem('pending')
              } else {
                const cleanPending = pendingItems.filter(i => !(items.some(d => JSON.stringify(d.data) === JSON.stringify(i.data))))
                localForagePromise = localForage.setItem('pending', cleanPending)
              }
              localForagePromise
                .then(remaining => {
                  resolve({
                    resolved: res,
                    remaining
                  })
                })
                .catch(reject)
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }

}
