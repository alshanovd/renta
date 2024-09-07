"use client";
import Button from "@/components/button";
import { FlatsContext } from "@/components/flats-context";
import RenameFlat from "@/components/rename-flat";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function SettingsPage() {
  const flats = useContext(FlatsContext);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      <div className="text-slate-800 mx-4">
        <h1 className="text-xl mb-4 text-center font-bold">Настройки</h1>
        <div className="flex justify-center text-slate-900 my-4">
          <Button onClick={() => router.replace("/new-flat")}>
            Новая квартира
          </Button>
        </div>
        {flats.map((flat) => (
          <RenameFlat flat={flat} key={flat.id} />
        ))}
      </div>
    </>
  );
}
