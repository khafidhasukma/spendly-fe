import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GroupInput } from '@/components/forms';
import { useForm } from '@/hooks/useForm';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { authApi } from '@/api/endpoints/auth';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    schema: forgotPasswordSchema,
    initialValues: { email: '' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      const res = await authApi.forgotPassword({ email: data.email });
      toast.success('Reset link sent', {
        description: res.message,
      });
      // Redirect to reset-password page, passing the token via state
      navigate('/reset-password', {
        state: { token: res.data.reset_token, email: data.email },
      });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Forgot Password?</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        No worries! Enter your registered email address and we&apos;ll send you a link to reset your password.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <GroupInput
          id="forgot-email"
          label="Email Address"
          type="email"
          icon={<Mail />}
          placeholder="name@company.com"
          value={form.values.email}
          onChange={form.handleChange('email')}
          error={form.getFieldError('email')}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 h-auto py-3 font-semibold"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to Sign In
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
