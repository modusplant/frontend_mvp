import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      isDevelopment
        ? new URL(process.env.NEXT_PUBLIC_IMAGE_HOST_DEV || "")
        : new URL(process.env.NEXT_PUBLIC_IMAGE_HOST_PROD || ""),
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: isDevelopment
          ? `${process.env.BASE_URL_DEV}/api/:path*`
          : `${process.env.BASE_URL_PROD}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
