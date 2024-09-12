import { days } from "@/tools/days";
import { Booking } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
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
  const until = moment(booking.movedInAt)
    .add(booking.duration, "days")
    .format("D MMM YYYY");
  const movedIn = moment(booking.movedInAt).format("D MMM YYYY");
  const freeIn = moment(booking.movedInAt)
    .add(booking.duration, "days")
    .diff(moment(), "days");

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-1">
        <p className="text-right mr-4">Сейчас живут: </p>{" "}
        <Bold text={booking?.company} />
        <p className="text-right mr-4">Заехали:</p>
        <Bold text={movedIn} />
        <p className="text-right mr-4">Длительность: </p>
        <Bold text={booking.duration + " " + days(booking.duration)} />
        <p className="text-right mr-4">До:</p>
        <Bold text={until} />
        <p className="text-right mr-4">Выезжают:</p>
        <Bold text={"через " + freeIn + " " + days(freeIn)} />
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
