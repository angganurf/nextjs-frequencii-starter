import PageContainer from '@/components/layout/page-container';
import HeroSection from '@/features/home/components/hero-section';
import FeatureHighlightSection from '@/features/home/components/feature-highlight-section';
import FeaturesGridSection from '@/features/home/components/features-grid-section';
import HowItWorksSection from '@/features/home/components/how-it-works-section';
import TestimonialsSection from '@/features/home/components/testimonials-section';
import CTASection from '@/components/ui/cta-section';

/**
 * Homepage component
 * Landing page featuring hero section, features, testimonials, and CTA
 */
export default function HomePage() {
  const seoData = {
    description: 'Frequencii helps marketing teams easily store, organize, and access valuable assets from anywhere. Streamline your marketing workflow today.',
    keywords: ['marketing assets', 'asset management', 'marketing tools', 'digital assets', 'marketing workflow']
  };

  return (
    <PageContainer
      title="Frequencii - Marketing Asset Management at Your Fingertips"
      seo={seoData}
    >
      {/* Hero section with header */}
      <section className="relative pb-24">
        <HeroSection />
      </section>

      {/* Feature sections */}
      <FeatureHighlightSection />
      <FeaturesGridSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </PageContainer>
  );
}