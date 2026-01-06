import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { useTranslations } from "next-intl";

/**
 * Footer component with navigation links and social media icons
 */
function Footer() {
	const t = useTranslations("Footer");
	const tNav = useTranslations("Navigation");

	// Route mapping for Next.js
	const getRouteByName = (name: string): Route => {
		const routes: Record<string, Route> = {
			contact: "/contact" as Route,
			privacyPolicy: "/privacy-policy" as Route,
			termsOfService: "/terms-of-service" as Route,
		};
		return routes[name] || ("/" as Route);
	};

	return (
		<div>
			<div>
				<section className="bg-gray-50 pb-12">
					<div className="container px-4 mx-auto">
						{/* <div className="max-w-5xl mx-auto">
							<div className="flex flex-wrap -mx-4 -mb-8">
                                ... (This section was commented out in original file, keeping it commented out or removing it. It's largely boilerplate. I'll just remove it for cleaner code since it was already commented out.)
							</div>
						</div> */}
						<div className="mt-32 pt-12 border-t border-gray-200">
							<div className="flex flex-wrap items-center -mx-4">
								<div className="w-full px-4 flex justify-center mb-6 mb-0">
									<Image
										src="/images/editin-logo.png"
										alt="Editin Logo"
										width={150}
										height={40}
									/>
								</div>
								<div className="w-full px-4 text-center mb-6">
									<p className="text-gray-500">
										{t("madeBy")}{" "}
										<a href="https://www.editifoto.site">Editin Ai Studio</a>.
										{t("rightsReserved")}
									</p>
								</div>
								<div className="w-full px-4">
									<div className="flex items-center justify-center space-x-6">
										<Link
											href={getRouteByName("privacyPolicy")}
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											{t("privacyPolicy")}
										</Link>
										<Link
											href={getRouteByName("termsOfService")}
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											{t("termsOfService")}
										</Link>
										<Link
											href={getRouteByName("contact")}
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											{t("contact")}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Footer;
