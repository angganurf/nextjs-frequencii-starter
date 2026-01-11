import PageContainer from "@/components/layout/page-container";
import HeroSection from "@/features/home/components/hero-section";
import dynamic from "next/dynamic";
import FacebookViewContent from "@/components/facebook-view-content";

const BenefitsSection = dynamic(
	() => import("@/features/home/components/benefits-section"),
	{ ssr: true }
);
const HowItWorksSection = dynamic(
	() => import("@/features/home/components/how-it-works-section"),
	{ ssr: true }
);
const AllFeaturesSection = dynamic(
	() => import("@/features/home/components/all-features-section"),
	{ ssr: true }
);
const TestimonialsSection = dynamic(
	() => import("@/features/home/components/testimonials-section"),
	{ ssr: true }
);
const PromoSection = dynamic(
	() => import("@/features/home/components/promo-section"),
	{ ssr: true }
);
const GuaranteeSection = dynamic(
	() => import("@/features/home/components/guarantee-section"),
	{ ssr: true }
);
const FAQSection = dynamic(
	() => import("@/features/home/components/faq-section"),
	{ ssr: true }
);
const ComparisonSection = dynamic(
	() => import("@/features/home/components/comparison-section"),
	{ ssr: true }
);
const PriceSection = dynamic(
	() => import("@/features/home/components/price-sections"),
	{ ssr: true }
);

/**
 * Homepage component
 * Landing page featuring hero section, features, testimonials, and CTA
 */
export default function HomePage() {
	const seoData = {
		description:
			"Frequencii helps marketing teams easily store, organize, and access valuable assets from anywhere. Streamline your marketing workflow today.",
		keywords: [
			"marketing assets",
			"asset management",
			"marketing tools",
			"digital assets",
			"marketing workflow",
		],
	};

	return (
		<PageContainer
			title="Editin foto - Tools Editin Foto Ai Professional."
			seo={seoData}
		>
			{/* Hero section with header */}
			<FacebookViewContent />
			<section className="relative pb-24">
				<HeroSection />
			</section>

			{/* Feature sections */}
			{/* <FeatureHighlightSection /> */}
			{/* <FeaturesGridSection /> */}
			<BenefitsSection />
			<HowItWorksSection />
			<AllFeaturesSection />
			<PriceSection />
			<ComparisonSection />
			<TestimonialsSection />
			<PromoSection />
			<GuaranteeSection />
			<FAQSection />
			{/* <CTASection /> */}
		</PageContainer>
	);
}
