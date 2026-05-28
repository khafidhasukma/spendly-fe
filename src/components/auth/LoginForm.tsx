import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GroupInput, PasswordInput } from '@/components/forms';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from '@/hooks/useForm';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import AuthDivider from './AuthDivider';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    schema: loginSchema,
    initialValues: { email: '', password: '' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      await login(data);
      toast.success('Login successful');
      const from = (location.state as { from?: string })?.from ?? '/dashboard';
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || 'Login failed. Please check your credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Welcome Back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your Spendly account to track spending, review insights, and stay on top of your finances.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <GroupInput
          id="email"
          label="Email Address"
          type="email"
          icon={<Mail />}
          placeholder="name@company.com"
          value={form.values.email}
          onChange={form.handleChange('email')}
          error={form.getFieldError('email')}
        />

        <PasswordInput
          id="password"
          value={form.values.password}
          onChange={form.handleChange('password')}
          error={form.getFieldError('password')}
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" className="mt-0.5 shrink-0" />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-auto py-3 font-semibold"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Create an Account
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
