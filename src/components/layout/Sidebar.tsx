import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  BrainCircuit,
  History,
  UserCircle,
  Wallet,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan-struk', label: 'Scan Struk', icon: ScanLine },
  { to: '/analisis-ai', label: 'Analisis AI', icon: BrainCircuit },
  { to: '/riwayat', label: 'Riwayat', icon: History },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white shadow-xl transition-transform duration-300',
          'lg:static lg:translate-x-0 lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Wallet className="h-7 w-7 text-violet-600" />
          <span className="text-xl font-bold text-violet-600">Spendly</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-violet-100 text-violet-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ].join(' ')
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t p-4 text-xs text-gray-400">
          Spendly &copy; {new Date().getFullYear()}
        </div>
      </aside>
    </>
  );
}
