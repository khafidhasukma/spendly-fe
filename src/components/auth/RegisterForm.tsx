import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GroupInput, PasswordInput } from '@/components/forms';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from '@/hooks/useForm';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';

const RegisterForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const form = useForm<RegisterFormData>({
    schema: registerSchema,
    initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    try {
      await register({
        email: data.email,
        password: data.password,
        ['first_name']: data.firstName,
        ['last_name']: data.lastName,
      });
      toast.success('Account created successfully');
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Create Your Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join Spendly today to track spending, get insights, and budget smarter to save more.
      </p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <GroupInput
            id="firstName"
            label="First Name"
            type="text"
            icon={<User />}
            placeholder="Jane"
            value={form.values.firstName}
            onChange={form.handleChange('firstName')}
            error={form.getFieldError('firstName')}
          />
          <GroupInput
            id="lastName"
            label="Last Name"
            type="text"
            icon={<User />}
            placeholder="Doe"
            value={form.values.lastName}
            onChange={form.handleChange('lastName')}
            error={form.getFieldError('lastName')}
          />
        </div>

        <GroupInput
          id="reg-email"
          label="Email Address"
          type="email"
          icon={<Mail />}
          placeholder="jane@example.com"
          value={form.values.email}
          onChange={form.handleChange('email')}
          error={form.getFieldError('email')}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <PasswordInput
            id="password"
            placeholder="Min. 8 characters"
            value={form.values.password}
            onChange={form.handleChange('password')}
            error={form.getFieldError('password')}
          />
          <PasswordInput
            id="confirm-password"
            label="Confirm Password"
            placeholder="Repeat password"
            value={form.values.confirmPassword}
            onChange={form.handleChange('confirmPassword')}
            error={form.getFieldError('confirmPassword')}
          />
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5 shrink-0" />
          <label htmlFor="terms" className="cursor-pointer select-none text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link to="/tnc" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          disabled={!agreed || loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 h-auto py-3 font-semibold"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already a member?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
