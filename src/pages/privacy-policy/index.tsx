import {
  PrivacyHeader,
  PrivacyIntro,
  PrivacyInfoCollected,
  PrivacyDataUsage,
  PrivacyDataSecurity,
  PrivacyUserRights,
  PrivacyCTA,
} from '@/components/privacy';

const PrivacyPolicyPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 container px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
      <PrivacyHeader />

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        <PrivacyIntro />
        <PrivacyInfoCollected />
        <PrivacyDataUsage />
        <PrivacyDataSecurity />
        <PrivacyUserRights />
        <PrivacyCTA />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;