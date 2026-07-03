import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function IconButton({ children, label, onClick, disabled = false, className = "" }: Props) {
  return (
    <button
      type="button"
      className={`iconButton ${className}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
