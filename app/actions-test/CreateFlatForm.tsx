"use client";
import { Flat } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { createFlat } from "./CreateFlat";

const emptyFlat = {
  title: "",
  paymentDay: 0,
  paymentAmount: 0,
} as Flat;

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create flat
      </button>
      {pending && <div className="text-red-500">loading...</div>}
      <pre className="text-black">{JSON.stringify(pending, null, 2)}</pre>
    </>
  );
};

export default function CreateFlatForm() {
  const [state, formAction] = useFormState(createFlat, emptyFlat);
  return (
    <div className="text-black">
      <form action={formAction}>
        <input type="text" name="title" />
        <Submit />
      </form>
    </div>
  );
}
