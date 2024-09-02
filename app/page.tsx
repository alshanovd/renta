import { Flat } from "@/models/flat";
import Link from "next/link";

export default function Home() {
  const flats: Flat[] = [
    {
      id: 1,
      title: "Магистральная ул., 28А, кв. 1",
    },
    {
      id: 2,
      title: "Магистральная ул., 26, кв. 2",
    },
    {
      id: 3,
      title: "Магистральная ул., 28Б, кв. 3",
    },
    {
      id: 4,
      title: "Магистральная ул., 28Б, кв. 3",
    },
    {
      id: 5,
      title: "Магистральная ул., 28Б, кв. 3",
    },
    {
      id: 6,
      title: "Магистральная ул., 28Б, кв. 3",
    },
    {
      id: 7,
      title: "Магистральная ул., 28Б, кв. 3",
    },
    {
      id: 8,
      title: "Магистральная ул., 28Б, кв. 3",
    },
  ];
  return (
    <div className="bg-gray-100 grid gap-3">
      {flats.map((flat) => (
        <div
          className={
            "flex justify-between px-4 py-2 text-gray-900 items-stretch tracking-wide font-bold text-lg border-gray-900 mx-2 rounded-md" +
            (flat.id > 3
              ? " bg-gradient-to-b from-green-300 to-green-200"
              : " bg-gradient-to-b from-red-300 to-red-200")
          }
          key={flat.id}
        >
          <div>
            <p>{flat.title}</p>
            {flat.id > 3 ? (
              <div className="text-base font-normal">
                <p>Живут: Новолекс</p>
                <p>До: 5 Сентября 2024</p>
              </div>
            ) : (
              <div className="text-base font-normal">
                <p>Освободилась:</p>
                <p>5 Сентября 2024</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end justify-between">
            {flat.id > 3 ? (
              <div className="text-green-700">{flat.id} дня</div>
            ) : (
              <div className="text-red-700"> Свободна </div>
            )}

            <Link
              className="border py-2 px-4 w-16 rounded-md bg-gradient-to-b text-center from-slate-100 to-slate-300 shadow-md active:shadow-inner"
              href={`/${flat.id}`}
            >
              🏠
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
