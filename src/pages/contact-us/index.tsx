import {
  ContactChannels,
  ContactFAQ,
  ContactForm,
  ContactImageBanner,
} from '@/components/contact';
import PageHeader from '@/components/ui/page-header';

const ContactUsPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 sm:py-14 lg:py-16 space-y-8 sm:space-y-10 md:space-y-12">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-5 lg:items-stretch">
        {/* hero + channels + image */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:col-span-2">
          <PageHeader
            title="We're here to help."
            description="Have a question about your Spendly transactions or account? Our support team is available 24/7 to keep your financial management running smoothly."
          />
          <ContactChannels />
          <ContactImageBanner />
        </div>

        {/* contact form */}
        <div className="lg:col-span-3 flex flex-col">
          <ContactForm />
        </div>
      </div>

      {/* FAQ section */}
      <ContactFAQ />
    </div>
  );
};

export default ContactUsPage;