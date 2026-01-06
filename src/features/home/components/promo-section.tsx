"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";

const PromoSection: React.FC = () => {
	const t = useTranslations("Promo");

	return (
		<section className="py-16 bg-linear-to-br from-yellowGreen-700 to-[#1765cc] relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
			</div>

			<div className="container px-4 mx-auto relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					{/* Main Headline */}
					<p className="text-white/90 text-lg md:text-xl mb-6 font-medium">
						{t("headline")}
					</p>

					{/* Product Title */}
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
						{t("title")}
						<span className="block text-lg md:text-xl font-normal text-white/80 mt-2">
							{t("subtitle")}
						</span>
					</h2>

					{/* Pricing */}
					<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
						<div className="flex flex-col items-center gap-3">
							<p className="text-white/70 text-lg">
								{t("normalPriceLabel")}{" "}
								<span className="line-through text-red-300">
									{t("normalPriceValue")}
								</span>
							</p>
							<div className="flex items-center gap-3">
								<span className="text-yellow-400 text-2xl">🔥</span>
								<p className="text-white text-xl md:text-2xl font-bold">
									{t("promoLabel")}
								</p>
							</div>
							<p className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
								{t("promoPriceValue")}
							</p>
						</div>

						<p className="text-white/90 mt-6 text-lg">{t("description")}</p>
					</div>

					{/* CTA Button */}
					<Link
						onClick={() => {
							import("@/lib/fb-events").then(({ trackViewContent }) => {
								trackViewContent();
							});
							document.getElementById("payment-form-section")?.scrollIntoView({
								behavior: "smooth",
							});
						}}
						href="#"
						className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-indigo-700 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform mb-8"
					>
						{t("cta")}
					</Link>

					{/* Warning/Urgency */}
					<div className="bg-red-500/20 border border-red-400/50 rounded-xl p-6 max-w-2xl mx-auto">
						<p className="text-white flex items-start gap-3 text-left">
							<span className="text-2xl shrink-0">⚠️</span>
							<span>
								<strong className="text-yellow-300">{t("warningTitle")}</strong>{" "}
								{t("warningText")}
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoSection;
