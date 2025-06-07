/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    COOKIE_NAME: process.env.COOKIE_NAME,
  },
};

export default nextConfig;
