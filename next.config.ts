import type { NextConfig } from "next";
import { spawn } from 'child_process';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    // 只在生产构建时生成RSS
    if (!dev && isServer) {
      config.plugins.push({
        apply: (compiler: any) => {
          compiler.hooks.afterEmit.tapAsync('GenerateRSSPlugin', (compilation: any, callback: any) => {
            const scriptPath = path.join(process.cwd(), 'scripts', 'generate-rss.ts');
            const child = spawn('npx', ['tsx', scriptPath], { stdio: 'inherit' });
            
            child.on('close', (code) => {
              if (code !== 0) {
                console.error('RSS generation failed');
              }
              callback();
            });
          });
        }
      });
    }
    
    return config;
  }
};

export default nextConfig;
