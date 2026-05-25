import { Camera, ImagePlus, PenLine } from 'lucide-react';

export type ScanMode = 'scan' | 'gallery' | 'manual';

interface ScanTabSwitcherProps {
  active: ScanMode;
  onChange: (mode: ScanMode) => void;
}

interface TabDef {
  id: ScanMode;
  label: string;
  icon: typeof Camera;
  desktopOnly?: boolean;
}

const tabs: TabDef[] = [
  { id: 'scan', label: 'Scan Photo', icon: Camera },
  { id: 'gallery', label: 'Gallery', icon: ImagePlus, desktopOnly: true },
  { id: 'manual', label: 'Manual Input', icon: PenLine },
];

const ScanTabSwitcher = ({ active, onChange }: ScanTabSwitcherProps) => {
  return (
    <div className="mx-auto flex w-full max-w-sm gap-1 rounded-full bg-black/30 backdrop-blur-md p-1 border border-white/10 lg:mx-0 lg:w-fit lg:max-w-none lg:bg-muted/50 lg:backdrop-blur-none lg:border-border">
      {tabs.map(({ id, label, icon: Icon, desktopOnly }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs md:text-sm font-medium transition-all lg:flex-none lg:px-6 ${
            desktopOnly ? 'hidden lg:flex' : ''
          } ${
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
