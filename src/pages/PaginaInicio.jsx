import { useEffect, useState } from 'react'
import { buscarArtistas, obtenerVariosArtistas } from '../services/spotifyApi'
import { useFavoritos } from '../context/FavoritosContext'
import TarjetaArtista from '../components/TarjetaArtista'
import Cargando from '../components/Cargando'
import MensajeError from '../components/MensajeError'

const IDS_POPULARES = [
  '4q3ewBCX7sLwd24euuV69X', // Bad Bunny
  '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
  '1Xyo4u8uXC1ZmMpatF05PJ', // The Weeknd
  '4gzpq5DPGxSnKTe4SA8HAU', // Coldplay
  '1bAftSH8umNcGZ0uyV7LMg', // Duki
  '790FomKkXshlbRYZFtlgla', // Karol G
  '3TVXtAsR1Inumwj472S9r4', // Drake
  '6qqNVTkY8uBg9cP3Jd7DAH', // Billie Eilish
]

function PaginaInicio() {
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [busco, setBusco] = useState(false)

  const [populares, setPopulares] = useState([])

  const { favoritos } = useFavoritos()

  useEffect(() => {
    async function cargarPopulares() {
      try {
        const data = await obtenerVariosArtistas(IDS_POPULARES)
        setPopulares(data)
      } catch (err) {
        console.error('Error cargando populares:', err)
      }
    }
    cargarPopulares()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!busqueda.trim()) return

    setCargando(true)
    setError(null)
    setBusco(true)

    try {
      const data = await buscarArtistas(busqueda)
      setResultados(data)
    } catch (err) {
      setError(err.message)
      setResultados([])
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="page">
      <h1>Buscador de Artistas</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: Coldplay, Dua Lipa..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>

      {favoritos.length > 0 && !busco && (
        <section className="favorites-section">
          <h2>Tus Favoritos</h2>
          <div className="grid">
            {favoritos.map((artista) => (
              <TarjetaArtista key={artista.id} artista={artista} />
            ))}
          </div>
        </section>
      )}

      {!busco && populares.length > 0 && (
        <section>
          <h2>Artistas populares</h2>
          <div className="grid">
            {populares.map((artista) => (
              <TarjetaArtista key={artista.id} artista={artista} />
            ))}
          </div>
        </section>
      )}

      {cargando && <Cargando />}
      {error && <MensajeError mensaje={error} />}

      {busco && !cargando && !error && (
        <section>
          <h2>Resultados</h2>
          {resultados.length === 0 ? (
            <p>No se encontraron artistas.</p>
          ) : (
            <div className="grid">
              {resultados.map((artista) => (
                <TarjetaArtista key={artista.id} artista={artista} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default PaginaInicio
