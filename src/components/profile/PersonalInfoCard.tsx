import { UserCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PersonalInfoCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const PersonalInfoCard = ({
  firstName = 'Alex',
  lastName = 'Graham',
  email = 'alex.graham@spendly.io',
}: PersonalInfoCardProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Card header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <UserCircle className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground font-manrope">Personal Information</h3>
      </div>

      <div className="space-y-6">
        {/* First + Last name row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
}

export default PersonalInfoCard;