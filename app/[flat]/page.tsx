"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function Flat({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  return (
    <div className="grid h-screen text-slate-800 text-xl">{params.flat}</div>
  );
}
