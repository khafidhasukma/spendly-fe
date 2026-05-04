import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  BrainCircuit,
  History,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  scan?: boolean;
}

const navItems: NavItem[] = [
  { to: '/',           label: 'Home',     icon: LayoutDashboard },
  { to: '/ai-analysis', label: 'Analysis', icon: BrainCircuit    },
  { to: '/scan',       label: 'Scan',     icon: ScanLine, scan: true },
  { to: '/history',    label: 'History',  icon: History         },
  { to: '/profile',    label: 'Profile',  icon: UserCircle      },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 flex lg:hidden h-16 items-stretch bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      {navItems.map(({ to, label, icon: Icon, scan }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className="flex flex-1 flex-col items-center justify-end pb-2.5 gap-0.5 transition-colors"
        >
          {({ isActive }) =>
            scan ? (
              <>
                <span className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary shadow-lg shadow-secondary/40">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {label}
                </span>
              </>
            ) : (
              <>
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    'text-[9px] font-semibold uppercase tracking-wide',
                    isActive ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </>
            )
          }
        </NavLink>
      ))}
    </nav>
  );
}
