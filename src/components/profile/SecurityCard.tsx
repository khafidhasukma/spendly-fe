import { ShieldCheck, KeyRound, ChevronRight } from 'lucide-react';
import type { SecurityCardProps } from '@/types';

const SecurityCard = ({
  lastPasswordChange = '3 months ago',
  onUpdatePassword,
}: SecurityCardProps) => {

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      {/* Card header */}
      <div className="mb-5 sm:mb-6 md:mb-8 flex items-center gap-3 sm:gap-4">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-error/10">
          <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-error" />
        </div>
        <h3 className="text-base sm:text-lg font-manrope font-semibold text-foreground">Security</h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Change password */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 bg-muted/50 dark:bg-muted/20 p-3 sm:p-4 md:p-4.5 rounded-lg">
          <div className="flex items-center gap-3 sm:gap-4">
            <KeyRound className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-sm sm:text-base font-semibold text-foreground">Change Password</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Last changed {lastPasswordChange}</p>
            </div>
          </div>
          <button
            onClick={onUpdatePassword}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            Update
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCard;