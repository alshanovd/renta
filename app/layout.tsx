import FlatsProvider from "@/components/flats-context";
import prisma from "@/prisma/prisma";
import moment from "moment";
import "moment/locale/ru";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import "./globals.css";
import { FaDollarSign } from "react-icons/fa6";

const inter = Inter({ subsets: ["cyrillic"] });
moment.locale("ru");

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
      llPayments: {
        orderBy: { paidAt: "desc" },
        take: 10,
      },
    },
    orderBy: { id: "desc" },
  });
  return (
    <html lang="en">
      <body className={inter.className + " bg-white"}>
        <div className="grid grid-rows-[1fr_auto] gap-3 bg-gray-100 min-h-screen pt-[75px]">
          <header className="flex z-10 items-center fixed top-0 w-full shadow-lg justify-between p-4 text-slate-200 bg-slate-700 tracking-wide">
            <Link href="/">
              <h1 className="text-2xl font-bold">Квартиры</h1>
            </Link>
            <span className="uppercase tracking-widest font-bold">
              {moment().format("D MMMM")}
            </span>
          </header>
          <FlatsProvider props={{ flats }}>
            <div>{children}</div>
          </FlatsProvider>
          <footer className="bg-slate-700 text-slate-200 flex justify-between py-2 px-2">
            <Link href="/payments">
              <FaDollarSign size="30px" />
            </Link>
            <Link href="/settings">
              <IoSettingsSharp size="30px" />
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
