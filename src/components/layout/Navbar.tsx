import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title = 'Dashboard' }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 dark:border-border">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:h-16 sm:px-5 lg:h-20 lg:px-12">
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
            <AvatarImage src="https://github.com/shadcn.png" alt="" className="grayscale" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[7.5rem] truncate text-sm font-medium text-foreground sm:inline-block sm:max-w-none sm:text-base">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
