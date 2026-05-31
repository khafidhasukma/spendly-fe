/* eslint-disable camelcase */
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
import { walletsApi } from '@/api';
import { useWalletList } from '@/features/wallet';
import type { ApiWallet, CreateWalletPayload, UpdateWalletPayload } from '@/types';

const WalletPage = () => {
  usePageTitle('Wallet');

  const { wallets, recentActivity, isLoading, refetch } = useWalletList();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ApiWallet | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ApiWallet | null>(null);
  const [transferOpen, setTransferOpen] = useState(false);

  const handleAdd = async (payload: CreateWalletPayload) => {
    setIsSubmitting(true);
    try {
      await walletsApi.create(payload);
      toast.success('Wallet added successfully');
      refetch();
    } catch {
      toast.error('Failed to add wallet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    if (wallet) {
      setEditTarget(wallet);
      setEditOpen(true);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await walletsApi.update(id, { is_default: true });
      toast.success('Default wallet updated');
      refetch();
    } catch {
      toast.error('Failed to set default wallet');
    }
  };

  const handleEditSave = async (id: string, payload: UpdateWalletPayload) => {
    setIsSubmitting(true);
    try {
      await walletsApi.update(id, payload);
      toast.success('Wallet updated successfully');
      refetch();
    } catch {
      toast.error('Failed to update wallet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequest = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    if (wallet) {
      setDeleteTarget(wallet);
      setDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await walletsApi.delete(deleteTarget.id);
      toast.success('Wallet deleted successfully');
      refetch();
    } catch {
      toast.error('Failed to delete wallet');
    } finally {
      setDeleteTarget(null);
      setDeleteOpen(false);
    }
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
            <Button onClick={() => setAddOpen(true)} className="flex-1 sm:flex-none">
              <Plus className="size-4" />
              Add Wallet
            </Button>
          </div>
        }
      />

      <WalletOverviewCard wallets={wallets} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <WalletList
            wallets={wallets}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onSetDefault={handleSetDefault}
          />
        </div>
        <div className="lg:col-span-2">
          <WalletRecentActivity activities={recentActivity.slice(0, 5)} isLoading={isLoading} />
        </div>
      </div>

      <AddWalletDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSave={handleAdd}
        isSubmitting={isSubmitting}
      />
      <EditWalletDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        wallet={editTarget}
        onSave={handleEditSave}
        isSubmitting={isSubmitting}
      />
      <TransferDialog
        open={transferOpen}
        onOpenChange={setTransferOpen}
        wallets={wallets}
        onSuccess={refetch}
      />
      <DeleteWalletDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTarget(null);
        }}
        walletName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default WalletPage;
