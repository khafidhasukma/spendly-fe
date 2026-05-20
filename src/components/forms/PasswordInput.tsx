import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';
import type { PasswordInputProps } from '@/types';

const PasswordInput = ({
  id = 'password',
  label = 'Password',
  placeholder = '••••••••',
  value,
  onChange,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Lock />
        </InputGroupAddon>
        <Input
          id={id}
          className="border-0 bg-transparent! shadow-none! ring-0! text-sm"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default PasswordInput;