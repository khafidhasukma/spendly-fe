import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { ProfileHeaderProps } from '@/types';

const ProfileHeader = ({ onEditProfile }: ProfileHeaderProps) => {
  const { user } = useAuth();

  const fullName = user ? `${user.first_name} ${user.last_name}` : '—';
  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : '?';

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* avatar + info */}
        <div className="flex max-sm:flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="relative shrink-0">
            <Avatar className="size-20 sm:size-24 md:size-28 lg:h-32 lg:w-32 ring-4 ring-primary/20">
              {user?.avatar_url && (
                <AvatarImage src={user.avatar_url} alt={fullName} />
              )}
              <AvatarFallback className="text-lg sm:text-xl font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="max-sm:text-center">
            <h2 className="text-base font-manrope font-medium text-foreground sm:text-lg md:text-xl mb-1 sm:mb-1.5">
              {fullName}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-6">
              {user?.email ?? '—'}
            </p>
          </div>
        </div>

        {/* edit button */}
        <Button
          onClick={onEditProfile}
          className="w-full bg-primary hover:bg-primary/90 sm:w-auto text-sm md:text-base py-2 sm:py-2.5 h-auto px-5 cursor-pointer"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
