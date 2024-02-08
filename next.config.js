/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
    {
        source: '/api/:path*',
        destination: 
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8080/api/:path*'
          : '/api/',
        //source: '/api/:path*',
        //destination: 'http://127.0.0.1:8080/api/:path*', // Proxy to Backend
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
