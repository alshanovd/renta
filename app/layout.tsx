import FlatsProvider from "@/components/flats-context";
import prisma from "@/prisma/prisma";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import "./globals.css";
import { format } from "@formkit/tempo";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Рента - мониторинг квартир",
  description: "Приложение для отслеживания состояния квартир в п. Новая Чара",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flats = await prisma.flat.findMany({
    include: {
      bookings: {
        orderBy: { movedInAt: "desc" },
        take: 10,
      },
    },
    orderBy: { id: "desc" },
  });
  return (
    <html lang="en">
      <body className={inter.className + " bg-white"}>
        <div className="grid grid-rows-[1fr_auto] gap-3 bg-gray-100 min-h-screen pt-[75px]">
          <header className="flex items-center fixed top-0 w-full shadow-lg justify-between p-4 text-slate-200 bg-slate-700 tracking-wide">
            <Link href="/">
              <h1 className="text-2xl font-bold">Квартиры</h1>
            </Link>
            <span className="uppercase tracking-widest font-bold">
              {format(new Date(), "D MMMM", "ru")}
            </span>
          </header>
          <FlatsProvider props={{ flats }}>
            <div>{children}</div>
          </FlatsProvider>
          <footer className="bg-slate-700 text-slate-200 flex justify-end py-2 px-2">
            <Link href="settings">
              <IoSettingsSharp size="30px" />
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
