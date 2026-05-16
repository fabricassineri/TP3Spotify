import axios from 'axios'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const AUTH_URL = 'https://accounts.spotify.com/api/token'
const API_URL = 'https://api.spotify.com/v1'

let accessToken = null
let tokenExpiresAt = 0

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'client_credentials')
  body.append('client_id', CLIENT_ID)
  body.append('client_secret', CLIENT_SECRET)

  const response = await axios.post(AUTH_URL, body)

  accessToken = response.data.access_token
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000

  return accessToken
}

const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function searchArtists(query, limit = 20) {
  const res = await api.get('/search', {
    params: { q: query, type: 'artist', limit },
  })
  return res.data.artists.items
}

export async function getArtist(artistId) {
  const res = await api.get(`/artists/${artistId}`)
  return res.data
}

export async function getArtistAlbums(artistId, limit = 50) {
  const res = await api.get(`/artists/${artistId}/albums`, {
    params: { include_groups: 'album,single', limit },
  })
  return res.data.items
}

export async function getAlbum(albumId) {
  const res = await api.get(`/albums/${albumId}`)
  return res.data
}
