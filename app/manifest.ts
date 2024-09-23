import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Рента - учет квартир в п. Новая Чара',
    short_name: 'Рента',
    description: 'Учет квартир в п. Новая Чара',
    start_url: '/',
    display: 'standalone',
    background_color: '#e2e8f0',
    theme_color: '#e2e8f0',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/x-icon',
      },
    ],
  }
}