import { Link } from 'react-router-dom';

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
];

const ContactFAQ = () => {
  return (
    <section id="faq" className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-foreground font-manrope">Frequently Asked Questions</h2>
        <Link to="/faq" className="text-base font-semibold text-primary hover:underline">
          View All →
        </Link>
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
};

export default ContactFAQ;