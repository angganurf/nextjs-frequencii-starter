import { useTranslations } from "next-intl";

/**
 * PlaceholderContent component
 * Displays a message prompting users to download the full template
 * Used on non-homepage routes in the starter template
 */
const PlaceholderContent: React.FC = () => {
	const t = useTranslations("About");

	return (
		<div className="container mx-auto px-4 my-20">
			<p className="py-4 text-center bg-blue-600 text-gray-900 rounded-lg">
				{t("placeholderText")}{" "}
				<a
					className="underline"
					href="https://www.pixelrocket.store/free-templates/nextjs-templates/frequencii-tailwind-nextjs-website-template"
				>
					{t("placeholderLink")}
				</a>
			</p>
		</div>
	);
};

export default PlaceholderContent;
