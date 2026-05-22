import { UserCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { PersonalInfoCardProps } from '@/types';

const PersonalInfoCard = ({
  firstName = 'Alex',
  lastName = 'Graham',
  email = 'alex.graham@spendly.io',
}: PersonalInfoCardProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      {/* Card header */}
      <div className="mb-5 sm:mb-6 md:mb-8 flex items-center gap-3 sm:gap-4">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-primary/10">
          <UserCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground font-manrope">Personal Information</h3>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* First + Last name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              First Name
            </Label>
            <Input value={firstName} readOnly className="bg-muted/50 dark:bg-muted/20" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Last Name
            </Label>
            <Input value={lastName} readOnly className="bg-muted/50 dark:bg-muted/20" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Email Address
          </Label>
          <Input value={email} readOnly className="bg-muted/50 dark:bg-muted/20" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;