import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * turbopack.root 를 이 파일이 있는 폴더로 잡습니다.
 *
 * 예전에는 "C:/Users/qkdgh/Downloads/한사랑속편한내과_일산_홈페이지" 라는
 * 절대경로가 박혀 있었는데, 폴더를 옮긴 뒤로 그 경로가 사라져서
 * `Invalid distDirRoot: ".next"` 오류로 빌드가 전부 실패했습니다.
 * (Vercel 은 리눅스라 C:/ 경로 자체가 성립하지 않습니다)
 *
 * 절대경로를 다시 적지 마세요. 폴더를 옮기면 또 깨집니다.
 */
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
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
