"use client";

import Button from "@/components/button";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { Flat } from "@prisma/client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";

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

const validate = (values: Flat) => {
  const errors: Partial<Flat> = {};
  if (!values.title) {
    errors.title = "Обязательное поле";
  }
  return errors;
};

export default function RenameFlat({ params }: { params: { flat: string } }) {
  const flats = useContext(FlatsContext);
  const [removing, setRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cannotRemove, setCannotRemove] = useState(false);
  const [afterSave, setAfterSave] = useState(false);
  const router = useRouter();
  const flat =
    flats.find((flat) => flat.id === Number(params.flat)) ||
    ({
      id: 0,
      title: "",
      landlord: "",
      paymentAmount: 0,
      paymentDay: 0,
    } as Flat);

  const removeFlat = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/delete-flat", {
      method: "DELETE",
      body: JSON.stringify({ flatId: flat.id }),
    });
    if (!response.ok) {
      setCannotRemove(true);
    } else {
      setRemoving(false);
      router.push("/settings");
    }
    setLoading(false);
  };

  const formik = useFormik<Flat>({
    initialValues: {
      ...(flat as Flat),
    },
    validate,
    onSubmit: async ({ id, title, landlord, paymentAmount, paymentDay }) => {
      setLoading(true);
      const body = JSON.stringify({
        id,
        title,
        landlord,
        paymentAmount: Number(paymentAmount),
        paymentDay: Number(paymentDay),
      });
      if (id) {
        await fetch(`/api/update-flat`, {
          method: "PUT",
          body,
        });
      } else {
        await fetch(`/api/new-flat`, {
          method: "POST",
          body,
        });
      }
      setAfterSave(true);
      setLoading(false);
      router.refresh();
    },
  });

  return (
    <div className="text-stone-800 px-4 tracking-wide">
      <h1 className="text-lg text-center font-bold">
        {flat.id ? "Настройки квартиры" : "Новая квартира"}
      </h1>
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <label htmlFor="title">Название/Адрес</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="border py-2 px-4 w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="landlord">Арендодатель</label>
          <input
            type="text"
            name="landlord"
            id="landlord"
            value={formik.values.landlord!}
            onChange={formik.handleChange}
            className="border py-2 px-4 w-full"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-3">
          <Label htmlFor="paymentAmount">Сумма аренды</Label>
          <input
            type="tel"
            name="paymentAmount"
            id="paymentAmount"
            value={formik.values.paymentAmount!}
            onChange={formik.handleChange}
            className="border py-2 px-4 w-full"
          />
          <Label htmlFor="paymentDay">День оплаты</Label>
          <input
            type="tel"
            name="paymentDay"
            id="paymentDay"
            value={formik.values.paymentDay!}
            onChange={formik.handleChange}
            className="border py-2 px-4 w-full"
          />
        </div>
        <div className="flex justify-center mt-4">
          {loading ? (
            <div className="loader w-10"></div>
          ) : (
            <Button type="submit" disabled={!!formik.errors.title}>
              Сохранить
            </Button>
          )}
        </div>
      </form>
      {flat.id !== 0 && (
        <div className="mt-10 flex justify-center">
          <Button onClick={() => setRemoving(true)}>
            <FaTrash size={20} className="text-red-700" />
          </Button>
        </div>
      )}
      {removing && (
        <Confirm
          confirm="Удалить"
          onCancel={() => setRemoving(false)}
          onConfirm={(e) => removeFlat(e)}
        >
          {cannotRemove ? (
            <p>Квартира не удалена так как в ней есть бронирования</p>
          ) : (
            <div className="flex flex-col items-center">
              <p>
                Точно удалить <span className="font-bold">{flat.title}</span>?
              </p>
              {loading && <div className="loader w-10 mt-2"></div>}
            </div>
          )}
        </Confirm>
      )}
      {afterSave && (
        <Confirm
          confirm="В список"
          cancel="Остаться"
          onCancel={() => setAfterSave(false)}
          onConfirm={() => router.push("/settings")}
        >
          <p>Квартира сохранена</p>
        </Confirm>
      )}
    </div>
  );
}
