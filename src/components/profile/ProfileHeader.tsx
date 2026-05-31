import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { resolveAvatarUrl } from '@/utils';
import type { ProfileHeaderProps } from '@/types';

const ProfileHeaderSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex max-sm:flex-col items-center gap-4 sm:gap-6 md:gap-8">
        <div className="size-20 animate-pulse rounded-full bg-muted sm:size-24 md:size-28 lg:size-32" />
        <div className="space-y-2 max-sm:items-center max-sm:flex max-sm:flex-col">
          <div className="h-5 w-40 animate-pulse rounded bg-muted sm:h-6 sm:w-48" />
          <div className="h-4 w-56 animate-pulse rounded bg-muted sm:h-5 sm:w-64" />
        </div>
      </div>
      <div className="h-10 w-full animate-pulse rounded bg-muted sm:w-32" />
    </div>
  </div>
);

const ProfileHeader = ({ onEditProfile }: ProfileHeaderProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return <ProfileHeaderSkeleton />;

  const fullName = `${user.first_name} ${user.last_name}`;
  const initials = `${user.first_name[0] ?? ''}${user.last_name[0] ?? ''}`.toUpperCase();
  const avatarSrc = resolveAvatarUrl(user.avatar_url);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-sm:flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="relative shrink-0">
            <Avatar className="size-20 sm:size-24 md:size-28 lg:h-32 lg:w-32 ring-4 ring-primary/20">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={fullName} />}
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
              {user.email}
            </p>
          </div>
        </div>

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
