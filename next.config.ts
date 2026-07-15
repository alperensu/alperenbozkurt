import type { NextConfig } from "next";

const basePath = '/alperenbozkurt';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
