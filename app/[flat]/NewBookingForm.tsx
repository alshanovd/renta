import Button from "@/components/button";
import { FrontendBooking } from "@/models/flat";
import moment from "moment";
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
  const [newBooking, setNewBooking] = useState<Partial<FrontendBooking>>({
    duration: 0,
    flatId: Number(params.flat),
    movedInAt: moment().startOf("day").toDate(),
    company: "",
    moveOutAt: moment().startOf("day").toDate(),
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
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setNewBooking((state) => ({
      ...state,
      duration: moment(newBooking.moveOutAt).diff(
        moment(newBooking.movedInAt),
        "days"
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBooking.moveOutAt, newBooking.movedInAt]);

  useEffect(() => {
    setNewBooking((state) => ({
      ...state,
      moveOutAt: moment(state.movedInAt!).add(state.duration, "days").toDate(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBooking.duration, newBooking.movedInAt]);

  return (
    <div className="border-b pb-5 border-slate-800">
      {/* <pre className="text-black text-base">
        {JSON.stringify(newBooking, null, 2)}
      </pre> */}
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
          value={newBooking.duration}
        />
      </div>
      <div className="mt-2 grid grid-cols-[auto_1fr]">
        <label htmlFor="date" className="flex items-center mr-4">
          От:{" "}
        </label>
        <input
          className="py-1 px-2 border mt-2"
          type="date"
          name="date"
          id="date"
          onChange={(event) =>
            setNewBooking((state) => ({
              ...state,
              movedInAt: moment(event.target.value).startOf("day").toDate(),
            }))
          }
          value={moment(newBooking.movedInAt).format("YYYY-MM-DD")}
        />
        <label htmlFor="date" className="flex items-center mr-4">
          До:{" "}
        </label>
        <input
          className="py-1 px-2 border mt-2"
          type="date"
          name="date-to"
          id="date-to"
          onChange={(event) =>
            setNewBooking((state) => ({
              ...state,
              moveOutAt: moment(event.target.value).startOf("day").toDate(),
            }))
          }
          value={moment(newBooking.moveOutAt).format("YYYY-MM-DD")}
        />
      </div>
      <div className="mt-5 flex justify-center">
        {loading ? (
          <div className="loader w-10"></div>
        ) : (
          <Button
            disabled={
              newBooking.company === "" ||
              newBooking.duration === 0 ||
              newBooking.movedInAt! > newBooking.moveOutAt!
            }
            onClick={newBookingRequest}
          >
            Забронировать
          </Button>
        )}
      </div>
    </div>
  );
}
