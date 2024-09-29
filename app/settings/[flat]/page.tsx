"use client";

import Button from "@/components/button";
import { FlatsContext } from "@/components/flats-context";
import { FullScreen } from "@/components/full-screen";
import { Flat } from "@prisma/client";
import { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { createFlatAction } from "./CreateFlatAction";
import { deleteFlatAction } from "./DeleteFlatAction";
import SubmitButton from "./SubmitButton";

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: string;
}) => (
  <label className="flex items-center justify-end" htmlFor={htmlFor}>
    {children}
  </label>
);

export default function RenameFlat({ params }: { params: { flat: string } }) {
  const flats = useContext(FlatsContext);
  const [removing, setRemoving] = useState(false);
  const flat =
    flats.find((flat) => flat.id === Number(params.flat)) ||
    ({
      id: 0,
      title: "",
      paymentAmount: 0,
      paymentDay: 0,
    } as Flat);

  const createAction = createFlatAction.bind(null, flat);
  const deleteAction = deleteFlatAction.bind(null, flat.id);

  return (
    <div className="text-stone-800 px-4 tracking-wide">
      <h1 className="text-lg text-center font-bold">
        {flat.id ? "Настройки квартиры" : "Новая квартира"}
      </h1>
      <form className="mt-4" action={createAction}>
        <div className="mt-4">
          <input type="hidden" name="id" value={flat.id} />
          <label htmlFor="title">Название/Адрес</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border py-2 px-4 w-full"
            defaultValue={flat.title!}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-3">
          <Label htmlFor="paymentAmount">Сумма аренды</Label>
          <input
            type="tel"
            name="paymentAmount"
            id="paymentAmount"
            className="border py-2 px-4 w-full"
            defaultValue={flat.paymentAmount!}
          />
          <Label htmlFor="paymentDay">День оплаты</Label>
          <input
            type="tel"
            name="paymentDay"
            id="paymentDay"
            className="border py-2 px-4 w-full"
            defaultValue={flat.paymentDay!}
          />
        </div>
        <div className="flex justify-center mt-4">
          <SubmitButton>Сохранить</SubmitButton>
        </div>
      </form>
      {flat.id !== 0 && (
        <div className="mt-10 flex justify-center">
          <FaTrash
            size={20}
            onClick={() => setRemoving(true)}
            className="text-red-700"
          />
        </div>
      )}
      {removing && (
        <FullScreen>
          <div className="flex flex-col bg-slate-200 py-5 justify-center px-5 shadow-lg rounded-md">
            <p className="text-center">
              Точно удалить <b>{flat.title}</b> ?
            </p>
            <form
              action={deleteAction}
              className="mt-4 flex justify-center space-x-5"
            >
              <Button onClick={() => setRemoving(false)}>Отмена</Button>
              <SubmitButton>Удалить</SubmitButton>
            </form>
          </div>
        </FullScreen>
      )}
    </div>
  );
}
