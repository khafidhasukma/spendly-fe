import { LogOut } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export default function LogoutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmDialogProps) {
  function handleConfirm() {
    onConfirm?.();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/10 shrink-0">
              <LogOut className="h-5 w-5 text-error" />
            </div>
            <div>
              <DialogTitle className="text-base">Logout Account</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                This action will end your current session.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to logout from Spendly? You will need to sign in again to access
            your account.
          </p>
        </div>

        <Separator />

        <DialogFooter className="px-6 py-4 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-error hover:bg-error/90 text-white sm:flex-none"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
