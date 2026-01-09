import type { Metadata } from "next";
import { Figtree } from "next/font/google"; // Import font
import "../globals.css";
import SocialProofAlert from "@/components/ui/social-proof-alert";
import FacebookPixel from "@/components/facebook-pixel";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

const figtree = Figtree({
	subsets: ["latin"],
	variable: "--font-figtree",
	display: "swap",
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Metadata" });

	return {
		metadataBase: new URL("https://editinfoto.site"),
		title: t("title"),
		description: t("description"),
		keywords: t("keywords")
			.split(",")
			.map((k) => k.trim()),
		verification: {
			other: {
				"facebook-domain-verification": "a5z057s2ahzra3vk5c0aipe3t837lm",
			},
		},
		openGraph: {
			images: ["/images/og-preview.png"],
		},
		twitter: {
			card: "summary_large_image",
			images: ["/images/og-preview.png"],
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${figtree.variable} font-body bg-body text-body antialiased`}
				suppressHydrationWarning
			>
				<NextIntlClientProvider messages={messages}>
					<div className="max-w-[510px] md:max-w-[688px] min-h-screen flex w-full flex-col mx-auto">
						{children}
					</div>
					<SocialProofAlert />
					<FacebookPixel />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
