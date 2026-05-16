import { useState } from 'react'
import { searchArtists } from '../services/spotifyApi'
import { useFavorites } from '../context/FavoritesContext'
import ArtistCard from '../components/ArtistCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const { favorites } = useFavorites()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const data = await searchArtists(query)
      setResults(data)
    } catch (err) {
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Buscador de Artistas</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: Coldplay, Dua Lipa..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>

      {favorites.length > 0 && !searched && (
        <section className="favorites-section">
          <h2>Tus Favoritos</h2>
          <div className="grid">
            {favorites.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {searched && !loading && !error && (
        <section>
          <h2>Resultados</h2>
          {results.length === 0 ? (
            <p>No se encontraron artistas.</p>
          ) : (
            <div className="grid">
              {results.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default HomePage
