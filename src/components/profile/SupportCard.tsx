import { ExternalLink, HelpCircle, LogOut, Moon, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

interface SupportItem {
  label: string;
  icon: typeof ExternalLink;
  href?: string;
}

const supportItems: SupportItem[] = [
  { label: 'Privacy Policy', icon: ExternalLink, href: '#' },
  { label: 'Terms of Service', icon: ExternalLink, href: '#' },
  { label: 'Contact Support', icon: HelpCircle, href: '#' },
];

interface SupportCardProps {
  onLogout?: () => void;
}

export default function SupportCard({ onLogout }: SupportCardProps) {
  const { dark, toggleDark } = useTheme();

  return (
    <div className="space-y-3">
      {/* Dark mode toggle */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">Appearance</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted dark:bg-muted/40">
              {dark ? (
                <Moon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Sun className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                {dark ? 'Dark theme active' : 'Light theme active'}
              </p>
            </div>
          </div>
          <Switch checked={dark} onCheckedChange={toggleDark} />
        </div>
      </div>

      {/* Support links */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">Support</h3>

        <ul className="space-y-1">
          {supportItems.map(({ label, icon: Icon, href }, index) => (
            <li key={label}>
              {index > 0 && <Separator className="my-1" />}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-1 py-2.5 text-sm text-foreground transition-colors hover:text-primary"
              >
                <span>{label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-error/30 bg-card p-4 text-sm font-semibold text-error shadow-sm transition-colors hover:bg-error/5 dark:hover:bg-error/10"
      >
        <LogOut className="h-4 w-4" />
        Logout Account
      </button>
    </div>
  );
}
