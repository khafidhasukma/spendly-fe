/* eslint-disable camelcase */
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/forms';
import { useForm } from '@/hooks/useForm';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations/auth';
import { authApi } from '@/api';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token') ?? '';

  const form = useForm<ResetPasswordFormData>({
    schema: resetPasswordSchema,
    initialValues: { new_password: '', confirmPassword: '' },
  });

  // If no token in URL, the user navigated here directly — redirect them
  if (!token) {
    return (
      <>
        <h1 className="text-2xl font-bold text-foreground font-manrope">Invalid Link</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This reset link is invalid or has expired. Please request a new one.
        </p>
        <div className="mt-8">
          <Link
            to="/forgot-password"
            className="inline-flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Request New Link
          </Link>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-7 w-7 text-green-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground font-manrope">Password Reset!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <div className="mt-8">
          <Button
            className="w-full bg-primary hover:bg-primary/90 h-auto py-3 font-semibold"
            onClick={() => navigate('/login', { replace: true })}
          >
            Back to Sign In
          </Button>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      await authApi.resetPassword({ token, new_password: data.new_password });
      setSuccess(true);
      toast.success('Password reset successfully');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to reset password. The link may have expired.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Reset Password</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Create a new password for your account. Make sure it&apos;s at least 8 characters.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <PasswordInput
          id="new_password"
          label="New Password"
          placeholder="Min. 8 characters"
          value={form.values.new_password}
          onChange={form.handleChange('new_password')}
          error={form.getFieldError('new_password')}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          value={form.values.confirmPassword}
          onChange={form.handleChange('confirmPassword')}
          error={form.getFieldError('confirmPassword')}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 h-auto py-3 font-semibold"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordForm;
