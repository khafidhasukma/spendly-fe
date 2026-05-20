import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/ui/page-header';

const PrivacyHeader = () => {
  return (
    <div className="space-y-4">
      <Badge variant="secondary-surface" className="text-xs">
        Last updated May 24, 2024
      </Badge>
      <PageHeader
        title="Privacy Policy"
        description="Your privacy is our top priority. This policy explains how we collect, use, and protect your personal information when you use Spendly."
      />
    </div>
  );
};

export default PrivacyHeader;
