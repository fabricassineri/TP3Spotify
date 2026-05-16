import { Link } from 'react-router-dom'

function TarjetaAlbum({ album }) {
  const imagen = album.images?.[0]?.url
  const anio = album.release_date?.slice(0, 4)

  return (
    <Link to={`/album/${album.id}`} className="card">
      {imagen ? (
        <img src={imagen} alt={album.name} className="card-img" />
      ) : (
        <div className="card-img card-img-placeholder">?</div>
      )}
      <div className="card-body">
        <h3>{album.name}</h3>
        <p className="card-info">{anio} · {album.total_tracks} canciones</p>
      </div>
    </Link>
  )
}

export default TarjetaAlbum
