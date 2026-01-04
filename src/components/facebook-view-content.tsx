"use client";

import { useEffect } from "react";

const FacebookViewContent = () => {
	useEffect(() => {
		let attempts = 0;
		const maxAttempts = 10;

		const trackEvent = () => {
			if (typeof window !== "undefined" && window.fbq) {
				window.fbq("track", "ViewContent", {
					content_name: "Editin Foto AI Studio",
					value: 95000,
					currency: "IDR",
				});
			} else if (attempts < maxAttempts) {
				attempts++;
				setTimeout(trackEvent, 500); // Retry every 500ms
			}
		};

		trackEvent();
	}, []);

	return null;
};

export default FacebookViewContent;
