/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Owner photos live in /public/images and are served by next/image.
    // Remote patterns kept empty on purpose — all imagery is local and owner-controlled.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
