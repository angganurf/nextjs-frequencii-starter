"use client";

import { useEffect } from "react";

const FacebookViewContent = () => {
	useEffect(() => {
		const handleScroll = async () => {
			const { trackViewContent } = await import("@/lib/fb-events");
			const section = document.getElementById("payment-section");

			if (section) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								trackViewContent();
								observer.disconnect(); // Stop observing after triggered
							}
						});
					},
					{ threshold: 0.5 } // Trigger when 50% visible
				);
				observer.observe(section);
			}
		};

		// Slight delay to ensure DOM is ready
		setTimeout(handleScroll, 1000);
	}, []);

	return null;
};

export default FacebookViewContent;
