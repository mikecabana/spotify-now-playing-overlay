import { MetadataRoute } from 'next';
import { description } from './layout';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Spotify NPO',
        short_name: 'Spotify NPO',
        description,
        start_url: '/',
        display: 'standalone',
        background_color: '#121212',
        theme_color: '#121212',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
