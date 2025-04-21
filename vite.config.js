import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'website1.pandanrv.shop',
      'localhost',
      '127.0.0.1'
    ]
  }
})