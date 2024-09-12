import { Flat } from "@/models/flat";
import { days } from "@/tools/days";
import { Booking } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { FaTrash } from "react-icons/fa";

export default function PreviousBookings({
  flat,
  busy,
  deleteBooking,
}: {
  flat?: Flat;
  busy: boolean;
  deleteBooking: (booking: Booking) => void;
}) {
  const startFrom = busy ? 1 : 0;

  return (
    <div>
      {flat?.bookings && flat?.bookings.length > startFrom ? (
        <div className="mt-6">
          <h2 className="text-lg">Прошлые жильцы</h2>
          <ul className="text-base text-green-800 font-semibold">
            {flat?.bookings.map((booking, i) =>
              i >= startFrom ? (
                <li className="flex justify-between my-3" key={booking.id}>
                  <div>
                    До{" "}
                    {moment(booking.movedInAt)
                      .add(booking.duration, "days")
                      .format("D MMM YYYY")}{" "}
                    - {booking.company} ({booking.duration}{" "}
                    {days(booking.duration)})
                  </div>
                  <FaTrash
                    onClick={() => deleteBooking(booking)}
                    className="ml-2 text-red-700"
                    size={20}
                  />
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-red-700 mt-5">Нет прошлых бронирований</p>
      )}
    </div>
  );
}
