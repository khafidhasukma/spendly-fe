import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PrivacyCTA() {
  return (
    <div className="border-t border-border p-10 text-center">
      <p className="text-base text-muted-foreground">
        Have more questions about our privacy policy?
      </p>
      <div className="mt-3 flex justify-center">
        <Button asChild className="h-auto rounded-full px-8! py-3 text-base">
          <Link to="/hubungi-kami">
            Contact Privacy Team
          </Link>
        </Button>
      </div>
    </div>
  );
}
