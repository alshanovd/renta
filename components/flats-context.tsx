"use client";
import { FrontendFlat } from "@/models/flat";
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
    // isPaid
    const payments = flat.llPayments;
    if (payments.length > 0) {
      flat.isPaid =
        payments
          .filter((p) => moment(p.paidAt).month() === moment().month())
          .map((payment) => payment.amount)
          .reduce((acc, curr) => acc + curr, 0) >= (flat.paymentAmount || 0);
      flat.lastPayment = payments[payments.length - 1];
    }

    // currentBooking, nextBooking, prevBooking
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
        // если бронь сегодня начинается, то квартира считается занятой
        // если бронь сегодня заканчивается, то квартира считается свободной
      ) {
        flat.currentBooking = booking;
      }
      if (
        !flat.nextBooking &&
        flat.currentBooking !== booking && // не текущая бронь
        moment().startOf("day").isSameOrBefore(booking.movedInAt, "day") // следующая бронь начинается сегодня или позже, moment(сегодня) <- isSameOrBefore(день заезда)
      ) {
        flat.nextBooking = booking;
      }
      if (
        !flat.prevBooking &&
        flat.currentBooking !== booking && // не текущая бронь
        moment().isSameOrAfter(booking.moveOutAt, "day")
      ) {
        flat.prevBooking = booking;
      }
    }
  });

  // сортировка квартир по дате окончания текущей брони
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
