import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    middlewareMode: false,
  },
  plugins: [
    {
      name: 'no-cache-base-svg',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/base.svg') {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
          }
          next()
        })
      }
    }
  ]
})
