import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function ArtistCard({ artist }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(artist.id)
  const image = artist.images?.[0]?.url

  function toggleFav(e) {
    e.preventDefault()
    if (fav) {
      removeFavorite(artist.id)
    } else {
      addFavorite(artist)
    }
  }

  return (
    <Link to={`/artist/${artist.id}`} className="card">
      {image ? (
        <img src={image} alt={artist.name} className="card-img" />
      ) : (
        <div className="card-img card-img-placeholder">?</div>
      )}
      <div className="card-body">
        <h3>{artist.name}</h3>
        <button onClick={toggleFav} className="fav-btn">
          {fav ? '★ Quitar' : '☆ Favorito'}
        </button>
      </div>
    </Link>
  )
}

export default ArtistCard
