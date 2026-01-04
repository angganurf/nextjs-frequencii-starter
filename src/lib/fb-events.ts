"use client";

let viewContentFired = false;

export const trackViewContent = () => {
	if (viewContentFired) return;

	if (typeof window !== "undefined" && window.fbq) {
		console.log("👀 Triggering ViewContent Event");
		window.fbq("track", "ViewContent", {
			content_name: "Editin Foto AI Studio",
			value: 95000,
			currency: "IDR",
		});
		viewContentFired = true;
	}
};

export const resetViewContent = () => {
	viewContentFired = false;
};
