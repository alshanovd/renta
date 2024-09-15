import { FrontendBooking } from "@/models/flat";
import moment from "moment";
import React from "react";
import { days } from "@/tools/days";
import { FaTrash } from "react-icons/fa";

export default function NextBooking({
  booking,
  deleteBooking,
}: {
  booking: FrontendBooking;
  deleteBooking: (booking: FrontendBooking) => void;
}) {
  const moveInIn = moment(booking.movedInAt).diff(
    moment().startOf("day"),
    "days"
  );
  return (
    <div className="mt-4">
      <h2 className="text-green-700 text-center">
        Следующий заезд через{" "}
        <span className="font-bold">{moveInIn + " " + days(moveInIn)}</span>
      </h2>
      <p className="text-center">
        {moment(booking.movedInAt).format("D MMMM")} -{" "}
        {moment(booking.moveOutAt).format("D MMMM")}
      </p>
      <p className="font-bold text-center">{booking.company}</p>

      <div className="flex mt-2 items-center justify-end">
        Удалить бронь
        <FaTrash
          size={20}
          className="text-red-700 ml-2"
          onClick={() => deleteBooking(booking)}
        />
      </div>
    </div>
  );
}
