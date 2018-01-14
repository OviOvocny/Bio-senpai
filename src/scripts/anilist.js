import axios from 'axios'

const url = 'https://graphql.anilist.co'
const SEARCH = `
query ($id: Int, $page: Int, $perPage: Int = 10, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search, type: ANIME) {
      id
      title {
        romaji
      }
      format
      episodes
      isAdult
      coverImage {
        large
      }
      bannerImage
    }
  }
}
`

function anilistAPISearch (search, page = 1, perPage = 10) {
  const body = {
    query: SEARCH,
    variables: {
      search,
      page,
      perPage
    }
  }
  return axios.post(url, body)
}

export { anilistAPISearch }
