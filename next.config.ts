import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(process.env.NEXT_PUBLIC_IMAGE_HOST || "")],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
