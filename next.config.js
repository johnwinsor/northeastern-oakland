/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
    {
        source: '/api/:path*',
        destination:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/:path*'
            : '/api/',
    },
    ]
  },  
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
