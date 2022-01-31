const withPWA = require('next-pwa');

module.exports = withPWA({
  future: { webpack5: false },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  env: {
    siteTitle: 'Dulce Bebe',
    siteDescription: 'Tienda On line!',
    siteKeywords: 'bebes, juguetes, indumentaria',
    siteUrl: 'https://www.dulcebebe.com',
    siteImagePreviewUrl: '/images/main.jpg',
    twitterHandle: '@dulcebebe'
  },
  images: {
    domains: ['vps-2124680-x.dattaweb.com', 'localhost'],
  },
})
