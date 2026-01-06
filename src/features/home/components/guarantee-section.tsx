import Link from "next/link";
import { useTranslations } from "next-intl";

const GuaranteeSection: React.FC = () => {
	const t = useTranslations("Guarantee");

	return (
		<section className="py-12 bg-gray-900">
			<div className="container px-4 mx-auto">
				<div className="max-w-3xl mx-auto text-center">
					{/* Guarantee Badge */}
					<div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
						<span className="text-4xl">🛡️</span>
					</div>

					{/* Guarantee Title */}
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
						{t("title")}
					</h3>

					{/* Guarantee Description */}
					<p className="text-lg text-gray-300 mb-8">{t("description")}</p>

					{/* Divider */}
					<div className="w-24 h-px bg-gray-700 mx-auto mb-6"></div>

					{/* Terms notice */}
					<p className="text-sm text-gray-500">
						{t("termsNotice")}{" "}
						<Link
							href="/terms-of-service"
							className="text-blue-400 hover:text-blue-300 underline transition-colors"
						>
							{t("termsLink")}
						</Link>
						.
					</p>
				</div>
			</div>
		</section>
	);
};

export default GuaranteeSection;
