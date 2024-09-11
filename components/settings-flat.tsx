"use client";
import { Flat } from "@prisma/client";
import Button from "./button";
import { useState } from "react";
import Confirm from "./confim";
import { useRouter } from "next/navigation";

export default function SettingsFlat({ flat }: { flat: Flat }) {
  const [removing, setRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const removeFlat = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/delete-flat", {
      method: "DELETE",
      body: JSON.stringify({ flatId: flat.id }),
    });
    setLoading(false);
    setRemoving(false);
    router.refresh();
  };
  return (
    <div
      className="border my-2 flex justify-between items-center text-base pl-2 py-1 mx-1"
      key={flat.id}
    >
      <span>{flat.title}</span>
      <div className="flex">
        <Button onClick={() => setRemoving(true)}>Удалить</Button>
        <Button className="ml-4" onClick={() => 0} disabled={true}>
          Имя
        </Button>
      </div>
      {removing && (
        <Confirm
          confirm="Удалить"
          onCancel={() => setRemoving(false)}
          onConfirm={(e) => removeFlat(e)}
        >
          <div className="flex flex-col items-center">
            <p>Точно удалить {flat.title}?</p>
            {loading && <div className="loader w-10 mt-2"></div>}
          </div>
        </Confirm>
      )}
    </div>
  );
}
