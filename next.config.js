/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname
      },
      {
        protocol: "http",
        hostname: "**", // Allow any hostname (http)
      },
    ],
  },
};

module.exports = nextConfig;
