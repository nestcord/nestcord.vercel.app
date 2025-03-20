import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "frhbjqrfnnemrkilykjd.supabase.co",
      pathname: "/storage/v1/**"
    }]
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
};

export default nextConfig;
