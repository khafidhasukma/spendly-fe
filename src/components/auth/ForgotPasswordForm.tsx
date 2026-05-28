import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GroupInput } from '@/components/forms';
import { useForm } from '@/hooks/useForm';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
      // TODO: integrate when backend supports forgot-password endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
      toast.success('Reset link sent', {
        description: `We've sent a password reset link to ${data.email}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <h1 className="text-2xl font-bold text-foreground font-manrope">Check Your Email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to <strong>{form.values.email}</strong>. Please check your inbox.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Back to Sign In
          </Link>
        </div>
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
