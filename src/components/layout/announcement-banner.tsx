"use client";
import React from "react";
import { useTranslations } from "next-intl";

/**
 * Announcement banner component
 */
const AnnouncementBanner: React.FC = () => {
	const t = useTranslations("Announcement");
	return (
		<div>
			<p className="mb-2 py-4 text-center bg-[#1a73e8] text-white">
				{t("text")}{" "}
				<a href="https://editinfoto.site" className="underline">
					{t("linkText")}
				</a>
			</p>
		</div>
	);
};

export default AnnouncementBanner;
