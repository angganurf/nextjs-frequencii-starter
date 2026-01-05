import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 300,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
		qualities: [25, 50, 75, 90, 95, 100],
	},
	typedRoutes: true,
	reactStrictMode: false,
};

export default nextConfig;
