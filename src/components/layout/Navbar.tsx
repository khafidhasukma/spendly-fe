import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import type { NavbarProps } from '@/types';

const Navbar = ({ title = 'Dashboard' }: NavbarProps) => {
  const { user } = useAuth();

  const fullName = user ? `${user.first_name} ${user.last_name}` : '';
  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : '?';

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur supports-backdrop-filter-bg-card/80 dark:border-border">
      <div className="mx-auto flex h-14 w-full items-center justify-between gap-3 px-3 sm:h-16 sm:px-5 lg:h-20 lg:px-12">
        <div className="flex min-w-0 flex-1 items-center">
          <img
            src="/assets/logos/logo.svg"
            alt=""
            className="h-8 w-auto object-contain lg:hidden"
            width={0}
            height={0}
          />
          <h1 className="hidden truncate text-xl font-semibold text-primary sm:text-2xl lg:block">{title}</h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Avatar className="size-9 sm:size-10">
            {user?.avatar_url && (
              <AvatarImage src={user.avatar_url} alt={fullName} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-30 truncate text-sm font-medium text-foreground sm:inline-block sm:max-w-none sm:text-base">
            {fullName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
