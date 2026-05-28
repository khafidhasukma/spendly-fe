import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, LayoutDashboard } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Features', href: '/#features', isRoute: false },
  { label: 'Testimonials', href: '/#testimonials', isRoute: false },
  { label: 'Contact', href: '/contact-us', isRoute: true },
];

const PublicNavbar = () => {
  const { dark, toggleDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleNavClick = (link: (typeof navLinks)[number]) => {
    setMobileOpen(false);
    if (link.href === '/' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="relative mx-auto flex h-14 sm:h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link to="/" className="shrink-0">
          <img src="/assets/logos/logo.svg" alt="Spendly" className="h-8 sm:h-9" />
        </Link>

        {/* desktop nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex-1 md:hidden" />

        {/* right actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleDark}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-primary/90"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="hidden sm:inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-t border-border bg-background/95 backdrop-blur-lg shadow-md md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link)}
                  className="rounded-full px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link)}
                  className="rounded-full px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              )
            )}

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-on-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-on-primary"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
