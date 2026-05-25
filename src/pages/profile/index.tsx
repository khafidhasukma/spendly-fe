import { useState } from 'react';
import {
  BudgetSettingsCard,
  ChangePasswordModal,
  EditProfileModal,
  LogoutConfirmDialog,
  ProfileHeader,
  SecurityCard,
  SupportCard,
} from '@/components/profile';

const ProfilePage = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Profile header  */}
      <ProfileHeader onEditProfile={() => setEditOpen(true)} />

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:col-span-2">
          <BudgetSettingsCard />
          <SecurityCard onUpdatePassword={() => setChangePasswordOpen(true)} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-1">
          <SupportCard onLogout={() => setLogoutOpen(true)} />
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal open={editOpen} onOpenChange={setEditOpen} />
      <ChangePasswordModal open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
      <LogoutConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ProfilePage;
