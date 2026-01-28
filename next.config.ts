import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_URL}/api/:path*`,
      },
      {
        source: "/image-proxy/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PATH}/:path*`,
      },
    ];
  },
};

export default nextConfig;
