import { SyntheticEvent } from "react";

export default function Button({
  onClick,
  children,
}: {
  onClick: (e: SyntheticEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-slate-800 border border-slate-700 bg-gradient-to-b from-slate-100 to-slate-300 py-2 px-4 rounded-md shadow-md active:shadow-inner"
    >
      {children}
    </button>
  );
}
