import { Menu } from 'lucide-react';
import {  Avatar,
  AvatarFallback,
  AvatarImage, } from '@/components/ui/avatar';

interface NavbarProps {
  onMenuToggle: () => void;
  title?: string;
}

export default function Navbar({ onMenuToggle, title = 'Dashboard' }: NavbarProps) {
  return (
    <header className="flex h-20 items-center gap-4 bg-white px-4 shadow lg:px-12">
      {/* Hamburger – visible on mobile only */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex gap-4 items-center justify-between w-full">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <div className="flex gap-4 items-center">
          <Avatar className='size-10'>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block text-base font-medium text-foreground">John Doe</span>
        </div>
      </div>
    </header>
  );
}
