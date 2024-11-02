/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/stockbot-on-groq',
  assetPrefix: '/stockbot-on-groq/',
  distDir: '.next',
  experimental: {
    outputFileTracingRoot: '/var/www/html/stockbot-on-groq'
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}
