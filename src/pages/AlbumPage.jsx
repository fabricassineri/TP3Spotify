import { useParams } from 'react-router-dom'

function AlbumPage() {
  const { id } = useParams()

  return (
    <div className="page">
      <h1>Canciones del Album</h1>
      <p>id: {id}</p>
    </div>
  )
}

export default AlbumPage
