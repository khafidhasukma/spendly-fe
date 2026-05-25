import { AuthPageLayout, LoginForm } from '@/components/auth';
import { usePageTitle } from '@/hooks';

const LoginPage = () => {
  usePageTitle('Login');
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
};

export default LoginPage;