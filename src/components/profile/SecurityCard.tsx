import { useState } from 'react';
import { ShieldCheck, KeyRound, Smartphone, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface SecurityCardProps {
  lastPasswordChange?: string;
  twoFactorEnabled?: boolean;
}

export default function SecurityCard({
  lastPasswordChange = '3 months ago',
  twoFactorEnabled: initialTwoFactor = true,
}: SecurityCardProps) {
  const [twoFactor, setTwoFactor] = useState(initialTwoFactor);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Card header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-error/10">
          <ShieldCheck className="h-5 w-5 text-error" />
        </div>
        <h3 className="text-base font-semibold text-foreground">Security</h3>
      </div>

      {/* Change password */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted dark:bg-muted/40">
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Change Password</p>
            <p className="text-xs text-muted-foreground">Last changed {lastPasswordChange}</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80">
          Update
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <Separator className="my-4" />

      {/* Two-factor authentication */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted dark:bg-muted/40">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
            <p className="text-xs text-muted-foreground">
              {twoFactor ? 'Enabled via Authenticator App' : 'Disabled'}
            </p>
          </div>
        </div>
        <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
      </div>
    </div>
  );
}
