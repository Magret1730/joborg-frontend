import { MdWork } from "react-icons/md";

type AppLogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: {
    box: "h-8 w-8",
    icon: 18,
    text: "text-base",
    // dot: "h-2 w-2",
  },
  md: {
    box: "h-10 w-10",
    icon: 22,
    text: "text-lg",
    // dot: "h-2.5 w-2.5",
  },
  lg: {
    box: "h-12 w-12",
    icon: 26,
    text: "text-xl",
    // dot: "h-3 w-3",
  },
};

export const AppLogo = ({ showText = true, size = "md" }: AppLogoProps) => {
  const styles = sizeClasses[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative flex ${styles.box} items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-soft)] text-[var(--primary)]`}
      >
        <MdWork size={styles.icon} />

        {/* <span
          className={`absolute -right-0.5 -top-0.5 ${styles.dot} rounded-full border-2 border-[var(--surface)] bg-[var(--accent)]`}
        /> */}
      </div>

      {showText && (
        <span className={`${styles.text} font-semibold text-[var(--text)]`}>
          Joborg
        </span>
      )}
    </div>
  );
};