import { useState } from 'react';
import { Filter } from 'lucide-react';
import { filterOptions } from '@/types/ai-analysis';
import type { FilterDropdownProps } from '@/types/ai-analysis';

export type { FilterOption } from '@/types/ai-analysis';

const FilterDropdown = ({ value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted sm:px-4 sm:text-sm"
      >
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {value}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm transition-colors hover:bg-muted ${
                  opt === value ? 'bg-primary/5 font-semibold text-primary' : 'text-foreground'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;
