import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";

/**
 * Footer component with navigation links and social media icons
 */
function Footer() {
	// Route mapping for Next.js
	const getRouteByName = (name: string): Route => {
		const routes: Record<string, Route> = {
			about: "/about" as Route,
			contact: "/contact" as Route,
			blog: "/blog" as Route,
		};
		return routes[name] || ("/" as Route);
	};

	return (
		<div>
			<div>
				<section className="py-12 md:pt-24">
					<div className="container px-4 mx-auto">
						{/* <div className="max-w-5xl mx-auto">
							<div className="flex flex-wrap -mx-4 -mb-8">
								<div className="w-full xs:w-1/2 md:w-1/4 px-4 mb-8">
									<h5 className="text-xl font-semibold mb-6">Product</h5>
									<ul>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Features
											</a>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Solutions
											</a>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Pricing
											</a>
										</li>
										<li>
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Tutorials
											</a>
										</li>
									</ul>
								</div>
								<div className="w-full xs:w-1/2 md:w-1/4 px-4 mb-8">
									<h5 className="text-xl font-semibold mb-6">Company</h5>
									<ul>
										<li className="mb-6">
											<Link
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href={getRouteByName("about")}
											>
												About
											</Link>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Our Mission
											</a>
										</li>
										<li className="flex items-center mb-6">
											<a
												className="inline-block mr-2 text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												<span>Careers</span>
											</a>
											<span className="inline-flex h-6 px-2 items-center text-white bg-teal-600 rounded-full">
												<svg
													width="8"
													height="8"
													viewBox="0 0 8 8"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle cx="4" cy="4" r="3" fill="white"></circle>
												</svg>
												<span className="ml-1 text-xs text-gray-50">
													Hiring
												</span>
											</span>
										</li>
										<li>
											<Link
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href={getRouteByName("contact")}
											>
												Contact
											</Link>
										</li>
									</ul>
								</div>
								<div className="w-full xs:w-1/2 md:w-1/4 px-4 mb-8">
									<h5 className="text-xl font-semibold mb-6">Resources</h5>
									<ul>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Press
											</a>
										</li>
										<li className="mb-6">
											<Link
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href={getRouteByName("blog")}
											>
												Blog
											</Link>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Help Center
											</a>
										</li>
										<li>
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Support
											</a>
										</li>
									</ul>
								</div>
								<div className="w-full xs:w-1/2 md:w-1/4 px-4 mb-8">
									<h5 className="text-xl font-semibold mb-6">Legal</h5>
									<ul>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Terms of Use
											</a>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Privacy Policy
											</a>
										</li>
										<li className="mb-6">
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Legal Notice
											</a>
										</li>
										<li>
											<a
												className="inline-block text-lg text-gray-500 hover:text-gray-900"
												href="#"
											>
												Cookie Settings
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div> */}
						<div className="mt-32 pt-12 border-t border-gray-200">
							<div className="flex flex-wrap items-center -mx-4">
								<div className="w-full lg:w-1/3 px-4">
									<Image
										src="/images/editin-logo.png"
										alt="Frequencii logo"
										width={150}
										height={40}
									/>
								</div>
								<div className="w-full lg:w-1/3 px-4">
									<p className="text-gray-500">
										Made by{" "}
										<a href="https://www.editifoto.site">Editin Ai Studio</a>.
										All rights reserved.
									</p>
								</div>
								<div className="w-full lg:w-1/3 px-4">
									<div className="flex items-center justify-end space-x-6">
										<Link
											href="/privacy-policy"
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											Privacy Policy
										</Link>
										<Link
											href="/terms-of-service"
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											Terms of Service
										</Link>
										<Link
											href="/contact"
											className="text-gray-500 hover:text-gray-900 text-sm font-medium transition duration-200"
										>
											Contact
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
