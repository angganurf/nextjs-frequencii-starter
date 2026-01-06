"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";

import { useTranslations } from "next-intl";

const ComparisonSection: React.FC = () => {
	const t = useTranslations("Comparison");

	return (
		<section className="py-16 bg-gray-50">
			<div className="container px-4 mx-auto">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
							{t("badge")}
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("title")}
						</h2>
						<p className="text-lg text-gray-600">{t("subtitle")}</p>
					</div>

					{/* Comparison Grid */}
					<div className="grid md:grid-cols-2 gap-8 mb-12">
						{/* Traditional Cost */}
						<div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
							<div className="text-center mb-6">
								<span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
									{t("traditional.badge")}
								</span>
								<h3 className="text-xl font-bold text-gray-900">
									{t("traditional.title")}
								</h3>
							</div>

							<div className="space-y-4">
								<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
									<span className="text-2xl">💸</span>
									<div>
										<p className="font-semibold text-gray-900">
											{t("traditional.item1")}
										</p>
										<p className="text-xl font-bold text-red-500 whitespace-nowrap">
											{t("traditional.price1")}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
									<span className="text-2xl">💸</span>
									<div>
										<p className="font-semibold text-gray-900">
											{t("traditional.item2")}
										</p>
										<p className="text-xl font-bold text-red-500 whitespace-nowrap">
											{t("traditional.price2")}
										</p>
									</div>
								</div>

								<div className="border-t border-gray-200 pt-4 mt-4">
									<p className="text-sm text-gray-500 mb-2 text-center">
										{t("traditional.totalLabel")}
									</p>
									<p className="text-3xl text-center font-bold text-red-600">
										{t("traditional.totalPrice")}
									</p>
									<p className="text-sm text-center text-gray-500 mt-1">
										{t("traditional.totalNote")}
									</p>
								</div>
							</div>
						</div>

						{/* Editin Foto Cost */}
						<div className="bg-linear-to-br from-yellowGreen-700 to-[#1765cc]  rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
							{/* Decorative */}
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

							<div className="text-center mb-6 relative z-10">
								<span className="inline-block px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold mb-4">
									{t("editin.badge")}
								</span>
								<h3 className="text-xl font-bold">{t("editin.title")}</h3>
							</div>

							<div className="space-y-4 relative z-10">
								<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
									<p className="text-blue-100 mb-2">
										{t("editin.specialPriceLabel")}
									</p>
									<p className="text-4xl font-extrabold text-yellow-400 mb-2">
										{t("editin.price")}
									</p>
									<div className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-white text-sm font-bold">
										{t("editin.unlimitedBadge")}
									</div>
								</div>

								<ul className="space-y-2 text-blue-100">
									<li className="flex items-center gap-2">{t("editin.f1")}</li>
									<li className="flex items-center gap-2">{t("editin.f2")}</li>
									<li className="flex items-center gap-2">{t("editin.f3")}</li>
									<li className="flex items-center gap-2">{t("editin.f4")}</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Result */}
					<div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 text-center mb-8">
						<p className="text-lg text-gray-600 mb-2">{t("result.label")}</p>
						<p className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
							{t("result.main")}
						</p>
						<p className="text-gray-700">{t("result.sub")}</p>
					</div>

					{/* Bottom Summary */}
					<div className="text-center">
						<p className="text-xl text-gray-700 mb-2">
							<span className="font-bold">{t("bottom.title")}</span>
						</p>
						<p className="text-lg text-gray-600 mb-6">
							{t("bottom.desc")}
							<br />
							<span className="font-semibold text-blue-600">
								{t("bottom.highlight")}
							</span>
						</p>
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
							{t("bottom.cta")}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ComparisonSection;
