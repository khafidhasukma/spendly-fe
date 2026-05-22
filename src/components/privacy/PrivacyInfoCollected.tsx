import { Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { InfoCategory } from '@/types';

const categories: InfoCategory[] = [
  {
    title: 'Profile Information',
    items: ['Full name and email address.', 'Profile photo (optional).'],
  },
  {
    title: 'Financial Data',
    items: ['Manual transaction records.', 'Bank sync data (if enabled).'],
  },
  {
    title: 'Technical Information',
    items: ['IP address and device model.', 'Operating system and app version.'],
  },
  {
    title: 'Scan Data',
    items: [
      'Receipt photos for data extraction.',
      'Image metadata (date / time).',
    ],
  },
];

const PrivacyInfoCollected = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Section heading */}
        <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
        <div className="w-full">
          <h2 className="font-manrope text-xl sm:text-2xl font-semibold text-primary">Information We Collect</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
            We collect information to provide better services to all our users.
          </p>

          {/* sub-cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mt-4 sm:mt-6">
            {categories.map(({ title, items }) => (
              <div key={title} className="rounded-lg border border-border bg-muted/40 p-3 sm:p-4">
                <p className="mb-1 text-xs font-semibold text-primary">{title}</p>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyInfoCollected;