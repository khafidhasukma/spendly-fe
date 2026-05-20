interface Step {
  num: string;
  label: string;
}

interface AuthStepIndicatorProps {
  steps: Step[];
  currentStep?: number;
}

const AuthStepIndicator = ({
  steps,
  currentStep = 0,
}: AuthStepIndicatorProps) => {
  return (
    <div className="flex items-start">
      {steps.map(({ num, label }, i) => (
        <div key={num} className="flex items-center">
          {i > 0 && (
            <div className="mx-2 mt-3.5 h-px w-8 self-start bg-border" />
          )}
          <div className="flex flex-col items-center">
            <div
              className={[
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                i === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : i < currentStep
                    ? 'bg-primary/30 text-primary-foreground'
                    : 'border border-border text-muted-foreground',
              ].join(' ')}
            >
              {num}
            </div>
            <span
              className={[
                'mt-1 text-[10px] font-semibold',
                i === currentStep ? 'text-foreground' : 'text-muted-foreground',
              ].join(' ')}
            >
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthStepIndicator;