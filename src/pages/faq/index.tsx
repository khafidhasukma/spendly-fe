import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/ui/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQCategory } from '@/types';

const faqData: FAQCategory[] = [
  {
    category: 'Account & Security',
    items: [
      {
        question: 'How do I change my PIN?',
        answer:
          'Go to Settings > Security > Change PIN to update your account access code. You will need to verify your current PIN before setting a new one.',
      },
      {
        question: 'How do I enable two-factor authentication?',
        answer:
          'Navigate to Profile > Security > Two-Factor Authentication and follow the setup steps. We support authenticator apps and SMS verification.',
      },
      {
        question: 'What happens if I forget my password?',
        answer:
          'On the login screen, tap "Forgot Password" and enter your registered email address. You will receive a password reset link within a few minutes.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'Go to Profile > Settings > Account > Delete Account. Please note that this action is permanent and all your data will be removed within 30 days.',
      },
    ],
  },
  {
    category: 'Transactions & Payments',
    items: [
      {
        question: 'My transaction failed — what should I do?',
        answer:
          'Make sure your internet connection is stable and your balance is sufficient. If the issue persists, try again after a few minutes or contact our support team.',
      },
      {
        question: 'How do I add a manual transaction?',
        answer:
          'On the Dashboard, tap the "+" button and select "Add Transaction". Fill in the amount, category, and date, then confirm to save.',
      },
      {
        question: 'Can I edit or delete a past transaction?',
        answer:
          'Yes. Go to History, find the transaction you want to edit, and tap the pencil icon. To delete, swipe left on the transaction or use the three-dot menu.',
      },
      {
        question: 'How do I scan a receipt?',
        answer:
          'Tap "Scan" in the navigation bar, point your camera at the receipt, and tap the capture button. Spendly will automatically extract the items and total.',
      },
    ],
  },
  {
    category: 'Pricing & Plans',
    items: [
      {
        question: 'How much does Spendly cost?',
        answer:
          'Spendly Basic is completely free and includes core budgeting features. Our Premium plan starts at $2.99 per month and unlocks AI insights, unlimited history, and cloud sync.',
      },
      {
        question: 'Is there a free trial for Premium?',
        answer:
          'Yes! New users get a 14-day free trial of Spendly Premium with no credit card required. You can cancel at any time before the trial ends.',
      },
      {
        question: 'How do I cancel my subscription?',
        answer:
          'Go to Profile > Settings > Subscription > Cancel Plan. Your Premium access will remain active until the end of your current billing period.',
      },
    ],
  },
  {
    category: 'AI Analysis & Insights',
    items: [
      {
        question: 'How does the AI analysis work?',
        answer:
          "Spendly's AI analyses your spending patterns over time and surfaces personalized insights — such as spending trends, anomalies, and saving opportunities — directly on your dashboard.",
      },
      {
        question: 'Is my financial data used to train AI models?',
        answer:
          'No. Your personal financial data is never used to train third-party AI models. All analysis is performed in an anonymized and aggregated manner on our secure servers.',
      },
      {
        question: 'How accurate is the receipt scanning?',
        answer:
          'Our OCR engine achieves over 95% accuracy on clear, well-lit receipts. For best results, ensure the receipt is flat and fully in frame before capturing.',
      },
    ],
  },
  {
    category: 'Data & Privacy',
    items: [
      {
        question: 'How is my data protected?',
        answer:
          'We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is ISO 27001 certified and audited annually.',
      },
      {
        question: 'Can I export my data?',
        answer:
          'Yes. Go to Profile > Settings > Export Data to download a full CSV or PDF report of your transaction history at any time.',
      },
      {
        question: 'Does Spendly sell my data?',
        answer:
          'Never. We do not sell, rent, or share your personal data with third parties for marketing purposes. Please read our full Privacy Policy for details.',
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 sm:py-14 lg:py-16 space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <Badge variant="secondary-surface" className="text-xs">
          Support
        </Badge>
        <PageHeader
          title="Frequently Asked Questions"
          description="Browse answers to the most common questions about Spendly. Can't find what you're looking for? Reach out to our support team."
        />
      </div>

      {/* FAQ categories */}
      <div className="space-y-5 sm:space-y-6 md:space-y-8">
        {faqData.map(({ category, items }) => (
          <div key={category} className="space-y-2 sm:space-y-3">
            <h2 className="font-manrope text-base sm:text-lg font-semibold text-primary">{category}</h2>

            <div className="rounded-xl sm:rounded-2xl border border-border bg-card px-4 sm:px-6">
              <Accordion type="single" collapsible className="w-full">
                {items.map(({ question, answer }, idx) => (
                  <AccordionItem key={question} value={`${category}-${idx}`}>
                    <AccordionTrigger className="text-xs sm:text-sm font-medium text-foreground hover:no-underline font-manrope cursor-pointer py-3 sm:py-4">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-3 sm:pb-4">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>

      {/* Still need help CTA */}
      <div className="rounded-xl sm:rounded-2xl border-3 border-dashed border-secondary/30 bg-secondary/10 p-5 sm:p-6 md:p-8 text-center">
        <p className="font-manrope text-lg sm:text-xl capitalize font-semibold text-foreground">
          Still have questions?
        </p>
        <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          Our support team is available 24/7 and typically responds within a few hours.
        </p>
        <Link
          to="/contact-us"
          className="mt-4 sm:mt-5 inline-flex h-auto items-center justify-center rounded-[0.75rem] bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;
