/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  future: { webpack5: false },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  env: {
    siteTitle: 'Dulce Bebe',
    siteDescription: 'Tienda On line!',
    siteKeywords: 'Camara Comercial',
    siteUrl: 'https://www.dulcebebe.com',
    siteImagePreviewUrl: '/images/main.jpg',
    twitterHandle: '@CamaraComercialBolivar',
    backend: 'http://localhost:8888/eComm'
  },
  images: {
    domains: ['vps-2124680-x.dattaweb.com', 'localhost'],
  },
  /* config options here */
}
 
module.exports = nextConfig

// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   future: { webpack5: false },
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//   },
//   env: {
//     siteTitle: 'e-commerce',
//     siteDescription: 'Tienda On line!',
//     siteKeywords: 'bebes, juguetes, indumentaria',
//     siteUrl: 'https://www.dulcebebe.com',
//     siteImagePreviewUrl: '/images/main.jpg',
//     twitterHandle: '@dulcebebe',
//     backend: 'http://localhost:8888/eComm'
//   },
//   images: {
//     domains: ['vps-2124680-x.dattaweb.com', 'localhost'],
//   },
// })