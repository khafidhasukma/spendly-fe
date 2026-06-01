import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GroupInput } from '@/components/forms';
import { useForm } from '@/hooks/useForm';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { authApi } from '@/api';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

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
      setSentEmail(data.email);
      setSuccess(true);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-7 w-7 text-green-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground font-manrope">Check Your Email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to <strong>{sentEmail}</strong>. 
          Please check your inbox and click the link to reset your password.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Back to Sign In
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Didn&apos;t receive the email?{' '}
          <button
            onClick={() => setSuccess(false)}
            className="font-medium text-primary hover:underline"
          >
            Try again
          </button>
        </p>
      </>
    );
  }

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
