import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from '@/components/landing/PublicNavbar';
import PublicFooter from '@/components/landing/PublicFooter';

const PublicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <main
        key={pathname}
        className="flex-1 animate-fade-up"
        style={{ animationDuration: '0.35s' }}
      >
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
