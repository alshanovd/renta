"use client";
import Button from "@/components/button";
import { FlatsContext } from "@/components/flats-context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function NewFlat() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const flats = useContext(FlatsContext);
  const addFlat = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/new-flat", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    router.replace("/settings");
  };

  return (
    <div className="items-center text-black flex flex-col justify-center">
      <label htmlFor="title">Название квартиры:</label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="border py-1 px-2 w-full my-4"
        value={title}
      />
      <div>
        {loading ? (
          <div className="loader w-10"></div>
        ) : (
          <Button onClick={(e) => addFlat(e)}>Добавить квартиру</Button>
        )}
      </div>
    </div>
  );
}
