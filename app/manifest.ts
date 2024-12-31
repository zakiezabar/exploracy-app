import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Exploracy',
    short_name: 'Exploracy',
    description: 'New light to discover',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#38427B',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}