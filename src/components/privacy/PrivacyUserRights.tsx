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
    <div className="rounded-2xl bg-primary p-4 sm:p-6 md:p-8 lg:p-16">
      <h2 className="font-manrope text-xl sm:text-2xl md:text-headline-lg font-semibold text-white">
        Your Data Rights
      </h2>
      <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base leading-relaxed text-white/80">
        You have full control over your information at Spendly. We provide access to:
      </p>

      <ul className="mt-5 sm:mt-6 md:mt-10 space-y-3 sm:space-y-4">
        {rights.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-sm sm:text-base leading-relaxed text-white/90">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrivacyUserRights;
