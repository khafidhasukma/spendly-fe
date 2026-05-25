import { Camera, PenLine } from 'lucide-react';

export type ScanMode = 'scan' | 'gallery' | 'manual';

interface ScanTabSwitcherProps {
  active: ScanMode;
  onChange: (mode: ScanMode) => void;
}

const tabs: { id: ScanMode; label: string; icon: typeof Camera }[] = [
  { id: 'scan', label: 'Scan', icon: Camera },
  { id: 'manual', label: 'Manual', icon: PenLine },
];

const ScanTabSwitcher = ({ active, onChange }: ScanTabSwitcherProps) => {
  return (
    <div className="flex gap-1 rounded-full bg-black/30 backdrop-blur-md p-1 border border-white/10 lg:bg-muted/50 lg:backdrop-blur-none lg:border-border lg:rounded-full sm:w-fit">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all sm:flex-none sm:px-6 ${
            active === id
              ? 'bg-white/90 text-primary shadow-sm lg:bg-card lg:text-primary'
              : 'text-white/70 hover:text-white lg:text-muted-foreground lg:hover:text-foreground'
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
