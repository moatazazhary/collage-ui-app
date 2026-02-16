import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType : 'autoUpdate',
      includeAssets: [
        "/public/logo.png",
      ],
      manifest :{
        name : "collage app",
        short_name : "كلية الإقتصاد",
        theme_color : "#4151ab",
        background_color : "#f8fafc",
        orientation : "portrait",
        display:"fullscreen",
        start_url : '/',
        icons : [
          {src : '/public/logo.png',
            sizes : '512x512',
            type : 'image/png'
          }
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "style" ||
              request.destination === "script" ||
              request.destination === "worker",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request, url }) => {
              if (url.pathname.startsWith("/uploads")) return false;
              return request.destination === "image";
            },
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
              },
            },
          },
          {
          urlPattern: ({ url }) => url.pathname.startsWith('/uploads'),
          handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
