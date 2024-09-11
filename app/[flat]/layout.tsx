"use client";
import { FlatsContext } from "@/components/flats-context";
import { Booking, Flat } from "@/models/flat";
import { useContext, useEffect, useState } from "react";
import CurrentBooking from "./CurrentBooking";
import FlatStatus from "./FlatStatus";
import PreviousBookings from "./PreviousBookings";
import { addDay, diffDays } from "@formkit/tempo";

export default function FlatLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { flat: string } }>) {
  const flats = useContext(FlatsContext);
  const [flat, setFlat] = useState<Flat | undefined>();
  const [busy, setBusy] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const currFlat = flats.find((flat) => flat.id === Number(params.flat));
    const currBooking = currFlat?.bookings[0] || null;
    let currBusy = false;
    if (currBooking) {
      currBusy =
        diffDays(
          addDay(currBooking.movedInAt, currBooking.duration + 1),
          new Date()
        ) > 0;
    }
    setFlat(currFlat);
    setBooking(currBooking);
    setBusy(currBusy);
  }, [flats]);
  return (
    <div className="text-xl text-black">
      <h1 className="mx-4 font-bold tracking-wide">{flat?.title}</h1>
      <FlatStatus busy={busy} />
      <div className="mx-4">
        {busy && booking && <CurrentBooking booking={booking} />}
        <div>{children}</div>
        <PreviousBookings busy={busy} flat={flat} />
      </div>
    </div>
  );
}
