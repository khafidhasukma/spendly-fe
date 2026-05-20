/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ICON_OPTIONS } from '@/lib/category-icons';

export interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'edit' | 'add';
  categoryName?: string;
  categoryIconId?: string;
  onSave: (name: string, iconId: string) => void;
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  mode = 'edit',
  categoryName = '',
  categoryIconId = ICON_OPTIONS[0].id,
  onSave,
}: EditCategoryDialogProps) {
  const [name, setName] = useState(categoryName);
  const [selectedIconId, setSelectedIconId] = useState(categoryIconId);

  useEffect(() => {
    if (open) {
      setName(categoryName);
      setSelectedIconId(categoryIconId);
    }
  }, [open, categoryName, categoryIconId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed, selectedIconId);
    onOpenChange(false);
  }

  const isAdd = mode === 'add';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isAdd ? 'Tambah Kategori' : 'Edit Kategori'}</DialogTitle>
          <DialogDescription>
            {isAdd
              ? 'Pilih ikon dan masukkan nama untuk kategori baru.'
              : 'Ubah nama dan ikon kategori. Klik Simpan untuk menyimpan perubahan.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="category-name">Nama Kategori</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kategori"
              autoFocus
            />
          </div>

          {/* Icon Picker */}
          <div className="space-y-1.5">
            <Label>Pilih Ikon</Label>
            <div className="grid grid-cols-8 gap-1.5 max-h-52 overflow-y-auto rounded-lg border border-border p-2">
              {ICON_OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  title={label}
                  onClick={() => setSelectedIconId(id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-md p-2 text-[10px] transition-colors',
                    selectedIconId === id
                      ? 'bg-primary/10 text-primary ring-2 ring-primary ring-inset'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate w-full text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {isAdd ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
