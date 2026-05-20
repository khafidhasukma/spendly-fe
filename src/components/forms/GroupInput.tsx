import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
} from '@/components/ui/input-group';
import type { GroupInputProps } from '@/types';

const GroupInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  icon,
  value,
  onChange,
}: GroupInputProps) => {
  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputGroup>
        {icon && (
          <InputGroupAddon align="inline-start">
            {icon}
          </InputGroupAddon>
        )}
        <Input
          id={id}
          className="border-0 bg-transparent! shadow-none! ring-0! text-sm"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputGroup>
    </div>
  );
};

export default GroupInput;