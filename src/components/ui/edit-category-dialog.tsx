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
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base">{isAdd ? 'Tambah Kategori' : 'Edit Kategori'}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {isAdd
              ? 'Pilih ikon dan masukkan nama untuk kategori baru.'
              : 'Ubah nama dan ikon kategori. Klik Simpan untuk menyimpan perubahan.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="category-name" className="text-xs sm:text-sm">Nama Kategori</Label>
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
            <Label className="text-xs sm:text-sm">Pilih Ikon</Label>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-1.5 max-h-40 sm:max-h-52 overflow-y-auto rounded-lg border border-border p-1.5 sm:p-2">
              {ICON_OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  title={label}
                  onClick={() => setSelectedIconId(id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 sm:gap-1 rounded-md p-1.5 sm:p-2 text-[9px] sm:text-[10px] transition-colors',
                    selectedIconId === id
                      ? 'bg-primary/10 text-primary ring-2 ring-primary ring-inset'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate w-full text-center leading-tight hidden sm:block">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1 sm:flex-none bg-primary hover:bg-primary/90">
              {isAdd ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
