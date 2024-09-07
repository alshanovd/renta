"use client";
import { Flat } from "@prisma/client";
import { createContext } from "react";

export const FlatsContext = createContext<Flat[]>([]);

export default function FlatsProvider({
  children,
  props,
}: {
  children: React.ReactNode;
  props: { flats: Flat[] };
}) {
  return (
    <FlatsContext.Provider value={props.flats}>
      {children}
    </FlatsContext.Provider>
  );
}
