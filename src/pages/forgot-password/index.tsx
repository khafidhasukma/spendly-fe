import { AuthPageLayout, ForgotPasswordForm } from '@/components/auth';
import { usePageTitle } from '@/hooks';

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password');
  return (
    <AuthPageLayout>
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;
