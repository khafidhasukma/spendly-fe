import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
  { label: 'Terms & Conditions', href: '/tnc', isRoute: true },
  { label: 'Support', href: '/faq', isRoute: true },
];

const PublicFooter = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <img src="/assets/logos/logo.svg" alt="Spendly" className="h-8" />
            <p className="mt-1.5 max-w-xs text-xs text-muted-foreground leading-relaxed">
              The smart financial app that helps you spend less and save more every month.
            </p>
            <p className="mt-5 text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Spendly Finance Inc. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:pt-0.5">
            {footerLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
