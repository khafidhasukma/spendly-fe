import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Is Spendly really free?',
    a: 'Yes, Spendly is free to use with no time limit. All core features including receipt scanning, budget tracking, and AI analysis are available at no cost.',
  },
  {
    q: 'How does receipt scanning work?',
    a: 'Simply take a photo of your receipt. Our AI reads and extracts details like merchant name, total amount, and individual items automatically.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Data security is our top priority. All data is encrypted and stored to the highest security standards. Only you can access your financial information.',
  },
  {
    q: 'Can I use it on both mobile and desktop?',
    a: 'Spendly is a fully responsive web app, accessible from any browser on smartphones, tablets, or laptops.',
  },
  {
    q: 'How does the AI generate recommendations?',
    a: 'The AI analyzes your spending patterns over several months, identifies categories that can be optimized, and provides specific, actionable suggestions.',
  },
  {
    q: 'Can I access my transaction history?',
    a: 'Yes, you can view your full transaction history at any time through the History page in your dashboard.',
  },
];

const FAQSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="faq" className="relative py-10 sm:py-20 lg:py-28 bg-background">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-14" data-animate>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FAQ</p>
          <h2 className="text-2xl font-bold text-foreground font-manrope sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto" data-animate>
          <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-2xl border border-border bg-card px-5 sm:px-6">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground sm:text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
