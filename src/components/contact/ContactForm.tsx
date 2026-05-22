import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TOPICS = [
  { value: 'transaction', label: 'Transaction Issue' },
  { value: 'account', label: 'Account & Security' },
  { value: 'subscription', label: 'Subscription & Billing' },
  { value: 'feature', label: 'Feature Question' },
  { value: 'other', label: 'Other' },
];

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <div className="rounded-2xl bg-card p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-border h-full">
      <h2 className="text-base sm:text-lg font-semibold text-primary">Send a Message</h2>
      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 md:mb-10">
        Fill in the form below and our team will get back to you shortly.
      </p>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Send className="h-6 w-6 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground">Message Sent!</p>
          <p className="text-sm text-muted-foreground">
            Our team will reach out to you within 2 business hours.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setSent(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Full Name</Label>
              <Input
                id="contact-name"
                placeholder="Enter your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email Address</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Subject select */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-subject">Support Topic</Label>
            <Select required>
              <SelectTrigger id="contact-subject" className="w-full">
                <SelectValue placeholder="Select a topic..." />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message textarea */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Describe your issue or question in detail..."
              className="min-h-32 resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base h-auto py-3 sm:py-4 font-semibold"
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                Send Message Now
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting this form, you agree to our{' '}
            <a href="#" className="underline underline-offset-2 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;