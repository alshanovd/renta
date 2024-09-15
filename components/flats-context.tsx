"use client";
import { Flat, FrontendFlat } from "@/models/flat";
import moment from "moment";
import { createContext } from "react";

export const FlatsContext = createContext<FrontendFlat[]>([]);

export default function FlatsProvider({
  children,
  props,
}: {
  children: React.ReactNode;
  props: { flats: FrontendFlat[] };
}) {
  props.flats.map((flat) => {
    const bookingsLoop = flat.bookings;
    for (let i = 0; i < bookingsLoop.length; i++) {
      const booking = bookingsLoop[i];
      booking.moveOutAt = moment(booking.movedInAt)
        .add(booking.duration, "days")
        .toDate();

      if (
        !flat.currentBooking &&
        moment()
          .startOf("day")
          .isBetween(booking.movedInAt, booking.moveOutAt, "days", "[)")
        // если бронь сегодня заканчивается, то квартира считается свободной
        // если бронь сегодня начинается, то квартира считается занятой
      ) {
        flat.currentBooking = booking;
      }
      if (
        !flat.nextBooking &&
        moment().isSameOrBefore(booking.movedInAt, "day")
      ) {
        flat.nextBooking = booking;
      }
      if (
        !flat.prevBooking &&
        moment().isSameOrAfter(booking.moveOutAt, "day")
      ) {
        flat.prevBooking = booking;
      }
    }
  });
  const flatsSorted = props.flats.sort((a, b) => {
    if (!a?.currentBooking && !b?.currentBooking) {
      if (!a?.nextBooking && b?.nextBooking) {
        return -1;
      } else {
        return 1;
      }
    }
    if (!a?.currentBooking && b?.currentBooking) {
      return -1;
    } else if (a?.currentBooking && !b?.currentBooking) {
      return 1;
    }
    if (a?.currentBooking && b?.currentBooking) {
      return moment(a.currentBooking?.moveOutAt).diff(
        moment(b.currentBooking?.moveOutAt)
      );
    }
    return 0;
  });
  return (
    <FlatsContext.Provider value={flatsSorted}>
      {children}
    </FlatsContext.Provider>
  );
}
