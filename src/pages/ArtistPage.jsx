import { useParams } from 'react-router-dom'

function ArtistPage() {
  const { id } = useParams()

  return (
    <div className="page">
      <h1>Albumes del Artista</h1>
      <p>id: {id}</p>
    </div>
  )
}

export default ArtistPage
