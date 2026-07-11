import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder (a stray package-lock.json exists in
  // the user's home dir, which otherwise makes Next infer the wrong root).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
