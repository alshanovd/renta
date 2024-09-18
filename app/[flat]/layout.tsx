"use client";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { FrontendFlat } from "@/models/flat";
import { Booking } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CurrentBooking from "./CurrentBooking";
import FlatStatus from "./FlatStatus";
import NextBooking from "./NextBooking";
import PreviousBookings from "./PreviousBookings";

export default function FlatLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { flat: string } }>) {
  const flats = useContext(FlatsContext);
  const router = useRouter();
  const [flat, setFlat] = useState<FrontendFlat | undefined>();
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
    setFlat(currFlat);
  }, [flats, params.flat]);

  return (
    <div className="text-xl text-black">
      <h1 className="mx-4 font-bold tracking-wide">{flat?.title}</h1>
      <FlatStatus busy={!!flat?.currentBooking} />
      <div className="mx-4">
        {flat?.currentBooking && (
          <CurrentBooking
            deleteBooking={deleteBooking}
            booking={flat.currentBooking}
          />
        )}
        {flat?.nextBooking && (
          <NextBooking
            deleteBooking={deleteBooking}
            booking={flat.nextBooking}
          />
        )}
        <div>{children /* NewBookingForm */}</div>
        <PreviousBookings deleteBooking={deleteBooking} flat={flat} />
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
