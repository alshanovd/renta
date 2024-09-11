"use client";
import { Flat } from "@/models/flat";
import { addDay, diffDays } from "@formkit/tempo";
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
      Number(addDay(booking1.movedInAt, booking1.duration || 0)) -
      Number(addDay(booking2.movedInAt, booking2.duration || 0));
    return result;
  });
  return (
    <FlatsContext.Provider value={flatsSorted}>
      {children}
    </FlatsContext.Provider>
  );
}
