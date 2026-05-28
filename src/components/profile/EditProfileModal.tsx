import { useEffect, useRef, useState } from 'react';
import { Camera, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/api';
import { useForm } from '@/hooks/useForm';
import { editProfileSchema, type EditProfileFormData } from '@/lib/validations/auth';
import type { EditProfileModalProps } from '@/types';

const EditProfileModal = ({ open, onOpenChange }: EditProfileModalProps) => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EditProfileFormData>({
    schema: editProfileSchema,
    initialValues: { firstName: '', lastName: '' },
  });

  // sync form values when modal opens or user changes
  useEffect(() => {
    if (open && user) {
      form.setValue('firstName', user.first_name);
      form.setValue('lastName', user.last_name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user]);

  // track avatar file selection separately from user's stored avatar
  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : (user?.avatar_url ?? null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleSave = async () => {
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      await authApi.updateProfile({
        ['first_name']: data.firstName,
        ['last_name']: data.lastName,
      });
      await refreshUser();
      toast.success('Profile updated successfully');
      onOpenChange(false);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Failed to update profile.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setAvatarFile(null);
    onOpenChange(false);
  };

  const initials = `${form.values.firstName[0] ?? ''}${form.values.lastName[0] ?? ''}`.toUpperCase();

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleCancel(); }}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="flex items-center gap-2 text-sm sm:text-base">
            <User className="h-4 w-4 text-primary" />
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-5 sm:space-y-5">
          {/* avatar picker */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="relative">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-primary/20">
                {avatarPreview && <AvatarImage src={avatarPreview} alt="Avatar preview" />}
                <AvatarFallback className="text-lg sm:text-xl font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90"
                aria-label="Change avatar"
              >
                <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">Click the camera icon to change photo</p>
          </div>

          <Separator />

          {/* name fields */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                First Name
              </Label>
              <Input
                value={form.values.firstName}
                onChange={form.handleChange('firstName')}
                placeholder="First name"
                aria-invalid={!!form.getFieldError('firstName')}
              />
              {form.getFieldError('firstName') && (
                <p className="text-xs font-medium text-destructive">{form.getFieldError('firstName')}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Last Name
              </Label>
              <Input
                value={form.values.lastName}
                onChange={form.handleChange('lastName')}
                placeholder="Last name"
                aria-invalid={!!form.getFieldError('lastName')}
              />
              {form.getFieldError('lastName') && (
                <p className="text-xs font-medium text-destructive">{form.getFieldError('lastName')}</p>
              )}
            </div>
          </div>

          {/* email — read only */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              value={user?.email ?? ''}
              readOnly
              disabled
              className="opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
          </div>
        </div>

        <Separator />

        <DialogFooter className="px-4 py-3 gap-2 sm:px-6 sm:py-4 grid grid-cols-2">
          <Button variant="outline" onClick={handleCancel} disabled={loading} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 sm:flex-none"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
