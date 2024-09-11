import { addDay, diffDays, format } from "@formkit/tempo";
import { Booking } from "@prisma/client";
import React from "react";

const Bold = ({ text }: { text: string }) => (
  <span className="font-bold">{text}</span>
);

export default function CurrentBooking({ booking }: { booking: Booking }) {
  const until = format(
    addDay(booking.movedInAt, booking.duration),
    "medium",
    "ru"
  );
  return (
    <div>
      <div className="grid grid-cols-2">
        <p className="text-right mr-4">Сейчас живут: </p>{" "}
        <Bold text={booking?.company} />
        <p className="text-right mr-4">Заехали:</p>
        <Bold text={format(booking.movedInAt, "medium", "ru")} />
        <p className="text-right mr-4">Кол-во дней:</p>
        <Bold text={booking.duration + ""} />
        <p className="text-right mr-4">До:</p>
        <Bold text={until} />
        <p className="text-right mr-4">Свободна через:</p>
        <Bold
          text={
            diffDays(addDay(booking.movedInAt, booking.duration), new Date()) +
            1 +
            " дня"
          }
        />
      </div>
    </div>
  );
}
