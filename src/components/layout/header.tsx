"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Main navigation header component
 * Simplified to only show centered logo and be sticky
 */
const Header = memo(() => {
	return (
		<header role="banner" className="sticky top-0 z-50">
			<nav
				className="relative bg-white/80 backdrop-blur-md shadow-sm"
				role="navigation"
				aria-label="Main navigation"
			>
				<div className="container mx-auto px-4">
					<div className="relative flex h-16 items-center justify-center">
						{/* Logo */}
						<Link
							className="inline-block"
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
					</div>
				</div>
			</nav>
		</header>
	);
});

Header.displayName = "Header";

export default Header;
