export function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-slate-600">
      {children}
    </div>
  );
}
