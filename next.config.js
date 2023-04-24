/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api-pokemon-fr.vercel.app/',
  },
};

module.exports = nextConfig;
