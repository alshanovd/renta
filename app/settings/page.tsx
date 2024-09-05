import RenameFlat from "@/components/rename-flat";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default async function SettingsPage() {
  // const pathname = usePathname();
  const dbFlats = await prisma.flat.findMany();
  return (
    <>
      <div className="text-slate-800 mx-4">
        <h1 className="text-xl mb-4 text-center font-bold">Настройки</h1>
        {dbFlats.map((flat) => (
          <RenameFlat flat={flat} key={flat.id} />
        ))}
      </div>
      <div className="flex justify-center text-slate-900">
        <Link href="new-flat">Новая квартира</Link>
      </div>
    </>
  );
}
