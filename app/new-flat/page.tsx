"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewFlat() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    <div className="items-center mx-4 text-black flex flex-col justify-center">
      <label htmlFor="title">Имя новой квартиры:</label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="border py-2 px-4 w-full my-4"
        value={title}
      />
      <div>
        {loading ? (
          <div className="loader w-10"></div>
        ) : (
          <Button onClick={(e) => addFlat(e)} disabled={!title}>
            Добавить квартиру
          </Button>
        )}
      </div>
    </div>
  );
}
