import { AuthPageLayout, ResetPasswordForm } from '@/components/auth';
import { usePageTitle } from '@/hooks';

const ResetPasswordPage = () => {
  usePageTitle('Reset Password');
  return (
    <AuthPageLayout>
      <ResetPasswordForm />
    </AuthPageLayout>
  );
};

export default ResetPasswordPage;
