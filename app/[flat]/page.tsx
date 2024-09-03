"use client";
import { flats } from "@/mock";
import { Flat } from "@/models/flat";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function FlatPage() {
  const params = useParams();
  const [flat, setFlat] = useState<Flat | undefined>();

  useEffect(() => {
    setFlat(flats.find((flat) => flat.id === Number(params.flat)));
  }, [params]);
  return (
    <div className="text-xl text-black">
      <h1>{flat?.title}</h1>
      <p>Живут: Новолекс</p>
      <p>До: 5 Сентября 2024</p>
    </div>
  );
}
