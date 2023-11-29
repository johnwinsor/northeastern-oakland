/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'covers.openlibrary.org',
            port: '',
            pathname: '/b/**',
          },
          {
            protocol: 'https',
            hostname: 'books.google.com',
            port: '',
            pathname: '/books/**',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            port: '',
            pathname: '/books/**',
          },
          {
            protocol: 'https',
            hostname: 'tailwindui.com',
            port: '',
            pathname: '/img/**',
          },
        ],
      }
}

module.exports = nextConfig
