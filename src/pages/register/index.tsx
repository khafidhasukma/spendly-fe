import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';
import RegisterHero from '@/components/auth/RegisterHero';

const steps = [
  { num: '1', label: 'DETAILS' },
  { num: '2', label: 'VERIFICATION' },
  { num: '3', label: 'CURATE' },
];

function RegisterPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex min-h-screen">
      <RegisterHero />

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Top link */}
          <p className="text-right text-sm text-muted-foreground">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-foreground hover:underline">
              Sign in
            </Link>
          </p>

          <h1 className="mt-4 text-2xl font-bold text-foreground">Request Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">Begin your curation journey.</p>

          {/* Step indicator */}
          <div className="mt-6 flex items-start">
            {steps.map(({ num, label }, i) => (
              <div key={num} className="flex items-center">
                {i > 0 && (
                  <div className="mx-1 mb-4 h-px w-8 translate-y-[-50%] self-start bg-border mt-3.5" />
                )}
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                      i === 0
                        ? 'bg-gray-900 text-white'
                        : 'border border-border text-muted-foreground',
                    ].join(' ')}
                  >
                    {num}
                  </div>
                  <span
                    className={[
                      'mt-1 text-[10px] font-semibold',
                      i === 0 ? 'text-foreground' : 'text-muted-foreground',
                    ].join(' ')}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form className="mt-6 space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullname">Full Name</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <User />
                </InputGroupAddon>
                <Input id="fullname" type="text" placeholder="Jane Doe" />
              </InputGroup>
            </div>

            {/* Professional Email */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Professional Email</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Mail />
                </InputGroupAddon>
                <Input id="reg-email" type="email" placeholder="jane@example.com" />
              </InputGroup>
            </div>

            {/* Passphrase */}
            <div className="space-y-1.5">
              <Label htmlFor="passphrase">Passphrase</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Lock />
                </InputGroupAddon>
                <Input
                  id="passphrase"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? 'Hide passphrase' : 'Show passphrase'}
                  >
                    {showPass ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Confirm Passphrase */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm-passphrase">Confirm Passphrase</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Lock />
                </InputGroupAddon>
                <Input id="confirm-passphrase" type="password" placeholder="••••••••" />
              </InputGroup>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
              Continue to Verification →
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;