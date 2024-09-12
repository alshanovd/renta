"use client";
import { Flat } from "@/models/flat";
import moment from "moment";
import { createContext } from "react";

export const FlatsContext = createContext<Flat[]>([]);

export default function FlatsProvider({
  children,
  props,
}: {
  children: React.ReactNode;
  props: { flats: Flat[] };
}) {
  const flatsSorted = props.flats.sort((flat1, flat2) => {
    const booking1 = flat1.bookings[0] || {};
    const booking2 = flat2.bookings[0] || {};
    const result =
      Number(
        moment(booking1.movedInAt).add(booking1.duration, "days").format("X")
      ) -
      Number(
        moment(booking2.movedInAt).add(booking2.duration, "days").format("X")
      );
    return result;
  });
  return (
    <FlatsContext.Provider value={flatsSorted}>
      {children}
    </FlatsContext.Provider>
  );
}
