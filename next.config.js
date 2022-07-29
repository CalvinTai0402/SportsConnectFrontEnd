/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "demos.creative-tim.com",
      "sportsconnect-profilepics.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
