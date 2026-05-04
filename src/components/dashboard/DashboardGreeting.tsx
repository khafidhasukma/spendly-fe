function getGreeting(): { text: string; } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good morning' };
  if (hour < 17) return { text: 'Good afternoon' };
  return { text: 'Good evening' };
}

export interface DashboardGreetingProps {
  name?: string;
}

export default function DashboardGreeting({ name = 'John Doe' }: DashboardGreetingProps) {
  const { text } = getGreeting();

  return (
    <div className="space-y-2">
      <h1 className="text-headline-lg font-bold text-primary font-manrope">
        {text}, {name}!
      </h1>
      <p className="text-xl text-muted-foreground">How's your pocket sound?</p>
    </div>
  );
}
