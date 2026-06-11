import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/stardust009-spec/Caelyndor-Assets/main/**"
      },
      {
        protocol: "https",
        hostname: "stardust009-spec.github.io",
        pathname: "/Caelyndor-Assets/**"
      }
    ]
  }
};

export default nextConfig;
