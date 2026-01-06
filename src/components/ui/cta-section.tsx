"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface CTASectionProps {
	badge?: string;
	title?: string;
	buttonText?: string;
	buttonUrl?: string;
	showArrow?: boolean;
	className?: string;
	backgroundImagePath?: string;
}

/**
 * Reusable Call-to-Action section component
 */
const CTASection: React.FC<CTASectionProps> = ({
	badge,
	title,
	buttonText,
	buttonUrl = "https://www.pixelrocket.store",
	showArrow = true,
	className = "",
	backgroundImagePath = "/images",
}) => {
	const t = useTranslations("About");

	// Default values falling back to keys if not provided props
	const finalBadge = badge || t("ctaBadge");
	const finalTitle = title || t("ctaTitle");
	const finalButtonText = buttonText || t("ctaButton");

	return (
		<section className={`py-12 md:py-24 ${className}`}>
			<div className="container px-4 mx-auto">
				<div className="relative pb-16 border-b border-blue-400 overflow-hidden">
					{/* Background Images */}
					<Image
						className="absolute bottom-0 left-1/2 md:-mb-2 lg:-mb-20 transform -translate-x-1/2"
						src={`${backgroundImagePath}/cta-line-green-bottom.png`}
						alt=""
						width={800}
						height={200}
						aria-hidden="true"
					/>
					<Image
						className="absolute bottom-0 left-1/2 -mb-5 sm:-mb-10 md:-mb-16 lg:-mb-28 transform -translate-x-1/2"
						src={`${backgroundImagePath}/cta-light-green-bottom.png`}
						alt=""
						width={800}
						height={300}
						aria-hidden="true"
					/>

					{/* Content */}
					<div className="relative max-w-sm md:max-w-xl mx-auto text-center">
						{finalBadge && (
							<span className="inline-flex items-center h-6 mb-4 px-2 text-sm font-medium text-yellowGreen-700 bg-blue-200 rounded-full">
								{finalBadge}
							</span>
						)}

						<h2 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-10">
							{finalTitle}
						</h2>

						<a
							className="group relative flex xs:inline-flex items-center justify-center px-5 h-12 font-bold text-sm text-white bg-gradient-to-br from-[#1a73e8] to-[#1765cc] rounded-lg transition-all duration-300 hover:from-[#1765cc] hover:to-[#1a73e8] focus:outline-none focus:ring-4 focus:ring-blue-500"
							href={buttonUrl}
							aria-label={`${finalButtonText} - Opens in new tab`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className={showArrow ? "mr-2" : ""}>{finalButtonText}</span>

							{showArrow && (
								<span
									className="transform group-hover:translate-x-1 transition duration-200"
									aria-hidden="true"
								>
									<svg
										width="17"
										height="16"
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.5 8H12.8333M12.8333 8L8.83334 4M12.8333 8L8.83334 12"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							)}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
