import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@softcapphyjas/config",
    "@softcapphyjas/ui",
    "@softcapphyjas/auth",
    "@softcapphyjas/payments",
    "@softcapphyjas/ai",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
