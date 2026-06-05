const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY

const buildUrl = (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  return `${url}?${queryString}`
}

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options)
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return response.json()
}

export async function fetchPhotos(query, page = 1, per_page = 20, signal) {
  return fetchJson(buildUrl('https://api.unsplash.com/search/photos', { query, page, per_page }), {
    method: 'GET',
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    signal,
  })
}

export async function fetchVideos(query, per_page = 20, signal) {
  return fetchJson(buildUrl('https://api.pexels.com/videos/search', { query, per_page }), {
    method: 'GET',
    headers: { Authorization: PEXELS_KEY },
    signal,
  })
}

export async function fetchGifs(query, per_page = 20, signal) {
  return fetchJson(buildUrl('https://api.giphy.com/v1/stickers/search', { q: query, limit: per_page, api_key: GIPHY_KEY }), {
    method: 'GET',
    signal,
  })
}

