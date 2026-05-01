import { Menu } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
  title?: string;
}

export default function Navbar({ onMenuToggle, title = 'Dashboard' }: NavbarProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm lg:px-6">
      {/* Hamburger – visible on mobile only */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
    </header>
  );
}
