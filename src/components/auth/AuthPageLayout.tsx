import type { ReactNode } from 'react';
import AuthFormPanel from './AuthFormPanel';
import AuthHero from './AuthHero';

interface AuthPageLayoutProps {
  children: ReactNode;
  maxWidth?: string;
}

const AuthPageLayout = ({
  children,
}: AuthPageLayoutProps) => {
  return (
    <div className="grid lg:grid-cols-5 h-dvh overflow-hidden">
      <div className="col-span-3 flex items-center justify-center lg:max-w-2xl mx-auto overflow-y-auto">
        <AuthFormPanel>{children}</AuthFormPanel>
      </div>

      {/* hero panel */}
      <div className="hidden lg:block col-span-2">
        <AuthHero />
      </div>
    </div>
  );
};

export default AuthPageLayout;