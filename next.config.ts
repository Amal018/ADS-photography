import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      // src/lib/photos.ts adds ?v=<file version> so a replaced photo isn't served from cache.
      { pathname: "/photos/**" },
      { pathname: "/**", search: "" },
    ],
  },
};

export default nextConfig;
