import { Flat } from "@/models/flat";
import { addDay, format } from "@formkit/tempo";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function PreviousBookings({
  flat,
  busy,
}: {
  flat?: Flat;
  busy: boolean;
}) {
  const startFrom = busy ? 1 : 0;

  return (
    <div>
      {flat?.bookings && flat?.bookings.length > startFrom ? (
        <div className="mt-4">
          <h2 className="text-lg">Прошлые жильцы</h2>
          <ul className="text-base text-green-800 font-semibold">
            {flat?.bookings.map((booking, i) =>
              i >= startFrom ? (
                <li className="flex justify-between" key={booking.id}>
                  <div>
                    До{" "}
                    {format(
                      addDay(booking.movedInAt, booking.duration),
                      "medium",
                      "ru"
                    )}{" "}
                    - {booking.company} ({booking.duration} дней)
                  </div>
                  <FaTrash className="ml-2 text-red-700" size={20} />
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
