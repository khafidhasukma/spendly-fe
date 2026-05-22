const TncImageBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
      <img src="/assets/images/tnc-bg.png" alt="Privacy banner" className="h-32 sm:h-44 md:h-52 lg:h-64 w-full object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/0" />
      <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12">
        <p className="font-manrope text-lg sm:text-xl md:text-headline-lg font-semibold text-white">Your Privacy is Our Priority</p>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80 lg:max-w-md">
          Your data is protected by international banking-grade encryption standards.
        </p>
      </div>
    </div>
  );
};

export default TncImageBanner;