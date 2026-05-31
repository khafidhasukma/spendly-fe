import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TncCTA = () => {
  return (
    <div className="rounded-2xl border-3 border-dashed border-secondary/30 p-5 sm:p-6 md:p-8 text-center bg-secondary/10">
      <h2 className="font-manrope text-lg sm:text-xl md:text-2xl font-semibold text-primary">Need Further Explanation?</h2>
      <p className="mx-auto mt-2 sm:mt-3 md:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
        We understand that legal documents can be confusing. Our support team is ready to help
        clarify each point transparently.
      </p>
      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
        <Button asChild className='font-semibold px-6! sm:px-8! py-2.5 sm:py-3 h-auto text-sm sm:text-base rounded-[0.75rem] w-full sm:w-auto'>
          <Link to="/contact-us">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TncCTA;
