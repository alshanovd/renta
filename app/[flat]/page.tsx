"use client";
import { flats } from "@/mock";
import { Flat } from "@/models/flat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FlatPage() {
  const params = useParams();
  const [flat, setFlat] = useState<Flat | undefined>();
  const [busy, setBusy] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setFlat(flats.find((flat) => flat.id === Number(params.flat)));
    setBusy(flat?.id! > 3);
    setColor(
      flat?.id! > 3
        ? " from-green-300 to-green-200 text-green-800"
        : " from-red-300 to-red-200 text-red-800"
    );
  }, [params, flat]);
  return (
    <div className="text-xl text-black">
      <h1 className="mx-4 font-bold tracking-wide">{flat?.title}</h1>
      <div
        className={
          "my-2 text-center py-2 uppercase tracking-wider bg-gradient-to-b " +
          color
        }
      >
        {busy ? "Занята" : "Свободна"}
      </div>
      <div className="mx-4">
        {busy ? (
          <>
            <p className="text-center my-2">Текущая бронь</p>
            <p>Живут: Новолекс</p>
            <p>До: 5 Сентября 2024</p>
            <p>
              Освобождается через{" "}
              <span className="font-bold">{flat?.id + " дня"}</span>
            </p>
          </>
        ) : (
          <p>Квартира свободна</p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button className="text-slate-800 border border-slate-700 bg-gradient-to-b from-slate-100 to-slate-300 py-2 px-4 rounded-md shadow-md active:shadow-inner">
          Новая бронь
        </button>
      </div>
    </div>
  );
}
