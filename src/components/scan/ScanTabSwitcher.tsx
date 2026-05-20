import { Camera, ImagePlus, PenLine } from 'lucide-react';

export type ScanMode = 'scan' | 'gallery' | 'manual';

interface ScanTabSwitcherProps {
  active: ScanMode;
  onChange: (mode: ScanMode) => void;
}

const tabs: { id: ScanMode; label: string; icon: typeof Camera }[] = [
  { id: 'scan', label: 'Scan', icon: Camera },
  { id: 'gallery', label: 'Gallery', icon: ImagePlus },
  { id: 'manual', label: 'Manual', icon: PenLine },
];

const ScanTabSwitcher = ({ active, onChange }: ScanTabSwitcherProps) => {
  return (
    <div className="flex gap-1 rounded-xl border border-border bg-muted/50 p-1 sm:w-fit">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:flex-none sm:px-5 ${
            active === id
              ? 'bg-card text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ScanTabSwitcher;
