import { Mail, LifeBuoy, type LucideIcon } from 'lucide-react';

interface ContactChannel {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
}

const channels: ContactChannel[] = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Response within less than 2 business hours.',
    linkLabel: 'support@spendly.id',
    href: 'mailto:support@spendly.id',
  },
  {
    icon: LifeBuoy,
    title: 'Help Center',
    description: 'Find instant answers in our knowledge base.',
    linkLabel: 'Open FAQ →',
    href: '#faq',
  },
];

const ContactChannels = () => {
  return (
    <div className="space-y-6">
      {channels.map(({ icon: Icon, title, description, linkLabel, href }) => (
        <div
          key={title}
          className="flex items-start gap-4 rounded-xl bg-card p-6 shadow-sm border border-border transition-shadow hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground font-manrope">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            <a
              href={href}
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              {linkLabel}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactChannels;