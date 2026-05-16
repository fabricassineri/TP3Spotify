import { Link } from 'react-router-dom'

function AlbumCard({ album }) {
  const image = album.images?.[0]?.url
  const year = album.release_date?.slice(0, 4)

  return (
    <Link to={`/album/${album.id}`} className="card">
      {image ? (
        <img src={image} alt={album.name} className="card-img" />
      ) : (
        <div className="card-img card-img-placeholder">?</div>
      )}
      <div className="card-body">
        <h3>{album.name}</h3>
        <p className="card-info">{year} · {album.total_tracks} canciones</p>
      </div>
    </Link>
  )
}

export default AlbumCard
