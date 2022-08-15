/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'demos.creative-tim.com',
      'sportsconnect-profilephotos.s3.amazonaws.com',
    ],
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
