import React, { useState } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface IconSelectOption {
  id: string;
  label: string;
  iconEl: React.ReactNode;
  meta?: string;
}

interface IconSelectProps {
  options: IconSelectOption[];
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const IconSelect = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  loading,
  className,
}: IconSelectProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          className={cn(
            'flex h-12 w-full items-center justify-between gap-2 rounded-[0.75rem] border border-input bg-transparent px-3 text-sm transition-[color,box-shadow] outline-none',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            open && 'border-ring ring-[3px] ring-ring/50',
            className,
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
            ) : selected ? (
              <>
                {selected.iconEl}
                <span className="truncate text-foreground">{selected.label}</span>
                {selected.meta && (
                  <span className="shrink-0 text-[10px] text-muted-foreground">{selected.meta}</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-1"
        align="start"
        sideOffset={4}
      >
        {options.length === 0 ? (
          <p className="px-3 py-2 text-xs text-muted-foreground">No options found</p>
        ) : (
          <ul className="max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.id); setOpen(false); }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                    value === opt.id && 'bg-accent text-accent-foreground',
                  )}
                >
                  {opt.iconEl}
                  <span className="flex-1 truncate text-left">{opt.label}</span>
                  {opt.meta && (
                    <span className="shrink-0 text-[10px] text-muted-foreground">{opt.meta}</span>
                  )}
                  {value === opt.id && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default IconSelect;
