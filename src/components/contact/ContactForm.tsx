import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
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
import { Link } from 'react-router-dom';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
const TO_EMAIL    = import.meta.env.VITE_EMAIL_TO  as string;

const TOPICS = [
  { value: 'Transaction Issue', label: 'Transaction Issue' },
  { value: 'Account & Security', label: 'Account & Security' },
  { value: 'Subscription & Billing', label: 'Subscription & Billing' },
  { value: 'Feature Question', label: 'Feature Question' },
  { value: 'Other', label: 'Other' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Enter a valid email address';
  if (!topic) errors.topic = 'Please select a topic';
  if (!message.trim()) errors.message = 'Message is required';
  else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, topic: true, message: true });
    if (!isValid || !formRef.current) return;

    setLoading(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      toast.success('Message sent successfully');
      setName('');
      setEmail('');
      setTopic('');
      setMessage('');
      setTouched({});
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-card p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-border h-full">
      <h2 className="text-base sm:text-lg font-semibold text-primary">Send a Message</h2>
      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 md:mb-10">
        Fill in the form below and our team will get back to you shortly.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        <input type="hidden" name="to_email" value={TO_EMAIL} />
        <input type="hidden" name="title" value={topic} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">Full Name</Label>
            <Input
              id="contact-name"
              name="from_name"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markTouched('name')}
              className={touched.name && errors.name ? 'border-destructive' : ''}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-email">Email Address</Label>
            <Input
              id="contact-email"
              name="from_email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched('email')}
              className={touched.email && errors.email ? 'border-destructive' : ''}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-subject">Support Topic</Label>
          <Select
            value={topic}
            onValueChange={(v) => { setTopic(v); markTouched('topic'); }}
          >
            <SelectTrigger
              id="contact-subject"
              className={`w-full ${touched.topic && errors.topic ? 'border-destructive' : ''}`}
            >
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
          {touched.topic && errors.topic && (
            <p className="text-xs text-destructive">{errors.topic}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Describe your issue or question in detail..."
            className={`min-h-32 resize-none ${touched.message && errors.message ? 'border-destructive' : ''}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => markTouched('message')}
          />
          {touched.message && errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
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
          <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
