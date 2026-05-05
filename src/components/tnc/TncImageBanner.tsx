export default function TncImageBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img src="/assets/images/tnc-bg.png" alt="Privacy banner" className="h-44 w-full object-cover sm:h-52 lg:h-64" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/0" />
      <div className="absolute inset-0 flex flex-col justify-center px-12">
        <p className="font-manrope text-headline-lg font-semibold text-white">Your Privacy is Our Priority</p>
        <p className="mt-2 text-sm text-white/80 lg:max-w-md">
          Your data is protected by international banking-grade encryption standards.
        </p>
      </div>
    </div>
  );
}
