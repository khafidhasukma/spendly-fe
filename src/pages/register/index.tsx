import { AuthPageLayout, RegisterForm } from '@/components/auth';
import { usePageTitle } from '@/hooks';

const RegisterPage = () => {
  usePageTitle('Register');
  return (
    <AuthPageLayout maxWidth="max-w-2xl">
      <RegisterForm />
    </AuthPageLayout>
  );
};

export default RegisterPage;