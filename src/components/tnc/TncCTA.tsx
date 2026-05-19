import { Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TncCTA = () => {
  return (
    <div className="rounded-2xl border-3 border-dashed border-secondary/30 p-8 text-center bg-secondary/10">
      <h2 className="font-manrope text-2xl font-semibold text-primary">Need Further Explanation?</h2>
      <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
        We understand that legal documents can be confusing. Our support team is ready to help
        clarify each point transparently.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button asChild className='font-semibold px-8! py-3 h-auto text-base rounded-[0.75rem]'>
          <Link to="/contact-us">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </Button>
        <Button variant="outline" className='bg-transparent font-semibold px-8! py-3 h-auto text-base rounded-[0.75rem]'>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}

export default TncCTA;
