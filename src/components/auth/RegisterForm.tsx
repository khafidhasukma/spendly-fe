import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GroupInput, PasswordInput } from '@/components/forms';
// import AuthStepIndicator from './AuthStepIndicator';

// const STEPS = [
//   { num: '1', label: 'DETAILS' },
//   { num: '2', label: 'VERIFICATION' },
// ];

const RegisterForm = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground font-manrope">Create Your Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join Spendly today to track spending, get insights, and budget smarter to save more.
      </p>

      {/* <div className="mt-6">
        <AuthStepIndicator steps={STEPS} currentStep={0} />
      </div> */}

      <form className="mt-6 space-y-6">
        {/* full Name + Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <GroupInput id="fullname" label="Full name" type="text" icon={<User />} placeholder="Jane Doe" />
          <GroupInput
            id="reg-email"
            label="Email Address"
            type="email"
            icon={<Mail />}
            placeholder="jane@example.com"
          />
        </div>

        {/* password + confirm */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <PasswordInput id="password" placeholder="Min. 8 characters" />
          <PasswordInput id="confirm-password" label="Confirm Password" placeholder="Repeat password" />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-2.5">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5 shrink-0" />
          <label htmlFor="terms" className="cursor-pointer select-none text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link to="/tnc" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/tnc" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!agreed}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 h-auto py-3 font-semibold">
          Continue to Verification
        </Button>

        {/* Already a member */}
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