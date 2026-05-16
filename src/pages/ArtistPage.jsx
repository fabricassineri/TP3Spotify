import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArtist, getArtistAlbums } from '../services/spotifyApi'
import AlbumCard from '../components/AlbumCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function ArtistPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const [artistData, albumsData] = await Promise.all([
          getArtist(id),
          getArtistAlbums(id),
        ])
        setArtist(artistData)
        setAlbums(albumsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!artist) return null

  const image = artist.images?.[0]?.url

  return (
    <div className="page">
      <Link to="/" className="back-btn">← Volver al buscador</Link>

      <div className="artist-header">
        {image && <img src={image} alt={artist.name} className="artist-img" />}
        <div>
          <h1>{artist.name}</h1>
          <p>{artist.followers?.total.toLocaleString()} seguidores</p>
          <p className="genres">{artist.genres?.join(', ')}</p>
        </div>
      </div>

      <h2>Albumes</h2>
      {albums.length === 0 ? (
        <p>Este artista no tiene albumes.</p>
      ) : (
        <div className="grid">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ArtistPage
