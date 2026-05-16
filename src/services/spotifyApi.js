import axios from 'axios'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const URL_AUTH = 'https://accounts.spotify.com/api/token'
const URL_API = 'https://api.spotify.com/v1'

let token = null
let tokenExpira = 0

async function obtenerToken() {
  if (token && Date.now() < tokenExpira) {
    return token
  }

  console.log('CLIENT_ID:', CLIENT_ID)
  console.log('CLIENT_SECRET length:', CLIENT_SECRET?.length)

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Faltan credenciales en el archivo .env')
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'client_credentials')
  body.append('client_id', CLIENT_ID)
  body.append('client_secret', CLIENT_SECRET)

  try {
    const respuesta = await axios.post(URL_AUTH, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    token = respuesta.data.access_token
    tokenExpira = Date.now() + respuesta.data.expires_in * 1000
    return token
  } catch (err) {
    console.error('Error auth Spotify:', err.response?.data || err.message)
    throw new Error('No se pudo autenticar con Spotify. Revisa credenciales.')
  }
}

const api = axios.create({ baseURL: URL_API })

api.interceptors.request.use(async (config) => {
  const t = await obtenerToken()
  config.headers.set('Authorization', `Bearer ${t}`)
  console.log('Authorization header:', config.headers.get('Authorization')?.substring(0, 20) + '...')
  return config
})

export async function buscarArtistas(nombre, limite = 20) {
  const res = await api.get('/search', {
    params: { q: nombre, type: 'artist', limit: limite },
  })
  return res.data.artists.items
}

export async function obtenerArtista(idArtista) {
  const res = await api.get(`/artists/${idArtista}`)
  return res.data
}

export async function obtenerAlbumesDelArtista(idArtista, limite = 50) {
  const res = await api.get(`/artists/${idArtista}/albums`, {
    params: { include_groups: 'album,single', limit: limite },
  })
  return res.data.items
}

export async function obtenerAlbum(idAlbum) {
  const res = await api.get(`/albums/${idAlbum}`)
  return res.data
}
