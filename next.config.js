/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => key.includes('NEXT_PUBLIC_'))
    ),
  },
};

module.exports = nextConfig;
