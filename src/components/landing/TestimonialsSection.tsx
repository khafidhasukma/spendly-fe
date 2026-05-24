import { Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

const row1: Testimonial[] = [
  { name: 'Rina Sari', role: 'Freelance Designer', avatar: 'RS', text: "Since using Spendly, I'm much more aware of where my money goes. The receipt scanner is a game changer!", rating: 5 },
  { name: 'Budi Hartono', role: 'Software Engineer', avatar: 'BH', text: "The AI analysis is spot on. I've saved nearly Rp1M per month just by following Spendly's recommendations.", rating: 5 },
  { name: 'Dewi Anggraini', role: 'Marketing Manager', avatar: 'DA', text: 'The dashboard is clean and easy to understand. Perfect for anyone just starting to track their finances.', rating: 4 },
  { name: 'Andi Prasetyo', role: 'Student', avatar: 'AP', text: "Budget tracking keeps me from overspending. Highly recommended for anyone on a tight budget!", rating: 5 },
  { name: 'Siti Nurhaliza', role: 'Accountant', avatar: 'SN', text: 'As an accountant, I really appreciate the detailed categories and reports. Very well designed.', rating: 5 },
];

const row2: Testimonial[] = [
  { name: 'Fajar Ramadhan', role: 'Entrepreneur', avatar: 'FR', text: 'Spendly helps me separate personal and business finances effortlessly. Simple yet powerful.', rating: 5 },
  { name: 'Maya Putri', role: 'Content Creator', avatar: 'MP', text: "Finally found an app that isn't complicated. Snap a receipt and it's recorded instantly.", rating: 5 },
  { name: 'Rizky Aditya', role: 'Product Manager', avatar: 'RA', text: "The spending forecast is surprisingly accurate. It helps me plan my budget way better.", rating: 4 },
  { name: 'Lina Kusuma', role: 'Teacher', avatar: 'LK', text: "My salary is limited, but Spendly helps me manage it so I can still save every month.", rating: 5 },
  { name: 'Hendra Wijaya', role: 'Data Analyst', avatar: 'HW', text: 'Great charts and visualizations. I can see my spending patterns without exporting to Excel.', rating: 5 },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="w-72 sm:w-80 shrink-0 rounded-2xl bg-on-primary/10 backdrop-blur-sm p-4 sm:p-5 mx-2 sm:mx-3">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-on-primary/15 text-[10px] sm:text-xs font-bold text-on-primary">
        {t.avatar}
      </div>
      <div>
        <p className="text-xs sm:text-sm font-semibold text-on-primary">{t.name}</p>
        <p className="text-[10px] sm:text-[11px] text-on-primary/60">{t.role}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-2 sm:mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-on-primary/20'}`} />
      ))}
    </div>
    <p className="text-xs sm:text-sm leading-relaxed text-on-primary/80">{t.text}</p>
  </div>
);

const TestimonialsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="testimonials" className="relative py-10 sm:py-24 lg:py-28 overflow-hidden bg-primary">
      <div ref={sectionRef} className="mb-10 sm:mb-14 lg:mb-16 mx-auto max-w-6xl px-5 sm:px-8" data-animate>
        <div className="text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-on-primary/60 mb-2 sm:mb-3">Testimonials</p>
          <h2 className="text-xl sm:text-2xl font-bold text-on-primary font-manrope lg:text-3xl">
            Trusted by Thousands of Users
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-on-primary/60 max-w-lg mx-auto">
            See what people are saying about their experience with Spendly.
          </p>
        </div>
      </div>

      <div className="relative mb-4 sm:mb-6">
        <div className="flex animate-marquee-right">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-marquee-left">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-linear-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-linear-to-l from-primary to-transparent" />
    </section>
  );
};

export default TestimonialsSection;
