# TP3 - SpotiTP

Trabajo Practico 3 de Desarrollo de Software (UTN). SPA en React que consume la API de Spotify.

## Tecnologias

- React 18
- Vite
- React Router DOM
- Axios

## Como correrlo

1. Clonar el repo e instalar dependencias:
   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raiz (podes copiar `.env.example`):
   ```
   VITE_SPOTIFY_CLIENT_ID=tu_client_id
   VITE_SPOTIFY_CLIENT_SECRET=tu_client_secret
   ```

   Las credenciales se sacan creando una app en https://developer.spotify.com/dashboard

3. Levantar el server:
   ```bash
   npm run dev
   ```

   Abrir http://localhost:5173

## Vistas

- `/` - Buscador de artistas + favoritos guardados en localStorage
- `/artist/:id` - Info del artista y listado de albumes
- `/album/:id` - Canciones del album con reproductor de preview de 30 seg

## Deploy

(Pendiente de subir a Vercel/Netlify)
