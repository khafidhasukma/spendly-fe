import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  label: string;
}

const tocItems: TocItem[] = [
  { id: 'user-obligations', label: 'User Obligations' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'service-termination', label: 'Service Termination' },
  { id: 'governing-law', label: 'Governing Law' },
];

const TncTableOfContents = () => {
  const [activeId, setActiveId] = useState<string>('user-obligations');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="sticky top-6 space-y-4">
      {/* ToC card */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Table of Contents</p>
        <nav aria-label="Table of contents">
          <ol className="space-y-3 list-decimal list-inside">
            {tocItems.map(({ id, label }) => (
              <li
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  'w-full text-left text-sm transition-colors cursor-pointer',
                  activeId === id ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-primary/70',
                )}
                aria-current={activeId === id ? 'true' : undefined}>
                {label}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Help box */}
      <div className="rounded-[0.75rem] border border-border bg-primary/5 p-4 text-sm text-muted-foreground leading-relaxed">
        Need help understanding this document? Contact our legal team at{' '}
        <a href="mailto:legal@spendly.id" className="font-semibold text-primary hover:underline">
          legal@spendly.id
        </a>
      </div>
    </div>
  );
}

export default TncTableOfContents;