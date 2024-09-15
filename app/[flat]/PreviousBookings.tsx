import { FrontendFlat } from "@/models/flat";
import { Booking } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { FaTrash } from "react-icons/fa";

export default function PreviousBookings({
  flat,
  deleteBooking,
}: {
  flat?: FrontendFlat;
  deleteBooking: (booking: Booking) => void;
}) {
  let showed = (flat?.currentBooking ? 1 : 0) + (flat?.nextBooking ? 1 : 0);

  return (
    <div>
      {flat?.bookings && flat?.bookings.length > showed ? (
        <div className="mt-6">
          <h2 className="text-lg">Прошлые жильцы</h2>
          <ul className="text-base text-green-800 font-semibold">
            {flat?.bookings.map((booking, i) => {
              if (
                flat.currentBooking === booking ||
                flat.nextBooking === booking
              ) {
                return "";
              }
              return (
                <li className="flex justify-between my-3" key={booking.id}>
                  <div>
                    {booking.company}:{" "}
                    {moment(booking.movedInAt).format("D MMM")} -{" "}
                    {moment(booking.moveOutAt).format("D MMM")}
                  </div>
                  <FaTrash
                    onClick={() => deleteBooking(booking)}
                    className="ml-2 text-red-700"
                    size={20}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-red-700 mt-5">Нет прошлых бронирований</p>
      )}
    </div>
  );
}
