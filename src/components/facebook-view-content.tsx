"use client";

import { useEffect } from "react";

const FacebookViewContent = () => {
	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		let scrollCleanup: (() => void) | null = null;

		const initTracking = async () => {
			const { trackViewContent } = await import("@/lib/fb-events");

			// 1. Scroll Detection
			const handleScroll = () => {
				if (window.scrollY > 100) {
					trackViewContent();
					// Remove listener once triggered
					window.removeEventListener("scroll", handleScroll);
					scrollCleanup = null;
				}
			};

			window.addEventListener("scroll", handleScroll);
			scrollCleanup = () => window.removeEventListener("scroll", handleScroll);

			// Check immediately in case page loaded scrolled down
			if (window.scrollY > 100) {
				trackViewContent();
				window.removeEventListener("scroll", handleScroll);
				scrollCleanup = null;
			}

			// 2. Section Visibility (Backup/Precise tracking)
			const section = document.getElementById("payment-section");
			if (section) {
				observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								trackViewContent();
								observer?.disconnect();
								observer = null;
							}
						});
					},
					{ threshold: 0.5 }
				);
				observer.observe(section);
			}
		};

		// Slight delay to ensure DOM is ready and hydration complete
		const timeoutId = setTimeout(initTracking, 1000);

		return () => {
			clearTimeout(timeoutId);
			if (scrollCleanup) scrollCleanup();
			if (observer) observer.disconnect();
		};
	}, []);

	return null;
};

export default FacebookViewContent;
