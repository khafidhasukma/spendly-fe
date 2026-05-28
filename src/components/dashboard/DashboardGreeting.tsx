import { useAuth } from '@/contexts/AuthContext';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const DashboardGreeting = () => {
  const { user } = useAuth();
  const name = user ? user.first_name : '';

  return (
    <div className="space-y-1 sm:space-y-1.5">
      <h1 className="text-2xl font-bold text-primary font-manrope md:text-3xl lg:text-4xl xl:text-headline-lg">
        {getGreeting()}, {name}!
      </h1>
      <p className="text-sm text-muted-foreground sm:text-base xl:text-lg">
        How&apos;s your pocket sound?
      </p>
    </div>
  );
};

export default DashboardGreeting;
