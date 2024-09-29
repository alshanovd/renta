import { SyntheticEvent } from "react";

export const ButtonStyles = {
  base: "flex items-center justify-center text-slate-800 border border-slate-700  py-2 px-4 rounded-md shadow-md transition-all duration-300 ",
  disabled: "opacity-50 cursor-not-allowed bg-slate-200",
  enabled: "bg-gradient-to-b from-slate-100 to-slate-300 active:shadow-inner",
};

export default function Button({
  onClick,
  children,
  disabled,
  className,
  type,
}: {
  onClick?: (e: SyntheticEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const disabledClass = disabled ? ButtonStyles.disabled : ButtonStyles.enabled;
  return (
    <button
      disabled={disabled}
      onClick={onClick ?? (() => {})}
      type={type || "button"}
      className={ButtonStyles.base + disabledClass + " " + className}
    >
      {children}
    </button>
  );
}
