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
      <CardContent className="p-6">
        {/* Section heading */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-manrope text-2xl font-semibold text-primary">Data Security</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Security is Spendly's foundation. We use banking-grade encryption technology (AES-256) to protect your
              data both in transit and at rest on our servers.
            </p>

            {/* Security badges */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {securityBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-[0.75rem] border border-muted bg-muted p-3">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PrivacyDataSecurity;