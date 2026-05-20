import { Download, PenLine, Trash2 } from 'lucide-react';
import type { RightItem } from '@/types';

const rights: RightItem[] = [
  {
    icon: Download,
    text: 'Download a complete copy of your transaction data at any time.',
  },
  {
    icon: PenLine,
    text: 'Update or correct inaccurate personal information.',
  },
  {
    icon: Trash2,
    text: 'Delete your account and all related data permanently from our servers.',
  },
];

const PrivacyUserRights = () => {
  return (
    <div className="rounded-2xl bg-primary p-6 sm:p-8 lg:p-16">
      <h2 className="font-manrope text-headline-lg font-semibold text-white sm:text-2xl">
        Your Data Rights
      </h2>
      <p className="mt-6 text-base leading-relaxed text-white/80">
        You have full control over your information at Spendly. We provide access to:
      </p>

      <ul className="mt-10 space-y-4">
        {rights.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-base leading-relaxed text-white/90">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrivacyUserRights;
