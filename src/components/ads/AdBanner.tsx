import { useEffect, useRef, Component, type ReactNode } from 'react';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle';

interface AdBannerProps {
  /** AdSense ad slot ID */
  slot: string;
  /** Ad format layout */
  format?: AdFormat;
  /** Whether the ad should be responsive */
  responsive?: boolean;
  /** Additional CSS class for the container */
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AD_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as
  | string
  | undefined;

/** Error boundary to prevent ad errors from crashing the app */
class AdErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('AdBanner error caught:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const AdBannerInner = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (!AD_CLIENT_ID || isAdPushed.current) return;

    // Load AdSense script dynamically (once globally)
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onerror = () => {
        console.warn(
          'AdSense script failed to load (ad blocker or not approved yet)'
        );
      };
      document.head.appendChild(script);
    }

    // Delay push to give script time to load
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch {
        // Silently fail — ad won't show but app won't crash
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!AD_CLIENT_ID) {
    return null;
  }

  return (
    <div
      className={`ad-container overflow-hidden text-center ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

const AdBanner = (props: AdBannerProps) => {
  return (
    <AdErrorBoundary>
      <AdBannerInner {...props} />
    </AdErrorBoundary>
  );
};

export default AdBanner;
