import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PrivacyCTA = () => {
  return (
    <div className="border-t border-border p-5 sm:p-8 md:p-10 text-center">
      <p className="text-sm sm:text-base text-muted-foreground">
        Have more questions about our privacy policy?
      </p>
      <div className="mt-3 flex justify-center">
        <Button asChild className="h-auto rounded-full px-6! sm:px-8! py-2.5 sm:py-3 text-sm sm:text-base">
          <Link to="/contact-us">
            Contact Privacy Team
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PrivacyCTA;