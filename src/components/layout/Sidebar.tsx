import { useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  BrainCircuit,
  History,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'Scan', icon: ScanLine },
  { to: '/ai-analysis', label: 'Analysis', icon: BrainCircuit },
  { to: '/history', label: 'History', icon: History },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose: () => void;
}

const NavItem = ({
  to,
  label,
  icon: Icon,
  collapsed,
  onClose,
}: {
  to: string;
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
  onClose: () => void;
}) => {
  const isHome = to === '/';
  const matchExact = useMatch({ path: '/', end: true });
  const matchPath = useMatch(to);
  const isActive = isHome ? !!matchExact : !!matchPath;

  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            end={isHome}
            onClick={onClose}
            className={cn(
              'flex flex-row items-center rounded-md border-r-3 transition-colors',
              collapsed
                ? 'h-10 w-10 justify-center p-2.5'
                : 'w-full gap-3 px-3 py-2.5 text-sm font-medium',
              isActive
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" sideOffset={12}>
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  );
};

const Sidebar = ({ onClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-card shadow-sm transition-all duration-300 relative',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'relative flex items-center mt-5 mb-2 transition-all duration-300',
          collapsed ? 'justify-center px-2' : 'px-5',
        )}
      >
        {collapsed ? (
          <img src="/assets/logos/logo-small.svg" alt="Spendly" className="h-8 w-8" />
        ) : (
          <img src="/assets/logos/logo.svg" alt="Spendly" className="h-14 mx-auto" />
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute right-0 top-1/2 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md text-muted-foreground transition-colors hover:bg-primary hover:text-white hover:border-primary z-40"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Nav */}
      <TooltipProvider delayDuration={100}>
        <nav className="flex-1 overflow-y-auto mt-8">
          <ul className={cn('space-y-1', collapsed ? 'px-2' : 'px-3')}>
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                collapsed={collapsed}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;