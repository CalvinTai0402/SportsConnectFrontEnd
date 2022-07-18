/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "d1muf25xaso8hp.cloudfront.net",
      "images.unsplash.com",
      "unpkg.com",
      "user-images.githubusercontent.com",
      "demos.creative-tim.com",
      "lavinephotography.com.au",
      "sportsconnect-profilephotos.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
