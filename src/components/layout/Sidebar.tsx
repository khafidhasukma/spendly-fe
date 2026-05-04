import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  BrainCircuit,
  History,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'Scan', icon: ScanLine },
  { to: '/ai-analysis', label: 'Analysis', icon: BrainCircuit },
  { to: '/history', label: 'History', icon: History },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-white shadow transition-all duration-300 overflow-visible',
          'lg:relative',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
          collapsed && 'lg:w-16',
        )}
      >
        {/* Brand + collapse button */}
        <div
          className={cn(
            'relative flex items-center mt-5 mb-2 transition-all duration-300',
            collapsed ? 'justify-center px-3' : 'px-5',
          )}
        >
          {collapsed ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-white">S</span>
            </div>
          ) : (
            <img src="/assets/logos/logo.svg" alt="Spendly" className="h-14 mx-auto" />
          )}

          {/* Collapse button — floats on the right border, desktop only */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="absolute right-0 top-1/2 hidden lg:flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-md text-muted-foreground transition-colors hover:bg-primary hover:text-white hover:border-primary z-40"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto mt-8">
          <ul className="space-y-1 px-5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to} className="group relative">
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-md transition-colors text-lg font-medium border-r-3',
                      collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5',
                      isActive
                        ? 'bg-primary/10 text-primary border-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground border-transparent',
                    )
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </NavLink>

                {/* Tooltip — collapsed mode only */}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
