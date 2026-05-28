import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GroupInput, PasswordInput } from '@/components/forms';
import AuthDivider from './AuthDivider';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with API
    toast.success('Logged in successfully');
    navigate('/dashboard');
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Welcome Back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your Spendly account to track spending, review insights, and stay on top of your finances.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <GroupInput id="email" label="Email Address" type="email" icon={<Mail />} placeholder="name@company.com" />

        <PasswordInput id="password" />

        <div className="flex justify-between items-center">
          {/* Remember me */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" className="mt-0.5 shrink-0" />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </label>
          </div>

          {/* Forgot password */}
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-auto py-3 font-semibold">
          Sign In
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