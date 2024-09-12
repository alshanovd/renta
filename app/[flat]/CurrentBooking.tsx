import { days } from "@/tools/days";
import { addDay, diffDays, format } from "@formkit/tempo";
import { Booking } from "@prisma/client";
import React from "react";
import { FaTrash } from "react-icons/fa";

const Bold = ({ text }: { text: string }) => (
  <span className="font-bold">{text}</span>
);

export default function CurrentBooking({
  booking,
  deleteBooking,
}: {
  booking: Booking;
  deleteBooking: (booking: Booking) => void;
}) {
  const until = format(
    addDay(booking.movedInAt, booking.duration),
    "medium",
    "ru"
  );
  const freeIn = diffDays(
    addDay(booking.movedInAt, booking.duration + 1),
    new Date()
  );
  return (
    <div>
      <div className="grid grid-cols-2">
        <p className="text-right mr-4">Сейчас живут: </p>{" "}
        <Bold text={booking?.company} />
        <p className="text-right mr-4">Заехали:</p>
        <Bold text={format(booking.movedInAt, "medium", "ru")} />
        <p className="text-right mr-4">На: </p>
        <Bold text={booking.duration + " " + days(booking.duration)} />
        <p className="text-right mr-4">До:</p>
        <Bold text={until} />
        <p className="text-right mr-4">Свободна через:</p>
        <Bold text={freeIn + " " + days(freeIn)} />
      </div>
      <div className="flex mt-2 items-center justify-end">
        Удалить эту бронь
        <FaTrash
          size={20}
          className="text-red-700 ml-4"
          onClick={() => deleteBooking(booking)}
        />
      </div>
    </div>
  );
}
