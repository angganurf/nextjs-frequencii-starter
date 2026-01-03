"use client";

import { useEffect } from "react";

const FacebookViewContent = () => {
	useEffect(() => {
		// @ts-ignore
		if (typeof window !== "undefined" && window.fbq) {
			// @ts-ignore
			window.fbq("track", "ViewContent", {
				content_name: "Editin Foto AI Studio",
				value: 95000,
				currency: "IDR",
			});
		}
	}, []);

	return null;
};

export default FacebookViewContent;
