/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'lovely-flamingo-139.convex.cloud'
      },
      {
        protocol:'https',
        hostname:'valiant-chickadee-123.convex.cloud'
      }
    ]
  }
};

export default nextConfig;
