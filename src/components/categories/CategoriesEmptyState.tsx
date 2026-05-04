import { ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

export default function CategoriesEmptyState() {
  return (
    <Empty className="border bg-primary/5 border-primary/5">
      <EmptyHeader>
        <EmptyTitle className="text-2xl font-semibold text-primary">
          Belum Ada Pengeluaran
        </EmptyTitle>
        <EmptyDescription>
          Kategori Anda sudah siap! Mulai catat transaksi pertama Anda untuk melihat
          perkembangan keuangan Anda.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="pt-10">
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-lg py-4 px-8! h-auto rounded-lg"
        >
          <Link to="/scan">
            <ScanLine className="mr-2 h-6! w-6!" />
            Catat Transaksi Pertama
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
