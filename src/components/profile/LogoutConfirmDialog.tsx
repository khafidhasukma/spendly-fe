import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import type { LogoutConfirmDialogProps } from '@/types';

const LogoutConfirmDialog = ({
  open,
  onOpenChange,
}: LogoutConfirmDialogProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await logout();
      onOpenChange(false);
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } catch {
      toast.error('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-base text-start">Logout Account</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to logout from Spendly? You will need to sign in again to access
            your account.
          </p>
        </div>

        <Separator />

        <DialogFooter className="px-6 py-4 gap-2 grid grid-cols-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-error hover:bg-error/90 text-white sm:flex-none"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmDialog;