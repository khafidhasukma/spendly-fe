import { Eye, Sparkles, Wrench, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface UsageItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

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
      <CardContent className="p-6 flex items-start gap-4">
        {/* Section heading */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary/10">
          <Eye className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h2 className="font-manrope text-2xl font-semibold text-primary">How We Use Your Data</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground mb-6">
            We process your data based on operational needs and application feature development:
          </p>

          {/* Usage items */}
          <div className="space-y-2">
            {usageItems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4 p-4">
                <Icon className="h-5.5 w-5.5 text-primary" />
                <div>
                  <p className="text-base font-bold text-foreground">{title}</p>
                  <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PrivacyDataUsage;