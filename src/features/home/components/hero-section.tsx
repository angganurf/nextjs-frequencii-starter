"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

import { useTranslations } from "next-intl";

/**
 * Hero section component for the homepage
 * Features main heading, description, and call-to-action button
 */
const HeroSection: React.FC = () => {
	const t = useTranslations("Hero");

	return (
		<section className="container px-4 mx-auto" role="banner">
			<div className="relative py-16 pb-40 md:pb-72 px-2 xs:px-8 rounded-3xl overflow-hidden">
				{/* Background image */}
				<Image
					className="absolute top-0 left-0 w-full h-full object-cover opacity-25"
					src="/images/headers-bg-blue-plate.png"
					alt=""
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
				/>

				{/* Hero content */}
				<div className="relative max-w-lg lg:max-w-3xl mb-14 mx-auto text-center">
					<div className="max-w-lg md:max-w-2xl px-4 mx-auto">
						<h1 className="font-heading tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
							{t("title")}
						</h1>
						<p className="max-w-lg mx-auto text-lg text-gray-700 mb-10">
							{t("description")}
						</p>

						{/* CTA Button */}
						<Button
							variant="primary"
							size="default"
							className="group"
							onClick={() => {
								import("@/lib/fb-events").then(({ trackViewContent }) => {
									trackViewContent();
								});
								document.getElementById("payment-section")?.scrollIntoView({
									behavior: "smooth",
								});
							}}
							aria-label="Get started with Editin Foto"
						>
							{t("cta")}
						</Button>
					</div>
				</div>
			</div>

			{/* Feature image */}
			<Image
				className="relative block mx-auto  lg:px-8 -mt-40 md:-mt-64"
				src="/images/headers-header-2-new-center.png"
				alt="Editin Foto dashboard showing marketing asset organization and management interface"
				width={800}
				height={600}
				priority
			/>
		</section>
	);
};

export default HeroSection;
