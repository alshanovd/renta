"use client";
import { FlatsContext } from "@/components/flats-context";
import { Booking, Flat } from "@/models/flat";
import { useContext, useEffect, useState } from "react";
import CurrentBooking from "./CurrentBooking";
import FlatStatus from "./FlatStatus";
import PreviousBookings from "./PreviousBookings";
import { addDay, diffDays, format } from "@formkit/tempo";
import { useRouter } from "next/navigation";
import Confirm from "@/components/confim";

export default function FlatLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { flat: string } }>) {
  const flats = useContext(FlatsContext);
  const router = useRouter();
  const [flat, setFlat] = useState<Flat | undefined>();
  const [busy, setBusy] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [removingBooking, setRemovingBooking] = useState<Booking | null>(null);

  const deleteBooking = (booking: Booking) => {
    setRemoving(true);
    setRemovingBooking(booking);
  };

  const deleteBookingRequest = async () => {
    if (!removingBooking) return;
    setLoading(true);
    const response = await fetch("/api/delete-booking", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: removingBooking.id }),
    });
    setLoading(false);
    setRemoving(false);
    router.refresh();
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flats]);

  return (
    <div className="text-xl text-black">
      <h1 className="mx-4 font-bold tracking-wide">{flat?.title}</h1>
      <FlatStatus busy={busy} />
      <div className="mx-4">
        {busy && booking && (
          <CurrentBooking deleteBooking={deleteBooking} booking={booking} />
        )}
        <div>{children}</div>
        <PreviousBookings
          deleteBooking={deleteBooking}
          busy={busy}
          flat={flat}
        />
        {removing && (
          <Confirm
            confirm="Удалить"
            onCancel={() => setRemoving(false)}
            onConfirm={(e) => deleteBookingRequest()}
          >
            <div className="flex flex-col items-center">
              <p>
                Точно удалить бронь{" "}
                <span className="font-bold">{removingBooking!.company}</span>
                <br />
                от{" "}
                <span className="font-bold">
                  {format(removingBooking!.movedInAt, "medium", "ru")}
                </span>
                ?
              </p>
              {loading && <div className="loader w-10 mt-2"></div>}
            </div>
          </Confirm>
        )}
      </div>
    </div>
  );
}
