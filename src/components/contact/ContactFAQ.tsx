interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I change my PIN?',
    answer:
      'Go to Settings > Security > Change PIN to update your account access code.',
  },
  {
    question: 'My transaction failed?',
    answer:
      'Make sure your internet connection is stable and your balance is sufficient before retrying.',
  },
  {
    question: 'How much does Spendly cost?',
    answer:
      'Spendly Basic is completely free. Our Premium plan starts at $2.99 per month.',
  },
  {
    question: 'How do I export my transaction data?',
    answer:
      'Open the History menu, tap the export icon in the top-right corner, then choose PDF or CSV format.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, all data is encrypted with AES-256 standard and stored on high-security servers.',
  },
  {
    question: 'How do I link a bank account?',
    answer:
      'Go to Profile > Budget Settings > Add Account, then follow the connection guide provided.',
  },
];

export default function ContactFAQ() {
  return (
    <section id="faq" className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-foreground font-manrope">Frequently Asked Questions</h2>
        <a href="#" className="text-base font-semibold text-primary hover:underline">
          View All →
        </a>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faqs.map(({ question, answer }) => (
          <div
            key={question}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <p className="font-manrope text-foreground">{question}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
