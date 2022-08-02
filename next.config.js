/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "demos.creative-tim.com",
      "sportsconnect-profilepics.s3.amazonaws.com",
    ],
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
