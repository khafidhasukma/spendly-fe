import {
  PrivacyHeader,
  PrivacyIntro,
  PrivacyInfoCollected,
  PrivacyDataUsage,
  PrivacyDataSecurity,
  PrivacyUserRights,
  PrivacyCTA,
} from '@/components/privacy';
import { AdBanner } from '@/components/ads';
import { usePageTitle } from '@/hooks';

const PrivacyPolicyPage = () => {
  usePageTitle('Privacy Policy');
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 sm:py-14 lg:py-16 space-y-6 sm:space-y-8 md:space-y-10">
      <PrivacyHeader />

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        <PrivacyIntro />
        <PrivacyInfoCollected />
        <PrivacyDataUsage />

        {/* Ad placement: between content sections */}
        <AdBanner slot="1234567895" format="horizontal" className="py-2" />

        <PrivacyDataSecurity />
        <PrivacyUserRights />
        <PrivacyCTA />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;