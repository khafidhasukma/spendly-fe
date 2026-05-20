import type { DashboardGreetingProps } from '@/types';

const getGreeting = (): { text: string } => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good morning' };
  if (hour < 17) return { text: 'Good afternoon' };
  return { text: 'Good evening' };
};

export { type DashboardGreetingProps } from '@/types';

const DashboardGreeting = ({ name = 'John Doe' }: DashboardGreetingProps) => {
  const { text } = getGreeting();

  return (
    <div className="space-y-1 sm:space-y-1.5">
      <h1 className="text-2xl font-bold text-primary font-manrope md:text-3xl lg:text-4xl xl:text-headline-lg">
        {text}, {name}!
      </h1>
      <p className="text-sm text-muted-foreground sm:text-base xl:text-lg">
        How's your pocket sound?
      </p>
    </div>
  );
};

export default DashboardGreeting;
