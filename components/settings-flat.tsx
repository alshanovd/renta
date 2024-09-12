"use client";
import { Flat } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./button";
import Confirm from "./confim";

export default function SettingsFlat({ flat }: { flat: Flat }) {
  const [removing, setRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(flat.title);
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

  const renameFlatRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/rename-flat", {
      method: "PUT",
      body: JSON.stringify({ id: flat.id, title: newTitle }),
    });
    setLoading(false);
    setRenaming(false);
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
        <Button className="ml-4" onClick={() => setRenaming(true)}>
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
            <p>
              Точно удалить <span className="font-bold">{flat.title}</span>?
            </p>
            {loading && <div className="loader w-10 mt-2"></div>}
          </div>
        </Confirm>
      )}
      {renaming && (
        <Confirm
          confirm="Переименовать"
          onCancel={() => setRenaming(false)}
          onConfirm={(e) => renameFlatRequest(e)}
        >
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="border py-1 px-2 w-full"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            {loading && <div className="loader w-10 mt-2"></div>}
          </div>
        </Confirm>
      )}
    </div>
  );
}
