import { addDay, format } from "@formkit/tempo";
import { Booking } from "@prisma/client";
import React from "react";

export default function FlatStatus({
  busy,
  lastBooking,
}: Readonly<{ busy: boolean; lastBooking?: Booking }>) {
  let until = "";
  if (lastBooking) {
    until = format(
      addDay(lastBooking.movedInAt, lastBooking.duration),
      "medium",
      "ru"
    );
  } else {
    until = "Неизвестно";
  }
  return (
    <div className="text-base font-normal">
      {lastBooking ? (
        busy ? (
          <>
            <p>Занята: {lastBooking.company}</p>
            <p>До {until}</p>
          </>
        ) : (
          <>
            <p>Свободна с {until}</p>
          </>
        )
      ) : (
        <p>Нет бронирований</p>
      )}
    </div>
  );
}
