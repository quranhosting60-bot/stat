/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces a plain HTML/CSS/JS "out/" folder that works on
  // Hostinger shared hosting (no Node.js server required). Image optimization
  // must be disabled since there's no server to resize images on the fly —
  // images are pre-compressed at build time instead.
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
