"use client";
import { FlatsContext } from "@/components/flats-context";
import { Flat } from "@prisma/client";
import moment from "moment";
import React, { useContext } from "react";

export default function PaymentsPage() {
  const flats = useContext(FlatsContext);
  const today = Number(moment().format("D"));
  const sorting = (a: Flat, b: Flat) => {
    return b.paymentDay! - a?.paymentDay!;
  };
  const filtering = (a: Flat) => {
    return a.paymentDay !== 0;
  };
  const makePayment = async (flatId: number, amount: number) => {
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ flatId, amount }),
    });
    if (response.ok) {
      console.log("Payment made");
    }
  };
  return (
    <div className="text-black text-xl text-center">
      {today}
      <div className="space-y-2 mx-2">
        {flats
          .sort(sorting)
          .filter(filtering)
          .map((flat) => (
            <div
              key={flat.id}
              className="border px-4 py-2 border-stone-500 flex justify-between"
            >
              <p>
                {flat.title} - {flat.paymentAmount} - {flat.paymentDay}
              </p>
              <button onClick={() => makePayment(flat.id, flat.paymentAmount!)}>
                Оплатить
              </button>
            </div>
          ))}
        {/* <pre className="text-black">{JSON.stringify(flats, null, 2)}</pre> */}
      </div>
    </div>
  );
}
