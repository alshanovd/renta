"use client";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { FrontendBooking, Flat } from "@/models/flat";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CurrentBooking from "./CurrentBooking";
import FlatStatus from "./FlatStatus";
import PreviousBookings from "./PreviousBookings";
import "moment/locale/ru";
import { Booking } from "@prisma/client";

export default function FlatLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { flat: string } }>) {
  const flats = useContext(FlatsContext);
  const router = useRouter();
  const [flat, setFlat] = useState<Flat | undefined>();
  const [busy, setBusy] = useState<boolean>(false);
  const [currBooking, setCurrBooking] = useState<FrontendBooking | null>(null);
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
    const booking = currFlat?.bookings[0] || null;
    let currBusy = false;
    if (booking) {
      currBusy =
        moment(booking.movedInAt)
          .add(booking.duration, "days")
          .diff(moment(), "days") >= 0;
    }
    setFlat(currFlat);
    setCurrBooking({
      ...booking,
      moveOutAt: moment(booking?.movedInAt)
        .add(booking?.duration, "days")
        .toDate(),
    } as FrontendBooking);
    setBusy(currBusy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flats]);

  return (
    <div className="text-xl text-black">
      <h1 className="mx-4 font-bold tracking-wide">{flat?.title}</h1>
      <FlatStatus busy={busy} />
      <div className="mx-4">
        {busy && currBooking && (
          <CurrentBooking deleteBooking={deleteBooking} booking={currBooking} />
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
                  {moment(removingBooking!.movedInAt).format("D MMM YYYY")}
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
