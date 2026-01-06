"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FAQItem {
	question: string;
	answer: string;
}

const FAQSection: React.FC = () => {
	const t = useTranslations("FAQ");
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const faqData: FAQItem[] = [
		{
			question: t("q1"),
			answer: t("a1"),
		},
		{
			question: t("q2"),
			answer: t("a2"),
		},
		{
			question: t("q3"),
			answer: t("a3"),
		},
		{
			question: t("q4"),
			answer: t("a4"),
		},
		{
			question: t("q5"),
			answer: t("a5"),
		},
		{
			question: t("q6"),
			answer: t("a6"),
		},
	];

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="mt-16 bg-white">
			<div className="container px-4 mx-auto">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<span className="inline-flex items-center h-6 mb-4 px-3 text-xs uppercase font-semibold text-blue-600 bg-blue-100 rounded-full">
							{t("badge")}
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("title")}
						</h2>
						<p className="text-gray-600">{t("subtitle")}</p>
					</div>

					{/* FAQ Items */}
					<div className="space-y-4 ">
						{faqData.map((faq, index) => (
							<div
								key={index}
								className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300"
							>
								<button
									onClick={() => toggleFAQ(index)}
									className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
								>
									<span className="font-semibold text-gray-900 pr-4">
										{faq.question}
									</span>
									<span
										className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 ${
											openIndex === index ? "rotate-180" : ""
										}`}
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</span>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ${
										openIndex === index ? "max-h-96" : "max-h-0"
									}`}
								>
									<div className="px-6 pb-5 text-gray-600 leading-relaxed">
										{faq.answer}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
