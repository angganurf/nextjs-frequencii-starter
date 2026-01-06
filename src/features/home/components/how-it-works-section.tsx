import { useTranslations } from "next-intl";

const HowItWorksSection: React.FC = () => {
	const t = useTranslations("HowItWorks");
	return (
		<>
			<section className="py-12 text-center">
				<div className="container px-4 mx-auto">
					<div className="max-w-full mx-auto">
						<div className="max-w-full mb-24">
							<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{t("badge")}
							</span>
							<h1 className="font-heading text-centertracking-tight text-4xl sm:text-5xl font-bold mb-4">
								{t("feature1Title")}
							</h1>
							<p className="text-lg text-gray-500">{t("feature1Desc")}</p>
						</div>
						<div>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/gabungin-foto-1.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
							<img
								className="relative block mx-auto px-12 lg:px-8 mb-12"
								src="/images/down.gif"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
								width={200}
								height={200}
							/>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/gabungin-foto-2.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
						</div>
					</div>

					<div className="max-w-full mx-auto mt-16">
						<div className="max-w-full mb-24">
							<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{t("badge")}
							</span>
							<h1 className="font-heading text-centertracking-tight text-4xl sm:text-5xl font-bold mb-4">
								{t("feature2Title")}
							</h1>
							<p className="text-lg text-gray-500">{t("feature2Desc")}</p>
						</div>
						<div>
							<img
								className="relative block mx-auto lg:px-8 -mt-16"
								src="/images/foto-produk-1.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
							<img
								className="relative block mx-auto px-12 lg:px-8 mb-12"
								src="/images/down.gif"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
								width={200}
								height={200}
							/>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/foto-produk-2.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
						</div>
					</div>

					<div className="max-w-full mx-auto mt-16">
						<div className="max-w-full mb-24">
							<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{t("badge")}
							</span>
							<h1 className="font-heading text-centertracking-tight text-4xl sm:text-5xl font-bold mb-4">
								{t("feature3Title")}
							</h1>
							<p className="text-lg text-gray-500">{t("feature3Desc")}</p>
						</div>
						<div>
							<img
								className="relative block mx-auto lg:px-8 -mt-16"
								src="/images/model-ai-1.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
							<img
								className="relative block mx-auto px-12 lg:px-8 mb-12"
								src="/images/down.gif"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
								width={200}
								height={200}
							/>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/model-ai-2.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
						</div>
					</div>

					<div className="max-w-full mx-auto mt-16">
						<div className="max-w-full mb-24">
							<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{t("badge")}
							</span>
							<h1 className="font-heading text-centertracking-tight text-4xl sm:text-5xl font-bold mb-4">
								{t("feature4Title")}
							</h1>
							<p className="text-lg text-gray-500">{t("feature4Desc")}</p>
						</div>
						<div>
							<img
								className="relative block mx-auto lg:px-8 -mt-16"
								src="/images/editin-foto-1.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
							<img
								className="relative block mx-auto px-12 lg:px-8 mb-12"
								src="/images/down.gif"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
								width={200}
								height={200}
							/>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/editin-foto-2.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
						</div>
					</div>

					<div className="max-w-full mx-auto mt-16">
						<div className="max-w-full mb-24">
							<span className="inline-flex items-center h-6 mb-4 px-2 text-xs uppercase font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{t("badge")}
							</span>
							<h1 className="font-heading text-centertracking-tight text-4xl sm:text-5xl font-bold mb-4">
								{t("feature5Title")}
							</h1>
							<p className="text-lg text-gray-500">{t("feature5Desc")}</p>
						</div>
						<div>
							<img
								className="relative block mx-auto lg:px-8 -mt-16"
								src="/images/enhance-foto-1.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
							<img
								className="relative block mx-auto px-12 lg:px-8 mb-12"
								src="/images/down.gif"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
								width={200}
								height={200}
							/>
							<img
								className="relative block mx-auto lg:px-8 -mt-16 "
								src="/images/enhance-foto-2.png"
								alt="Frequencii dashboard showing marketing asset organization and management interface"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HowItWorksSection;
