import Button from "@/components/button";
import { addDay, format } from "@formkit/tempo";
import { Booking } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FlatBookingInput from "./FlatBookingInput";

export default function NewBookingForm({
  setShowForm,
}: {
  setShowForm: (show: boolean) => void;
}) {
  const router = useRouter();
  const params = useParams();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    duration: 0,
    flatId: Number(params.flat),
    movedInAt: new Date(),
    company: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const newBookingRequest = async () => {
    setLoading(true);
    await fetch("/api/new-booking", {
      method: "POST",
      body: JSON.stringify(newBooking),
    });
    setShowForm(false);
    setLoading(false);
    router.refresh();
  };
  useEffect(() => {
    if (newBooking.company === "" || newBooking.duration === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newBooking]);
  return (
    <div className="border-b pb-5 border-slate-800">
      <h1 className="font-semibold text-center">Новая бронь</h1>
      <div className="mt-2">
        <FlatBookingInput
          label="Кто заехал?"
          name="company"
          type="text"
          onChange={(event) =>
            setNewBooking((state) => ({
              ...state,
              company: event.target.value,
            }))
          }
        />
      </div>
      <div className="mt-2">
        <FlatBookingInput
          label="На сколько дней?"
          name="duration"
          type="tel"
          onChange={(event) =>
            setNewBooking((state) => ({
              ...state,
              duration: Number(event.target.value),
            }))
          }
        />
      </div>
      <div className="mt-2">
        <label htmlFor="date">От: </label>
        <input
          className="py-1 px-2 border mt-2"
          type="date"
          name="date"
          id="date"
          onChange={(event) =>
            setNewBooking((state) => ({
              ...state,
              movedInAt: new Date(event.target.value),
            }))
          }
          value={format(newBooking.movedInAt!, "YYYY-MM-DD")}
        />
        <p className="mt-2">
          До:{" "}
          {format(
            addDay(newBooking.movedInAt!, newBooking?.duration),
            "medium",
            "ru"
          )}
        </p>
      </div>
      <div className="mt-2 flex justify-center">
        {loading ? (
          <div className="loader w-10"></div>
        ) : (
          <Button disabled={disabled} onClick={newBookingRequest}>
            Забронировать
          </Button>
        )}
      </div>
    </div>
  );
}
