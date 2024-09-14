"use client";
import Button from "@/components/button";
import { FrontendBooking } from "@/models/flat";
import { days } from "@/tools/days";
import { Booking } from "@prisma/client";
import moment, { duration } from "moment";
import "moment/locale/ru";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Bold = ({ text }: { text: string }) => (
  <span className="font-bold">{text}</span>
);

export default function CurrentBooking({
  booking,
  deleteBooking,
}: {
  booking: FrontendBooking;
  deleteBooking: (booking: Booking) => void;
}) {
  const router = useRouter();
  const [moveOutAt, setMoveOutAt] = useState<Date>(booking.moveOutAt!);
  const [loading, setLoading] = useState<boolean>(false);
  const until = moment(booking.movedInAt)
    .add(booking.duration, "days")
    .format("YYYY-MM-DD");
  const movedIn = moment(booking.movedInAt).format("D MMM YYYY");
  const freeIn = moment(booking.movedInAt)
    .add(booking.duration, "days")
    .diff(moment().startOf("day"), "days");

  const updateMoveOutAtRequest = async () => {
    setLoading(true);
    await fetch("/api/update-booking", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: booking.id,
        duration: moment(moveOutAt).diff(moment(booking.movedInAt), "days"),
      }),
    });
    router.refresh();
    setLoading(false);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-y-1">
        <p className="text-right mr-4">Сейчас живут: </p>{" "}
        <Bold text={booking?.company} />
        <p className="text-right mr-4">Заехали:</p>
        <Bold text={movedIn} />
        <p className="text-right mr-4">Длительность: </p>
        <Bold text={booking.duration + " " + days(booking.duration)} />
        <p className="text-right mr-4">До:</p>
        <input
          type="date"
          defaultValue={until}
          className="border px-2 font-bold"
          onChange={(e) =>
            setMoveOutAt(moment(e.target.value).startOf("day").toDate())
          }
        />
        {moment(booking.moveOutAt).diff(moment(moveOutAt), "days") === 0 ? (
          ""
        ) : (
          <>
            <div> </div>
            <div className="flex justify-center">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <Button onClick={() => updateMoveOutAtRequest()}>
                  Сохранить
                </Button>
              )}
            </div>
          </>
        )}
        <p className="text-right mr-4">Выезжают:</p>
        <Bold text={"через " + freeIn + " " + days(freeIn)} />
      </div>
      <div className="flex mt-2 items-center justify-end">
        Удалить эту бронь
        <FaTrash
          size={20}
          className="text-red-700 ml-4"
          onClick={() => deleteBooking(booking)}
        />
      </div>
    </div>
  );
}
