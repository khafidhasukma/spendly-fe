import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GroupInput } from '@/components/forms';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // integrate with API
    toast.success('Reset link sent', {
      description: `We've sent a password reset link to ${email}. Check your inbox.`,
    });
    setEmail('');
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Forgot Password?</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        No worries! Enter your registered email address and we'll send you a link to reset your
        password.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <GroupInput
          id="forgot-email"
          label="Email Address"
          type="email"
          icon={<Mail />}
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          disabled={!email}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 h-auto py-3 font-semibold">
          Send Reset Link
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
