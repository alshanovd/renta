export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-slate-800 border border-slate-700 bg-gradient-to-b from-slate-100 to-slate-300 py-2 px-4 rounded-md shadow-md active:shadow-inner"
    >
      {children}
    </button>
  );
}
