import { Link } from 'react-router-dom'
import { useFavoritos } from '../context/FavoritosContext'

function TarjetaArtista({ artista }) {
  const { esFavorito, agregarFavorito, quitarFavorito } = useFavoritos()
  const fav = esFavorito(artista.id)
  const imagen = artista.images?.[0]?.url

  function toggleFav(e) {
    e.preventDefault()
    if (fav) {
      quitarFavorito(artista.id)
    } else {
      agregarFavorito(artista)
    }
  }

  return (
    <Link to={`/artist/${artista.id}`} className="card">
      {imagen ? (
        <img src={imagen} alt={artista.name} className="card-img" />
      ) : (
        <div className="card-img card-img-placeholder">?</div>
      )}
      <div className="card-body">
        <h3>{artista.name}</h3>
        <button onClick={toggleFav} className="fav-btn">
          {fav ? '★ Quitar' : '☆ Favorito'}
        </button>
      </div>
    </Link>
  )
}

export default TarjetaArtista
