/*
 * @Author: 关振俊
 * @Date: 2024-11-20 09:16:36
 * @LastEditors: 关振俊
 * @LastEditTime: 2025-01-16 17:41:23
 * @Description:
 */
import type { NextConfig } from "next";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          // you can add other languages here as needed
          // (list of languages: https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages)
          languages: ["javascript", "typescript", "php", "python"],
          filename: "static/[name].worker.[contenthash].js",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
