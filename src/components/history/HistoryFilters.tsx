import { useState } from 'react';
import { CalendarDays, ListFilter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

export interface HistoryFiltersValue {
  dateRange: string;
  category: string;
  amountMin: string;
  amountMax: string;
}

interface HistoryFiltersProps {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
  categoryOptions?: { id: string; name: string }[];
}

const DATE_RANGE_OPTIONS = [
  { value: 'last-7', label: 'Last 7 Days' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-90', label: 'Last 90 Days' },
  { value: 'this-month', label: 'This Month' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'this-year', label: 'This Year' },
];

const HistoryFiltersFields = ({
  value,
  onChange,
  categoryOptions,
  stacked = false,
}: HistoryFiltersProps & { stacked?: boolean }) => {
  
  const set = (key: keyof HistoryFiltersValue, val: string) => {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className={cn('grid gap-4', stacked ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3')}>
      {/* date range */}
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Date Range
        </Label>
        <Select value={value.dateRange} onValueChange={(v) => set('dateRange', v)}>
          <SelectTrigger className="w-full text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-sm">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Category</Label>
        <Select value={value.category} onValueChange={(v) => set('category', v)}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-sm">All Categories</SelectItem>
            {categoryOptions.map((c) => (
              <SelectItem key={c.id} value={c.id} className="text-sm">
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Amount Range (Rp)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={value.amountMin}
            onChange={(e) => set('amountMin', e.target.value)}
            className="h-12 text-sm"
          />
          <span className="shrink-0 text-sm text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={value.amountMax}
            onChange={(e) => set('amountMax', e.target.value)}
            className="h-12 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function HistoryFilters(props: HistoryFiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="hidden rounded-lg border border-border bg-card p-5 md:block">
        <HistoryFiltersFields {...props} />
      </div>

      <div className="md:hidden">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full gap-2 border-border shadow-sm sm:h-12"
          onClick={() => setDrawerOpen(true)}
        >
          <ListFilter className="h-4 w-4" />
          Filter
        </Button>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
          <DrawerContent className="max-h-[85vh]">
            <div className="overflow-y-auto px-4 pb-2">
              <HistoryFiltersFields {...props} stacked />
            </div>
            <DrawerFooter className="pt-2">
              <Button type="button" className="h-11 w-full sm:h-10" onClick={() => setDrawerOpen(false)}>
                Done
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default HistoryFilters;