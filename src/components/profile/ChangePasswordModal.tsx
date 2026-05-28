import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PasswordInput from '@/components/forms/PasswordInput';
import { authApi } from '@/api';
import { useForm } from '@/hooks/useForm';
import { changePasswordSchema, type ChangePasswordFormData } from '@/lib/validations/auth';
import type { ChangePasswordModalProps } from '@/types';

const ChangePasswordModal = ({ open, onOpenChange }: ChangePasswordModalProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    schema: changePasswordSchema,
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const handleSave = async () => {
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      await authApi.updatePassword({
        ['current_password']: data.currentPassword,
        ['new_password']: data.newPassword,
      });
      toast.success('Password changed successfully');
      handleClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Failed to change password.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="flex items-center gap-2 text-sm sm:text-base">
            <KeyRound className="h-4 w-4 text-primary" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-5 sm:space-y-5">
          <PasswordInput
            id="current-password"
            label="Current Password"
            placeholder="Enter current password"
            value={form.values.currentPassword}
            onChange={form.handleChange('currentPassword')}
            error={form.getFieldError('currentPassword')}
          />
          <PasswordInput
            id="new-password"
            label="New Password"
            placeholder="Min. 8 characters"
            value={form.values.newPassword}
            onChange={form.handleChange('newPassword')}
            error={form.getFieldError('newPassword')}
          />
          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={form.values.confirmPassword}
            onChange={form.handleChange('confirmPassword')}
            error={form.getFieldError('confirmPassword')}
          />
        </div>

        <Separator />

        <DialogFooter className="px-4 py-3 gap-2 sm:px-6 sm:py-4 grid grid-cols-2">
          <Button variant="outline" onClick={handleClose} disabled={loading} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 sm:flex-none"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
