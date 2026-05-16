import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(artist) {
    setFavorites((prev) => {
      if (prev.find((a) => a.id === artist.id)) return prev
      return [...prev, artist]
    })
  }

  function removeFavorite(artistId) {
    setFavorites((prev) => prev.filter((a) => a.id !== artistId))
  }

  function isFavorite(artistId) {
    return favorites.some((a) => a.id === artistId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
