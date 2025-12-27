import type { Metadata } from "next";
import "./globals.css";

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
			</body>
		</html>
	);
}
