import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoriesApi } from '@/api';
import { ICON_OPTIONS, hexTint } from '@/lib/category-icons';
import type { ApiCategory } from '@/api/endpoints/categories';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTarget?: ApiCategory;
  onSuccess: () => void;
}

const DEFAULT_COLOR = '#6B7280';
const DEFAULT_ICON = 'LayoutGrid';

// inner form — receives initial values as props so state is fresh on each mount
interface FormProps {
  isEdit: boolean;
  initialName: string;
  initialIcon: string;
  initialColor: string;
  initialType: 'expense' | 'income' | 'both';
  editId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CategoryForm = ({
  isEdit,
  initialName,
  initialIcon,
  initialColor,
  initialType,
  editId,
  onSuccess,
  onCancel,
}: FormProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initialName);
  const [iconName, setIconName] = useState(initialIcon);
  const [color, setColor] = useState(initialColor);
  const [type, setType] = useState(initialType);
  const [nameError, setNameError] = useState('');

  const handleSave = async () => {
    if (!name.trim()) { setNameError('Name is required'); return; }
    setNameError('');
    setLoading(true);
    try {
      if (isEdit && editId) {
        await categoriesApi.update(editId, { name: name.trim(), icon: iconName, color });
        toast.success('Category updated');
      } else {
        await categoriesApi.create({ name: name.trim(), icon: iconName, color, type });
        toast.success('Category created');
      }
      onSuccess();
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Failed to save category.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const SelectedIcon = ICON_OPTIONS.find((o) => o.id === iconName)?.icon;

  return (
    <>
      <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-5">
        {/* preview */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: hexTint(color) }}
          >
            {SelectedIcon && <SelectedIcon className="h-6 w-6" style={{ color }} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{name || 'Category Name'}</p>
            <p className="text-xs text-muted-foreground capitalize">{type}</p>
          </div>
        </div>

        <Separator />

        {/* name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</Label>
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(''); }}
            placeholder="e.g. Transport"
            aria-invalid={!!nameError}
          />
          {nameError && <p className="text-xs font-medium text-destructive">{nameError}</p>}
        </div>

        {/* type — only for new categories */}
        {!isEdit && (
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* icon picker */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Icon</Label>
          <div className="grid grid-cols-8 gap-1.5 max-h-36 overflow-y-auto rounded-lg border border-border p-2">
            {ICON_OPTIONS.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setIconName(id)}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                  iconName === id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                aria-label={id}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* color picker */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Color</Label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-lg border border-border bg-transparent p-0.5"
            />
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#6B7280"
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <Separator />

      <DialogFooter className="px-4 py-3 gap-2 sm:px-6 sm:py-4 grid grid-cols-2">
        <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create'}
        </Button>
      </DialogFooter>
    </>
  );
};

const CategoryFormDialog = ({ open, onOpenChange, editTarget, onSuccess }: Props) => {
  const isEdit = !!editTarget;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onOpenChange(false); }}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md w-full gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="text-sm sm:text-base">
            {isEdit ? 'Edit Category' : 'Add Category'}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        {/* key resets form state when dialog opens with different target */}
        <CategoryForm
          key={editTarget?.id ?? 'new'}
          isEdit={isEdit}
          initialName={editTarget?.name ?? ''}
          initialIcon={editTarget?.icon ?? DEFAULT_ICON}
          initialColor={editTarget?.color ?? DEFAULT_COLOR}
          initialType={(editTarget?.type as 'expense' | 'income' | 'both') ?? 'expense'}
          editId={editTarget?.id}
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
