"use client";

import { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/language-switcher";

/**
 * Main navigation header component
 * Simplified to only show centered logo and be sticky
 */
const Header = memo(() => {
	const t = useTranslations("Navigation");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header role="banner" className="sticky top-0 z-50">
			<nav
				className="relative bg-white/80 backdrop-blur-sm shadow-[0_5px_10px_-6px_rgba(0,0,0,0.1)]"
				role="navigation"
				aria-label="Main navigation"
			>
				<div className="container mx-auto px-4">
					<div className="relative flex h-16 items-center justify-center">
						{/* Language Switcher - Absolute Left */}
						<div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
							<LanguageSwitcher />
						</div>

						{/* Logo - Centered */}
						<Link
							className="inline-block relative z-0"
							href="/"
							aria-label="Frequencii - Home"
						>
							<Image
								className="h-10 w-auto"
								src="/images/editin-logo.png"
								alt="Frequencii logo"
								width={150}
								height={40}
								priority
							/>
						</Link>

						{/* Burger Menu Button - Absolute Right */}
						<div className="absolute right-0 top-1/2 -translate-y-1/2 duration-300 z-10">
							<button
								onClick={toggleMenu}
								className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer duration-300 transition-all"
								aria-label="Toggle menu"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									{isMenuOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Dropdown Menu */}
				{isMenuOpen && (
					<div className="absolute top-16  w-full bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col items-center space-y-0  ">
						{/* Mobile view usually stacks, but user asked for just a menu on top right. 
                            Let's make it a standard dropdown list. */}
						<Link
							href="/"
							className="text-gray-600 hover:text-blue-600 font-medium py-2 px-4 block w-full text-center"
							onClick={() => setIsMenuOpen(false)}
						>
							{t("home")}
						</Link>
						<Link
							href="/privacy-policy"
							className="text-gray-600 hover:text-blue-600 font-medium py-2 px-4 block w-full text-center"
							onClick={() => setIsMenuOpen(false)}
						>
							{t("privacyPolicy")}
						</Link>
						<Link
							href="/terms-of-service"
							className="text-gray-600 hover:text-blue-600 font-medium py-2 px-4 block w-full text-center"
							onClick={() => setIsMenuOpen(false)}
						>
							{t("termsOfService")}
						</Link>
						<Link
							href="/contact"
							className="text-gray-600 hover:text-blue-600 font-medium py-2 px-4 block w-full text-center"
							onClick={() => setIsMenuOpen(false)}
						>
							{t("contact")}
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
});

Header.displayName = "Header";

export default Header;
