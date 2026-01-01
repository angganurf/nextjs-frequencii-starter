import type { Metadata } from "next";
import "./globals.css";
import SocialProofAlert from "@/components/ui/social-proof-alert";
import FacebookPixel from "@/components/facebook-pixel";

export const metadata: Metadata = {
	title: "Editin foto - Tools Editin Foto Ai Professional.",
	description:
		"Frequencii helps marketing teams easily store, organize, and access valuable assets from anywhere. Streamline your marketing workflow today.",
	keywords: [
		"marketing assets",
		"asset management",
		"marketing tools",
		"digital assets",
		"marketing workflow",
	],
	verification: {
		other: {
			"facebook-domain-verification": "a5z057s2ahzra3vk5c0aipe3t837lm",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className="font-body bg-body text-body antialiased"
				suppressHydrationWarning
			>
				<div className="max-w-[510px] md:max-w-[688px] min-h-screen flex w-full flex-col mx-auto">
					{children}
				</div>
				<SocialProofAlert />
				<FacebookPixel />
			</body>
		</html>
	);
}
