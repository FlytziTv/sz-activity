import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dam.salomon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "contents.mediadecathlon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
