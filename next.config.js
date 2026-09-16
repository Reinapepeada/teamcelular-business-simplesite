/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@nextui-org/react",
      "framer-motion",
      "lucide-react",
      "@tabler/icons-react",
    ],
  },
  images: {
    qualities: [75, 82],
    // AVIF first, WebP as fallback: same quality at meaningfully fewer bytes
    // on the hero, which is the LCP element.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      // Consolidacion de head terms (GSC 2026-07-15/08-09): estas URLs no
      // ranqueaban (8, 6, 8 y 0 impresiones en 26 dias) y aparecian en pos
      // 60-99 para "reparacion de celulares caba", diluyendo la eleccion de
      // canonica de Google. Cada una cae en su equivalente mas cercano.
      { source: "/arreglo-de-celulares", destination: "/reparaciones", permanent: true },
      {
        source: "/tecnico-de-celulares",
        destination: "/reparaciones/reparacion-placa-caba",
        permanent: true,
      },
      { source: "/zonas/recoleta", destination: "/sucursales/caba/recoleta", permanent: true },
      { source: "/zonas/belgrano", destination: "/sucursales/caba/belgrano", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://teamcelular.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
