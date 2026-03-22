import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.imweb.me" },
      { protocol: "https", hostname: "gehealthcare-ultrasound.com" },
      { protocol: "https", hostname: "images.allengers.net" },
      { protocol: "https", hostname: "m.kukinews.com" },
      { protocol: "https", hostname: "www.dkms.co.kr" },
      { protocol: "https", hostname: "www.medi114.co.kr" },
      { protocol: "https", hostname: "www.hitachi-hightech.com" },
    ],
  },
};

export default nextConfig;
