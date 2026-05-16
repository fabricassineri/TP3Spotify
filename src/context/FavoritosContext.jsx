import { createContext, useContext, useEffect, useState } from 'react'

const FavoritosContext = createContext()

export function ProveedorFavoritos({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos')
    return guardados ? JSON.parse(guardados) : []
  })

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  function agregarFavorito(artista) {
    setFavoritos((prev) => {
      if (prev.find((a) => a.id === artista.id)) return prev
      return [...prev, artista]
    })
  }

  function quitarFavorito(idArtista) {
    setFavoritos((prev) => prev.filter((a) => a.id !== idArtista))
  }

  function esFavorito(idArtista) {
    return favoritos.some((a) => a.id === idArtista)
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, quitarFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  return useContext(FavoritosContext)
}
