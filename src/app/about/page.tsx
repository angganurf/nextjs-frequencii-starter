import PageContainer from "@/components/layout/page-container";
import PlaceholderContent from "@/components/ui/placeholder-content";
import CTASection from "@/components/ui/cta-section";
import { useTranslations } from "next-intl";

export default function UaboutPage() {
	const t = useTranslations("About");

	return (
		<PageContainer title={t("pageTitle")}>
			<PlaceholderContent />
			<CTASection />
		</PageContainer>
	);
}
