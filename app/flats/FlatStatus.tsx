import { Booking } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";

export default function FlatStatus({
  busy,
  lastBooking,
}: Readonly<{ busy: boolean; lastBooking?: Booking }>) {
  let until = "";
  if (lastBooking) {
    until = moment(lastBooking.movedInAt)
      .add(lastBooking.duration, "days")
      .format("D MMM YYYY");
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
