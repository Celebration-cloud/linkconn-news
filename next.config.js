/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**", // Allow any hostname
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "**", // Allow any hostname (http)
    //   },
    // ],
    domains: ["fra.cloud.appwrite.io"],
  },
};

module.exports = nextConfig;
