import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  isPremium?: boolean;
  onEditProfile?: () => void;
}

export default function ProfileHeader({
  name = 'Alex Graham',
  email = 'alex.graham@spendly.io',
  avatarUrl = 'https://i.pravatar.cc/150?img=3',
  isPremium = true,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Avatar + info */}
        <div className="flex items-center gap-8">
          <div className="relative shrink-0">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-32 lg:w-32 ring-4 ring-primary/20">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {/* Camera overlay button */}
            <button
              className="absolute bottom-0 right-0 flex h-6 w-6 lg:w-8 lg:h-8 border border-white/80 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90"
              aria-label="Change photo"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>

          <div>
            <h2 className="text-lg font-manrope font-medium text-foreground sm:text-xl mb-1.5">{name}</h2>
            <p className="text-base text-muted-foreground mb-6">{email}</p>
            {isPremium && (
              <Badge className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                Premium User
              </Badge>
            )}
          </div>
        </div>

        {/* Edit button */}
        <Button
          onClick={onEditProfile}
          className="w-full bg-primary hover:bg-primary/90 sm:w-auto text-base py-2.5 h-auto px-10 cursor-pointer"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
