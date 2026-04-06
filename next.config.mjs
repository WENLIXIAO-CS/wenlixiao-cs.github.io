/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/self-improve-VLA-PLD',
          destination: 'https://pld-website.vercel.app/self-improve-VLA-PLD/',
        },
        {
          source: '/self-improve-VLA-PLD/',
          destination: 'https://pld-website.vercel.app/self-improve-VLA-PLD/',
        },
        {
          source: '/self-improve-VLA-PLD/:path*',
          destination: 'https://pld-website.vercel.app/self-improve-VLA-PLD/:path*',
        },
      ],
    }
  },
}

export default nextConfig 