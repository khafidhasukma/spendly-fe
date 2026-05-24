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
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 sm:py-14 lg:py-16 space-y-6 sm:space-y-8 md:space-y-10">
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