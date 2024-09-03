"use client";
import { flats } from "@/mock";
import { Flat } from "@/models/flat";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FlatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        <div>
          {busy && (
            <>
              <p className="text-center my-2">Текущая бронь</p>
              <p>Занята: Новолекс</p>
              <p>До: 5 Сентября 2024</p>
              <p>
                Освобождается через{" "}
                <span className="font-bold">{flat?.id + " дня"}</span>
              </p>
            </>
          )}
        </div>
        <div>{children}</div>
        <div className="mt-4">
          <h2 className="text-lg">Прошлые бронирования</h2>
          <ul className="text-base text-green-800 font-semibold">
            <li>Геннадий: 10 дней до 4 Сентября 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
