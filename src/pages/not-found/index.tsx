import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks';

const NotFoundPage = () => {
  usePageTitle('Page Not Found');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center sm:max-w-lg">
        {/* Icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 sm:size-24">
          <SearchX className="size-10 text-primary sm:size-12" />
        </div>

        {/* 404 text */}
        <h1 className="mt-6 text-7xl font-bold text-primary font-manrope sm:mt-8 sm:text-8xl lg:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-xl font-semibold text-foreground font-manrope sm:text-2xl lg:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            <Home className="size-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
