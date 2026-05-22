import { Eye, Sparkles, Wrench, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { UsageItem } from '@/types';

const usageItems: UsageItem[] = [
  {
    icon: Sparkles,
    title: 'Insight Personalization',
    description:
      'Deliver relevant financial analysis based on your spending habits to help you save more effectively.',
  },
  {
    icon: Wrench,
    title: 'Service Improvement',
    description:
      'Analyze app technical performance to detect bugs and continuously improve the user interface.',
  },
  {
    icon: Bell,
    title: 'User Communication',
    description:
      'Send billing notifications, monthly reports, and important security updates directly to you.',
  },
];

const PrivacyDataUsage = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Section heading */}
        <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-md bg-secondary/10">
          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
        </div>
        <div>
          <h2 className="font-manrope text-xl sm:text-2xl font-semibold text-primary">How We Use Your Data</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground mb-4 sm:mb-6">
            We process your data based on operational needs and application feature development:
          </p>

          {/* Usage items */}
          <div className="space-y-1 sm:space-y-2">
            {usageItems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
                <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base font-bold text-foreground">{title}</p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyDataUsage;