import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="logo">SpotiTP</Link>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="*" element={<h1>404 - Pagina no encontrada</h1>} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>TP3 - Desarrollo de Software UTN</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
