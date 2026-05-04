import { BarChart2, Building2, Sparkles } from 'lucide-react';

const features = [
  {
    id: 'visualisasi',
    title: 'Visualisasi Akurat',
    description:
      'Kategori membantu Spendly memetakan kebiasaan belanja Anda dalam bentuk grafik yang indah.',
    icon: BarChart2,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 'anggaran',
    title: 'Kontrol Anggaran',
    description:
      'Atur batas pengeluaran untuk setiap kategori agar kondisi keuangan Anda tetap sehat.',
    icon: Building2,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    id: 'saran',
    title: 'Saran Pintar',
    description:
      'Dapatkan rekomendasi penghematan berdasarkan kategori pengeluaran tertinggi Anda.',
    icon: Sparkles,
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
  },
];

export default function CategoriesFeaturesSection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {features.map(({ id, title, description, icon: Icon, iconBg, iconColor }) => (
        <div key={id} className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className={`flex h-10 w-10 items-center justify-center rounded-[0.75rem] ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <h4 className="mt-4 font-semibold text-foreground">{title}</h4>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}
