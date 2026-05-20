import { useState } from 'react';
import { KeyRound } from 'lucide-react';
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
import type { ChangePasswordModalProps } from '@/types';

const ChangePasswordModal = ({
  open,
  onOpenChange,
  onSave,
}: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mismatch = !!(newPassword && confirmPassword && newPassword !== confirmPassword);
  const canSave = currentPassword.length > 0 && newPassword.length > 0 && !mismatch;

  const handleSave = () => {
    onSave?.(newPassword);
    handleClose();
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else onOpenChange(true); }}>
      <DialogContent className="max-w-sm w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4 text-primary" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="px-6 py-5 space-y-5">
          <PasswordInput
            id="current-password"
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {mismatch && (
            <p className="text-xs text-destructive">Passwords do not match.</p>
          )}
        </div>

        <Separator />

        <DialogFooter className="px-6 py-4 gap-2">
          <Button variant="outline" onClick={handleClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 bg-primary hover:bg-primary/90 sm:flex-none"
          >
            Update Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;