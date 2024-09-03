"use client";
import { Booking } from "@/models/flat";
import { addDay, format } from "@formkit/tempo";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function FlatPage() {
  const params = useParams();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    duration: 0,
    flatId: Number(params.flat),
  });
  return (
    <div className="mt-4">
      {!showForm && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="text-slate-800 border border-slate-700 bg-gradient-to-b from-slate-100 to-slate-300 py-2 px-4 rounded-md shadow-md active:shadow-inner"
          >
            Новая бронь
          </button>
        </div>
      )}
      {showForm && (
        <div className="border-b pb-5 border-slate-800">
          <h1 className="font-semibold text-center">Новая бронь</h1>
          <div className="mt-2">
            <label htmlFor="company" className="mr-2">
              Кто заехал?
            </label>
            <input
              id="company"
              type="text"
              className="py-1 px-2 border w-full"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="days" className="mr-2">
              На сколько дней?
            </label>
            <br />
            <input
              className="w-20 py-1 px-2 border"
              onChange={(event) =>
                setNewBooking((state) => ({
                  ...state,
                  duration: Number(event.target.value),
                }))
              }
              id="days"
              type="tel"
              name="duration"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="date">От: </label>
            <input
              className="py-1 px-2 border"
              type="date"
              name="date"
              id="date"
              value={format(new Date(), "YYYY-MM-DD")}
            />
            {/* <p>От: {format(new Date(), "medium", "ru")}</p> */}
            <p>
              До:{" "}
              {format(addDay(new Date(), newBooking?.duration), "medium", "ru")}
            </p>
          </div>
          <div className="mt-2 flex justify-center">
            <button className="text-slate-800 border border-slate-700 bg-gradient-to-b from-slate-100 to-slate-300 py-2 px-4 rounded-md shadow-md active:shadow-inner">
              Забронировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
