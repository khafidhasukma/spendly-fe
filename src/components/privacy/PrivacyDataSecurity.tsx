import { ShieldCheck, Lock, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const securityBadges = [
  { icon: Lock, label: 'End-to-End Encryption' },
  { icon: ShieldCheck, label: 'Multi-Factor Auth' },
  { icon: Globe, label: 'ISO 27001 Certified' },
];

const PrivacyDataSecurity = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4 sm:p-5 md:p-6">
        {/* Section heading */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-manrope text-xl sm:text-2xl font-semibold text-primary">Data Security</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Security is Spendly's foundation. We use banking-grade encryption technology (AES-256) to protect your
              data both in transit and at rest on our servers.
            </p>

            {/* Security badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
              {securityBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-row sm:flex-col items-center gap-2 sm:gap-2 rounded-[0.75rem] border border-muted bg-muted p-2.5 sm:p-3">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyDataSecurity;