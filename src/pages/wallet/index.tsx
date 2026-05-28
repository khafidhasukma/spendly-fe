import { useState } from 'react';
import { Plus, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';
import {
  AddWalletDialog,
  DeleteWalletDialog,
  EditWalletDialog,
  TransferDialog,
  WalletList,
  WalletOverviewCard,
  WalletRecentActivity,
} from '@/components/wallet';
import { usePageTitle } from '@/hooks';

const mockWalletNames: Record<string, string> = {
  '1': 'Cash',
  '2': 'BCA',
  '3': 'Mandiri',
  '4': 'GoPay',
  '5': 'Credit Card',
  '6': 'Savings',
};

const mockWalletData: Record<string, { name: string; balance: number }> = {
  '1': { name: 'Cash', balance: 2_500_000 },
  '2': { name: 'BCA', balance: 5_750_000 },
  '3': { name: 'Mandiri', balance: 3_200_000 },
  '4': { name: 'GoPay', balance: 850_000 },
  '5': { name: 'Credit Card', balance: 0 },
  '6': { name: 'Savings', balance: 2_000_000 },
};

const WalletPage = () => {
  usePageTitle('Wallet');
  const [addWalletOpen, setAddWalletOpen] = useState(false);
  const [editWalletOpen, setEditWalletOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [editWallet, setEditWallet] = useState({ name: '', balance: 0 });

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    const wallet = mockWalletData[id] ?? { name: 'Wallet', balance: 0 };
    setEditWallet(wallet);
    setEditWalletOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: delete wallet by deleteTargetId
    toast.success('Wallet deleted successfully');
    setDeleteTargetId(null);
  };

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <PageHeader
        title="Wallet Management"
        description="Manage your wallets and balances"
        breadcrumb={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Wallet Management' },
        ]}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTransferOpen(true)} className="flex-1 sm:flex-none">
              <ArrowLeftRight className="size-4" />
              Transfer
            </Button>
            <Button onClick={() => setAddWalletOpen(true)} className="flex-1 sm:flex-none">
              <Plus className="size-4" />
              Add Wallet
            </Button>
          </div>
        }
      />

      {/* Overview */}
      <WalletOverviewCard />

      {/* Wallet list + Recent activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <WalletList onEdit={handleEdit} onDelete={handleDeleteRequest} />
        </div>
        <div className="lg:col-span-2">
          <WalletRecentActivity />
        </div>
      </div>

      {/* Dialogs */}
      <AddWalletDialog open={addWalletOpen} onOpenChange={setAddWalletOpen} />
      <EditWalletDialog
        open={editWalletOpen}
        onOpenChange={setEditWalletOpen}
        walletName={editWallet.name}
        currentBalance={editWallet.balance}
      />
      <TransferDialog open={transferOpen} onOpenChange={setTransferOpen} />
      <DeleteWalletDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTargetId(null);
        }}
        walletName={deleteTargetId ? mockWalletNames[deleteTargetId] : undefined}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default WalletPage;
