interface AuthDividerProps {
  label?: string;
}

const AuthDivider = ({ label = 'Or' }: AuthDividerProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default AuthDivider;