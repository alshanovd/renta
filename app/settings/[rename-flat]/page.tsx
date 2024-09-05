"use client";
import Button from "@/components/button";
import { Flat } from "@prisma/client";
import { useState } from "react";

export default function RenameFlat({
  flat,
  onRename,
}: {
  flat: Flat;
  onRename: (newTitle: string) => void;
}) {
  const [newTitle, setNewTitle] = useState(flat.title);

  return (
    <div>
      <input
        type="text"
        className="border py-1 px-2"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Button onClick={() => onRename(newTitle)}>Rename</Button>
    </div>
  );
}
