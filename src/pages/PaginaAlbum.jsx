import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerAlbum } from '../services/spotifyApi'
import Cargando from '../components/Cargando'
import MensajeError from '../components/MensajeError'

function formatearDuracion(ms) {
  const totalSeg = Math.floor(ms / 1000)
  const min = Math.floor(totalSeg / 60)
  const seg = totalSeg % 60
  return `${min}:${seg.toString().padStart(2, '0')}`
}

function PaginaAlbum() {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [previewActual, setPreviewActual] = useState(null)

  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const data = await obtenerAlbum(id)
        setAlbum(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) return <Cargando />
  if (error) return <MensajeError mensaje={error} />
  if (!album) return null

  const imagen = album.images?.[0]?.url
  const canciones = album.tracks?.items || []

  return (
    <div className="page">
      <Link to={`/artist/${album.artists[0].id}`} className="back-btn">
        ← Volver a {album.artists[0].name}
      </Link>

      <div className="album-header">
        {imagen && <img src={imagen} alt={album.name} className="album-img" />}
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
        {canciones.map((track, i) => (
          <li key={track.id} className="track-item">
            <span className="track-number">{i + 1}</span>
            <div className="track-info">
              <p className="track-name">{track.name}</p>
              <p className="track-artists">
                {track.artists.map((a) => a.name).join(', ')}
              </p>
            </div>
            <span className="track-duration">{formatearDuracion(track.duration_ms)}</span>
            {track.preview_url ? (
              <button
                className="play-btn"
                onClick={() =>
                  setPreviewActual(
                    previewActual === track.preview_url ? null : track.preview_url
                  )
                }
              >
                {previewActual === track.preview_url ? '■' : '▶'}
              </button>
            ) : (
              <span className="no-preview">sin preview</span>
            )}
          </li>
        ))}
      </ul>

      {previewActual && (
        <div className="player">
          <audio src={previewActual} controls autoPlay onEnded={() => setPreviewActual(null)} />
        </div>
      )}
    </div>
  )
}

export default PaginaAlbum
