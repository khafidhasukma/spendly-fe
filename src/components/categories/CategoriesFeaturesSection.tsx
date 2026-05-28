import { BarChart2, Building2, Sparkles } from 'lucide-react';

const features = [
  {
    id: 'visualization',
    title: 'Accurate Visualization',
    description:
      'Categories help Spendly map your spending habits into beautiful, insightful charts.',
    icon: BarChart2,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 'budget-control',
    title: 'Budget Control',
    description:
      'Set spending limits for each category to keep your finances healthy.',
    icon: Building2,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    id: 'smart-tips',
    title: 'Smart Tips',
    description:
      'Get savings recommendations based on your highest spending categories.',
    icon: Sparkles,
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
  },
];

const CategoriesFeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
      {features.map(({ id, title, description, icon: Icon, iconBg, iconColor }) => (
        <div key={id} className="rounded-xl border border-border bg-card p-4 sm:p-5 md:p-6 shadow-sm">
          <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-[0.75rem] ${iconBg}`}>
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
          </div>
          <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-foreground">{title}</h4>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFeaturesSection;
