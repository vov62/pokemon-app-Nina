import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "pokemon-app",
        short_name: "pokemon-app",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#f1f1f1",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/src/assets/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "image/png",
          },
          {
            src: "/src/assets/android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "image/png",
          },
          {
            src: "/src/assets/favicon-32x32.png",
            sizes: "32x32",
            purpose: "image/png",
          },
          {
            src: "/src/assets/favicon-16x16.png",
            sizes: "16x16",
            purpose: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
