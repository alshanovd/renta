"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewFlat() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const addFlat = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch("/api/new-flat", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    router.refresh();
    setTitle("");
  };

  return (
    <div className="text-black">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="border py-1 px-2"
        value={title}
      />
      <button onClick={addFlat}>Добавить квартиру</button>
    </div>
  );
}
