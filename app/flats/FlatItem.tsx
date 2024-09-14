import { Flat } from "@/models/flat";
import moment from "moment";
import FlatButton from "./FlatButton";
import FlatTextStatus from "./FlatTextStatus";
import { Booking } from "@prisma/client";

export interface Bookings {
  currentBooking: Booking | null;
  nextBooking: Booking | null;
  prevBooking: Booking | null;
}

export default function FlatItem({ flat }: { flat: Flat }) {
  const bookings: Bookings = {
    currentBooking: null,
    nextBooking: null,
    prevBooking: null,
  };
  const bookingsLoop = flat.bookings;
  //
  for (let i = 0; i < bookingsLoop.length; i++) {
    const booking = bookingsLoop[i];
    const moveOutAt = moment(booking.movedInAt).add(booking.duration, "days");
    if (
      !bookings.currentBooking &&
      moment()
        .startOf("day")
        .isBetween(booking.movedInAt, moveOutAt, "days", "[)")
      // если бронь сегодня заканчивается, то квартира считается свободной
      // если бронь сегодня начинается, то квартира считается занятой
    ) {
      bookings.currentBooking = booking;
    }
    if (bookings.currentBooking) {
      bookings.nextBooking = bookingsLoop[i - 1] || null;
      bookings.prevBooking = bookingsLoop[i + 1] || null;
      break;
    } else {
      if (
        !bookings.nextBooking &&
        moment().isSameOrBefore(booking.movedInAt, "day")
      ) {
        bookings.nextBooking = booking;
        continue;
      }
      if (!bookings.prevBooking && moment().isSameOrAfter(moveOutAt, "day")) {
        bookings.prevBooking = booking;
        continue;
      }
    }
  }
  const color = bookings.currentBooking
    ? " from-green-300 to-green-200"
    : " from-red-300 to-red-200";
  return (
    <div
      className={
        "flex bg-gradient-to-b justify-between px-4 py-2 text-gray-900 items-stretch tracking-wide font-bold text-lg border-gray-900 mx-2 rounded-md" +
        color
      }
    >
      <div>
        <p>{flat.title}</p>
        <FlatTextStatus {...bookings} />
      </div>
      <div className="flex flex-col items-end ml-2 justify-between">
        <FlatButton {...bookings} flat={flat} />
      </div>
    </div>
  );
}
