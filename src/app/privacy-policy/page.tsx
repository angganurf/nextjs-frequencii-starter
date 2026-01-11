"use client";

import PageContainer from "@/components/layout/page-container";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
	const t = useTranslations("PrivacyPolicy");
	const seoData = {
		title: t("title") + " - Editin Foto",
		description: t("intro"),
	};

	return (
		<PageContainer title={t("title")} seo={seoData}>
			<section className="py-16 md:py-28 bg-gray-50/50">
				<div className="container px-4 mx-auto">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
								{t("badge")}
							</span>
							<h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
								{t("title")}
							</h1>
							<p className="text-gray-500">
								{t("lastUpdated")}{" "}
								<span className="font-medium text-gray-700">
									{new Date().toLocaleDateString("id-ID", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</p>
						</div>

						<div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 prose prose-lg max-w-none text-gray-600">
							<p className="lead text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8">
								{t("intro")}
							</p>

							<div className="space-y-8">
								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											1
										</span>
										{t("section1.title")}
									</h3>
									<p className="mb-4">{t("section1.content")}</p>
									<ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
										<li>{t("section1.items.0")}</li>
										<li>{t("section1.items.1")}</li>
										<li>{t("section1.items.2")}</li>
									</ul>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											2
										</span>
										{t("section2.title")}
									</h3>
									<p className="mb-4">{t("section2.content")}</p>
									<ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
										<li>{t("section2.items.0")}</li>
										<li>{t("section2.items.1")}</li>
										<li>{t("section2.items.2")}</li>
										<li>{t("section2.items.3")}</li>
									</ul>
								</section>

								<section>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
										<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
											3
										</span>
										{t("section3.title")}
									</h3>
									<p>{t("section3.content")}</p>
								</section>
							</div>

							<div className="mt-12 pt-8 border-t border-gray-100 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-2xl">
								<h4 className="font-bold text-gray-900 mb-2">
									{t("contactBox.title")}
								</h4>
								<p className="text-sm">
									{t("contactBox.text")}{" "}
									<a
										href="/contact"
										className="text-blue-600 font-semibold hover:underline"
									>
										{t("contactBox.linkText")}
									</a>{" "}
									{t("contactBox.suffix")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}
