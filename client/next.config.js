/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'githubusercontent.com',
      'github.com',
    ],
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    BASEURL: process.env.BASEURL,
  },
};
