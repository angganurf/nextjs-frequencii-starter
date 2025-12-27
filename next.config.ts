import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
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
