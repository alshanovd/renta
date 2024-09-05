"use client";
import { Flat } from "@prisma/client";
import Button from "./button";

export default function RenameFlat({ flat }: { flat: Flat }) {
  return (
    <div
      className="border flex justify-between items-center text-base pl-2 py-1 mx-1"
      key={flat.id}
    >
      <span>{flat.title}</span>
      <Button onClick={() => 0}>Переименовать</Button>
    </div>
  );
}
