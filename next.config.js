/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    // Evita que Next.js ejecute ESLint durante `next build`.
    // Esto previene errores de "Converting circular structure to JSON"
    // que pueden aparecer al serializar la configuración completa de ESLint.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}