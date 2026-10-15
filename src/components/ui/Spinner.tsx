type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export const Spinner = ({ size = "md", label }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center gap-3 text-[var(--muted)]">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-[var(--border-strong)] border-t-[var(--primary)]`}
      />

      {label && <p className="text-sm">{label}</p>}
    </div>
  );
};
