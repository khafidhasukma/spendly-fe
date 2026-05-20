const ContactImageBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src="/assets/images/contact-bg.png"
        alt="Office security"
        className="h-44 w-full object-cover sm:h-52"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-white font-manrope">
        Your Security is Our Priority.
      </p>
    </div>
  );
};

export default ContactImageBanner;