import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ProveedorFavoritos } from './context/FavoritosContext'
import PaginaInicio from './pages/PaginaInicio'
import PaginaArtista from './pages/PaginaArtista'
import PaginaAlbum from './pages/PaginaAlbum'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ProveedorFavoritos>
        <div className="app">
          <header className="app-header">
            <Link to="/" className="logo">SpotiTP</Link>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<PaginaInicio />} />
              <Route path="/artist/:id" element={<PaginaArtista />} />
              <Route path="/album/:id" element={<PaginaAlbum />} />
              <Route path="*" element={<h1>404 - Pagina no encontrada</h1>} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>TP3 - Desarrollo de Software UTN</p>
          </footer>
        </div>
      </ProveedorFavoritos>
    </BrowserRouter>
  )
}

export default App
