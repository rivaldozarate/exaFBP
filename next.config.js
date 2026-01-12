/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'], // Agregar dominios de imágenes aquí cuando uses Supabase
  },
}

module.exports = nextConfig
