import FlatsProvider from "@/components/flats-context";
import prisma from "@/prisma/prisma";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Рента - мониторинг квартир",
  description: "Приложение для отслеживания состояния квартир в п. Новая Чара",
};

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
        <div className="grid grid-rows-[auto_1fr_auto] gap-3 bg-gray-100 min-h-screen">
          <header className="flex items-center shadow-lg justify-between p-4 text-slate-200 bg-slate-700 tracking-wide">
            <Link href="/">
              <h1 className="text-2xl font-bold">Квартиры</h1>
            </Link>
            <Link href="settings">
              <IoSettingsSharp size="30px" />
            </Link>
          </header>
          <FlatsProvider props={{ flats }}>
            <div>{children}</div>
          </FlatsProvider>
          <footer className="bg-slate-700 text-slate-200">footer</footer>
        </div>
      </body>
    </html>
  );
}
