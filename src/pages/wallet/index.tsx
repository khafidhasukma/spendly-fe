import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AddWalletDialog,
  EditWalletDialog,
  TransferDialog,
  WalletList,
  WalletOverviewCard,
  WalletRecentActivity,
} from '@/components/wallet';

const WalletPage = () => {
  const navigate = useNavigate();
  const [addWalletOpen, setAddWalletOpen] = useState(false);
  const [editWalletOpen, setEditWalletOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [editWallet, setEditWallet] = useState({ name: '', balance: 0 });

  const handleEdit = (id: string) => {
    const walletMap: Record<string, { name: string; balance: number }> = {
      '1': { name: 'Cash', balance: 2_500_000 },
      '2': { name: 'BCA', balance: 5_750_000 },
      '3': { name: 'Mandiri', balance: 3_200_000 },
      '4': { name: 'GoPay', balance: 850_000 },
      '5': { name: 'Credit Card', balance: 0 },
      '6': { name: 'Savings', balance: 2_000_000 },
    };
    const wallet = walletMap[id] ?? { name: 'Wallet', balance: 0 };
    setEditWallet(wallet);
    setEditWalletOpen(true);
  };

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground font-manrope sm:text-2xl lg:text-3xl">
              Wallet Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your wallets and balances
            </p>
          </div>
        </div>
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
      </div>

      {/* Overview */}
      <WalletOverviewCard />

      {/* Wallet list + Recent activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <WalletList onEdit={handleEdit} />
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
    </div>
  );
};

export default WalletPage;
