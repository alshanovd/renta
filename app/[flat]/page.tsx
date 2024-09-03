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
        ? " from-green-300 to-green-200"
        : " from-red-300 to-red-200"
    );
  }, [params, flat]);
  return (
    <div className="text-xl text-black mx-4">
      <h1 className="font-bold tracking-wide">{flat?.title}</h1>
      <div
        className={
          "my-2 text-center rounded-md py-2 uppercase tracking-wider bg-gradient-to-b " +
          color
        }
      >
        {busy ? "Занята" : "Свободна"}
      </div>
      {busy ? (
        <div>
          <p>Текущая бронь:</p>
          <p>Живут: Новолекс</p>
          <p>До: 5 Сентября 2024</p>
        </div>
      ) : (
        <div>
          <p>Квартира свободна</p>
        </div>
      )}
    </div>
  );
}
