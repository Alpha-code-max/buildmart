/** @type {import('next').NextConfig} */
// next.config.mjs

export const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: "https",
            hostname: "picsum.photos",
        },
        {
            protocol: "https",
            hostname: "res.cloudinary.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  