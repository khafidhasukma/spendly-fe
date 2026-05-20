import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/ui/page-header';

const TncHeader = () => {
  return (
    <div className="space-y-4">
      <Badge variant="secondary-surface" className="text-xs">
        Last updated May 24, 2024
      </Badge>
      <PageHeader
        title="Terms and Conditions"
        description="Please read these terms and conditions carefully before using Spendly services. By accessing our platform, you agree to be bound by the following operational rules."
      />
    </div>
  );
};

export default TncHeader;