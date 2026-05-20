import type { TncSectionProps } from '@/types';

export type { TncSubItem } from '@/types';

const TncSection = ({
  id,
  sectionNumber,
  title,
  description,
  items,
  blockquote,
  icon: Icon,
}: TncSectionProps) => {
  return (
    <div id={id} className="scroll-mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Section heading */}
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="pt-1.5 mb-2 font-manrope text-2xl font-semibold text-primary">
            {sectionNumber}. {title}
          </h2>
          {/* Description */}
          <p className="mb-4 text-base leading-relaxed text-muted-foreground">{description}</p>

          {/* Optional blockquote */}
          {blockquote && (
            <blockquote className="my-4 border-l-4 border-primary/40 pl-4 py-2 text-base leading-relaxed text-muted-foreground bg-primary/10">
              &ldquo;{blockquote}&rdquo;
            </blockquote>
          )}

          {/* Sub-items */}
          {items.length > 0 && (
            <ul className="space-y-4">
              {items.map(({ number, text }) => (
                <li key={number} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="shrink-0 font-semibold text-foreground/60">{number}</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TncSection;