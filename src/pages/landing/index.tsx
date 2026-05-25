import {
  HeroSection,
  PainPointSection,
  FeaturesSection,
  ComparisonSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '@/components/landing';
import { AdBanner } from '@/components/ads';
import { usePageTitle } from '@/hooks';

const LandingPage = () => {
  usePageTitle('Home');
  return (
    <>
      <HeroSection />
      <PainPointSection />
      <FeaturesSection />

      {/* Ad placement: between features and comparison */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />

      {/* Ad placement: before CTA */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6">
        <AdBanner slot="1234567891" format="horizontal" />
      </div>

      <CTASection />
    </>
  );
};

export default LandingPage;
