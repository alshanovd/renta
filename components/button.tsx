import { SyntheticEvent } from "react";

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
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed bg-slate-200"
    : "bg-gradient-to-b from-slate-100 to-slate-300 active:shadow-inner";
  return (
    <button
      disabled={disabled}
      onClick={onClick ?? (() => {})}
      type={type || "button"}
      className={
        "flex items-center justify-center text-slate-800 border border-slate-700  py-2 px-4 rounded-md shadow-md transition-all duration-300 " +
        disabledClass +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}
