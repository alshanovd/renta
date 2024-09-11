import { addDay, diffDays } from "@formkit/tempo";
import { Booking, Flat } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function FlatButton({
  flat,
  lastBooking,
  busy,
}: Readonly<{ flat: Flat; lastBooking: Booking; busy: boolean }>) {
  const color = busy ? "text-green-700" : "text-red-700";
  return (
    <>
      {busy ? (
        <div className={color}>
          {diffDays(
            addDay(lastBooking.movedInAt, lastBooking.duration + 1),
            new Date()
          )}{" "}
          дней
        </div>
      ) : (
        <div className={color}> Свободна </div>
      )}
      <Link
        className="border py-2 px-4 w-16 rounded-md bg-gradient-to-b text-center from-slate-100 to-slate-300 shadow-md active:shadow-inner"
        href={`/${flat.id}`}
      >
        🏠
      </Link>
    </>
  );
}
