"use client";

let viewContentFired = false;

export const trackViewContent = () => {
	if (viewContentFired) return;

	if (typeof window !== "undefined") {
		// Facebook
		if (window.fbq) {
			console.log("👀 Triggering ViewContent Event (FB)");
			window.fbq("track", "ViewContent", {
				content_name: "Editin Foto AI Studio",
				value: 95000,
				currency: "IDR",
			});
		}

		// TikTok
		// @ts-ignore
		if (window.ttq) {
			console.log("🎵 Triggering ViewContent Event (TikTok)");
			// @ts-ignore
			window.ttq.track("ViewContent", {
				content_name: "Editin Foto AI Studio",
				content_id: "EDITIN-FOTO-AI-STUDIO",
				content_type: "product",
				value: 95000,
				currency: "IDR",
			});
		}

		viewContentFired = true;
	}
};

export const resetViewContent = () => {
	viewContentFired = false;
};
