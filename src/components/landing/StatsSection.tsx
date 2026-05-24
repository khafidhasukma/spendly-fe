const stats = [
  { value: '10K+', label: 'Pengguna Aktif' },
  { value: '2.5M+', label: 'Transaksi Tercatat' },
  { value: 'Rp8.2B', label: 'Total Penghematan' },
  { value: '4.8/5', label: 'Rating Pengguna' },
];

const StatsSection = () => {
  return (
    <section className="relative py-10 sm:py-16 lg:py-20 bg-primary/4">
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-primary font-manrope sm:text-3xl lg:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
