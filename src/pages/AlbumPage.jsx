import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAlbum } from '../services/spotifyApi'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function AlbumPage() {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPreview, setCurrentPreview] = useState(null)

  useEffect(() => {
    async function loadAlbum() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAlbum(id)
        setAlbum(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadAlbum()
  }, [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!album) return null

  const image = album.images?.[0]?.url
  const tracks = album.tracks?.items || []

  return (
    <div className="page">
      <Link to={`/artist/${album.artists[0].id}`} className="back-btn">
        ← Volver a {album.artists[0].name}
      </Link>

      <div className="album-header">
        {image && <img src={image} alt={album.name} className="album-img" />}
        <div>
          <h1>{album.name}</h1>
          <p>{album.artists.map((a) => a.name).join(', ')}</p>
          <p className="genres">
            {album.release_date?.slice(0, 4)} · {album.total_tracks} canciones
          </p>
        </div>
      </div>

      <h2>Canciones</h2>
      <ul className="track-list">
        {tracks.map((track, i) => (
          <li key={track.id} className="track-item">
            <span className="track-number">{i + 1}</span>
            <div className="track-info">
              <p className="track-name">{track.name}</p>
              <p className="track-artists">
                {track.artists.map((a) => a.name).join(', ')}
              </p>
            </div>
            <span className="track-duration">{formatDuration(track.duration_ms)}</span>
            {track.preview_url ? (
              <button
                className="play-btn"
                onClick={() =>
                  setCurrentPreview(
                    currentPreview === track.preview_url ? null : track.preview_url
                  )
                }
              >
                {currentPreview === track.preview_url ? '■' : '▶'}
              </button>
            ) : (
              <span className="no-preview">sin preview</span>
            )}
          </li>
        ))}
      </ul>

      {currentPreview && (
        <div className="player">
          <audio src={currentPreview} controls autoPlay onEnded={() => setCurrentPreview(null)} />
        </div>
      )}
    </div>
  )
}

export default AlbumPage
