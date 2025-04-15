/** @type {import('next').NextConfig} */
// next.config.mjs

export const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: "https",
            hostname: "picsum.photos",
        },
      ],
    },
  };
  
  export default nextConfig;
  