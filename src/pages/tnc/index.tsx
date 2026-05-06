import { UserCheck, Copyright, Scale, Ban, BookOpen } from 'lucide-react';
import {
  TncHeader,
  TncTableOfContents,
  TncSection,
  TncImageBanner,
  TncCTA,
  type TncSubItem,
} from '@/components/tnc';
import { type LucideIcon } from 'lucide-react';

interface SectionData {
  id: string;
  sectionNumber: number;
  title: string;
  description: string;
  items: TncSubItem[];
  blockquote?: string;
  icon: LucideIcon;
}

const sections: SectionData[] = [
  {
    id: 'user-obligations',
    sectionNumber: 1,
    title: 'User Obligations',
    description:
      'As a user of Spendly services, you bear full responsibility for all activities that occur under your account.',
    icon: UserCheck,
    items: [
      {
        number: '1.1',
        text: 'You are required to provide accurate, complete, and up-to-date information during the registration and service usage process.',
      },
      {
        number: '1.2',
        text: 'You are prohibited from using the service for illegal or illegitimate purposes, including money laundering or financial fraud.',
      },
      {
        number: '1.3',
        text: 'The confidentiality of your login credentials is solely your personal responsibility.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    sectionNumber: 2,
    title: 'Intellectual Property',
    description:
      'All content, designs, logos, and programming code on the Spendly platform are our rightful property.',
    icon: Copyright,
    items: [
      {
        number: '2.1',
        text: 'The "Spendly" trademark and related logos may not be used without prior written approval.',
      },
      {
        number: '2.2',
        text: 'Financial data you upload remains your property, but you grant us a limited license to process it in order to provide the service.',
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    sectionNumber: 3,
    title: 'Limitation of Liability',
    description:
      'Spendly is provided "as is" without any express or implied warranties.',
    icon: Scale,
    blockquote:
      'Spendly is not responsible for any financial losses arising from user input errors, third-party network disruptions, or investment decisions made based on the application\'s analysis.',
    items: [
      {
        number: '3.1',
        text: 'We do not guarantee that the service will always be available without interruptions or technical errors.',
      },
      {
        number: '3.2',
        text: 'Our total liability to you for any claim arising from use of the service shall not exceed the amount you paid us in the three months preceding the claim.',
      },
    ],
  },
  {
    id: 'service-termination',
    sectionNumber: 4,
    title: 'Service Termination',
    description:
      'We reserve the right to suspend or terminate your account under certain conditions.',
    icon: Ban,
    items: [
      {
        number: '4.1',
        text: 'We may terminate your account immediately if you violate these Terms and Conditions.',
      },
      {
        number: '4.2',
        text: 'You may request account deletion at any time via Settings > Account > Delete Account.',
      },
      {
        number: '4.3',
        text: 'Upon termination, your data will be retained for 30 days before being permanently deleted from our systems.',
      },
    ],
  },
  {
    id: 'governing-law',
    sectionNumber: 5,
    title: 'Governing Law',
    description:
      'These Terms and Conditions are governed by and construed in accordance with applicable laws.',
    icon: BookOpen,
    items: [
      {
        number: '5.1',
        text: 'Any disputes arising from the use of this service will first be resolved through good-faith mediation between both parties.',
      },
      {
        number: '5.2',
        text: 'If mediation fails, disputes will be submitted to the competent court in the jurisdiction where Spendly operates.',
      },
    ],
  },
];

const BANNER_AFTER_INDEX = 1;

export default function TncPage() {
  return (
    <div className="space-y-12 container px-5 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-10 xl:py-12">
      <TncHeader />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <TncTableOfContents />
        </div>

        {/* Sections */}
        <div className="space-y-8 lg:col-span-3">
          {sections.map((section, index) => (
            <>
              <TncSection key={section.id} {...section} />
              {index === BANNER_AFTER_INDEX && <TncImageBanner key="banner" />}
            </>
          ))}

          <TncCTA />
        </div>
      </div>
    </div>
  );
}
