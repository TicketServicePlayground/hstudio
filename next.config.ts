import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
