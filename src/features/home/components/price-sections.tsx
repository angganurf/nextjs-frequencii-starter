"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import PaymentForm from "./payment-form";
import Button from "@/components/ui/button";

const PriceSection: React.FC = () => {
	const t = useTranslations("Price");

	return (
		<section id="payment-section" className="py-2 mt-12">
			<div className="container px-4 mx-auto">
				<div className="max-w-7xl mx-auto">
					<div className="max-w-2xl mx-auto mb-20 text-center">
						<div className="w-full mx-auto mb-4">
							<Image
								src="/images/editin-logo.png"
								className="mx-auto"
								alt="Editin Foto logo"
								width={200}
								height={40}
							/>
						</div>
						<p className="text-lg text-gray-500 mb-8 lowercase text-md">
							{t("logoSubtitle")}
						</p>
						<img
							className="relative block mx-auto lg:px-8"
							src="/images/mockup-device.png"
							alt="Frequencii dashboard showing marketing asset organization and management interface"
						/>
						<div className="mt-8 text-center">
							<p className="text-xl font-bold bg-linear-to-r from-red-600 via-orange-500 via-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
								{t("comparisonLabel")}
							</p>
						</div>
						<h3 className="text-2xl sm:text-4xl font-bold mt-4">
							{t("editinTitle")}{" "}
							<span className="text-blue-600">{t("editinTitleHighlight")}</span>
						</h3>
						<h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mt-5">
							<span className="bg-blue-600 px-4 text-white">
								{t("priceBadge")}
							</span>
						</h1>
						<div className="mt-6 text-center mb-3">
							<p className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
								{t("unlimitedLabel")}
							</p>
						</div>
						{/* CTA Button */}
						<Button
							variant="primary"
							size="default"
							className="group"
							onClick={() => {
								import("@/lib/fb-events").then(({ trackViewContent }) => {
									trackViewContent();
								});
								document
									.getElementById("payment-form-section")
									?.scrollIntoView({
										behavior: "smooth",
									});
							}}
							aria-label="Get started with Editin Foto"
						>
							{t("cta")}
						</Button>
						<p className="text-md italic mt-2 leading-7">{t("footer")}</p>

						<img
							className="relative block mx-auto px-6"
							src="/images/down.gif"
							alt="Arrow down"
							width={200}
							height={200}
							id="payment-form-section"
						/>
						{/* Payment Form Integration */}
						<PaymentForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default PriceSection;
