import { Card, CardContent } from '@/components/ui/card';

const PrivacyIntro = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4 sm:p-5 md:p-6">
        <h2 className="mb-2 sm:mb-3 font-manrope text-xl sm:text-2xl font-semibold text-primary">Introduction</h2>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          Spendly is committed to protecting every user's privacy. We recognize that financial data
          is highly sensitive information. Therefore, we apply the highest security standards to
          maintain your trust. By using our services, you agree to the practices described in this
          policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivacyIntro;