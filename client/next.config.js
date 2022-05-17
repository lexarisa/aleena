/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['github.com'] },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    BASEURL:  process.env.BASEURL
  }
};

module.exports = nextConfig;
