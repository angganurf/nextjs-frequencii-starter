"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BenefitsSection: React.FC = () => {
	const t = useTranslations("Benefits");

	return (
		<section className="py-16 bg-gray-50">
			<div className="container px-4 mx-auto">
				<div className="max-w-4xl mx-auto">
					{/* Main Headline */}
					<div className="text-center mb-12">
						<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
							{t("badge")}
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 px-2">
							{t("title")}
						</h2>
						<p className="text-xl text-gray-600">{t("description")}</p>
					</div>

					{/* Highlight Box */}
					<div className="bg-linear-to-r text-center from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-12 border border-blue-100">
						<p className="text-lg text-gray-700 mb-4">
							{t("highlight.p1_start")}{" "}
							<span className="font-semibold text-blue-600">
								{t("highlight.p1_bold")}
							</span>
							{t("highlight.p1_end")}
						</p>
						<p className="text-lg text-gray-700">{t("highlight.p2")}</p>
					</div>

					{/* Pain Points */}
					<div className="space-y-8 mb-12 text-justify px-4">
						{/* Pain Point 1 */}
						<div className="flex gap-4">
							<div className="shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
								<span className="text-xl">😩</span>
							</div>
							<div>
								<p className="text-gray-700 leading-relaxed">
									<span className="font-semibold">
										{t("painPoints.p1_bold")}
									</span>{" "}
									{t("painPoints.p1_text")}
								</p>
							</div>
						</div>

						{/* Pain Point 2 */}
						<div className="flex gap-4">
							<div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<span className="text-xl">😵</span>
							</div>
							<div>
								<p className="text-gray-700 leading-relaxed">
									<span className="font-semibold">
										{t("painPoints.p2_bold")}
									</span>{" "}
									{t("painPoints.p2_text")}
								</p>
							</div>
						</div>
					</div>

					{/* Solution */}
					<div className="bg-gray-900 rounded-2xl p-8 md:p-10 mb-12 text-center">
						<p className="text-2xl md:text-3xl font-bold text-white mb-4">
							{t("solution.intro_start")}{" "}
							<span className="text-blue-600">
								{t("solution.intro_highlight")}
							</span>{" "}
							{t("solution.intro_end")}
						</p>
						<p className="text-lg text-gray-300 mb-6">
							{t("solution.desc_start")}{" "}
							<span className="text-blue-400 font-semibold">
								{t("solution.desc_highlight")}
							</span>
							{t("solution.desc_end")}
						</p>

						{/* Benefits */}
						<div className="flex flex-wrap justify-center gap-4 mb-6">
							{/* Assuming fixed 3 items as per JSON, but could map if needed. Keeping static for layout control */}
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								{t("solution.benefits.0")}
							</div>
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								{t("solution.benefits.1")}
							</div>
							<div className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
								{t("solution.benefits.2")}
							</div>
						</div>
					</div>

					{/* Use Cases */}
					<div className="mb-12">
						<p className="text-lg text-gray-700 text-center leading-relaxed">
							{t("useCases.text_start")}{" "}
							<span className="font-semibold text-pink-600">
								{t("useCases.text_pink")}
							</span>
							{t("useCases.text_comma1")}{" "}
							<span className="font-semibold text-purple-600">
								{t("useCases.text_purple")}
							</span>
							{t("useCases.text_comma2")}{" "}
							<span className="font-semibold text-blue-600">
								{t("useCases.text_blue")}
							</span>{" "}
							{t("useCases.text_end")}
						</p>
					</div>

					{/* Bottom CTA */}
					<div className="bg-linear-to-r from-yellowGreen-700 to-[#1765cc] rounded-2xl p-8 text-center">
						<p className="text-xl md:text-2xl font-bold text-white mb-4">
							{t("bottomCTA.title_start")}{" "}
							<span className="text-yellow-300">
								{t("bottomCTA.title_highlight")}
							</span>
							{t("bottomCTA.title_end")}
						</p>
						<p className="text-lg text-blue-100 mb-6">
							{t("bottomCTA.subtitle")}
						</p>
						<Link
							href="#payment-section"
							onClick={() => {
								import("@/lib/fb-events").then(({ trackViewContent }) => {
									trackViewContent();
								});
							}}
							className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							{t("bottomCTA.button")}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
