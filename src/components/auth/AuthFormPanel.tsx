import type { ReactNode } from 'react';

interface AuthFormPanelProps {
  children: ReactNode;
  maxWidth?: string;
}

export default function AuthFormPanel({
  children,
}: AuthFormPanelProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-background px-8 lg:px-18">
      <div className="w-full py-10">
        <img
          src="/assets/logos/logo.svg"
          alt="Spendly"
          className="h-10 w-auto mb-8"
        />
        {children}
      </div>
    </div>
  );
}
