/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },

  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
