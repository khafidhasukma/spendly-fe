import { AuthPageLayout, RegisterForm } from '@/components/auth';

function RegisterPage() {
  return (
    <AuthPageLayout maxWidth="max-w-2xl">
      <RegisterForm />
    </AuthPageLayout>
  );
}

export default RegisterPage;