import Button from "@/components/button";
import { FrontendFlat } from "@/models/flat";
import { Flat, LandlordPayment } from "@prisma/client";
import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { FaTrash } from "react-icons/fa6";

const getBGColor = (flat: FrontendFlat) => {
  const today = moment().date();
  if (flat.isPaid) {
    return "bg-green-200";
  } else {
    if (today === flat.paymentDay! || today === flat.paymentDay! - 1) {
      return "bg-yellow-200";
    } else if (today < flat.paymentDay!) {
      return "bg-blue-200";
    } else if (today > flat.paymentDay!) {
      return "bg-red-200";
    }
  }
};
const getTextColor = (flat: FrontendFlat) => {
  const today = moment().date();
  if (flat.isPaid) {
    return "text-green-800";
  } else {
    if (today === flat.paymentDay! || today === flat.paymentDay! - 1) {
      return "text-yellow-800";
    } else if (today < flat.paymentDay!) {
      return "text-blue-800";
    } else if (today > flat.paymentDay!) {
      return "text-red-800";
    }
  }
};

export const PaymentAmount = ({ amount }: { amount: number }) => (
  <span className="font-semibold">
    {String(amount).replace(/(\d{3})$/, ".$1")} ₽
  </span>
);

export default function PaymentItem({
  flat,
  setFlatPayment,
  setPaymentRemoval,
}: {
  flat: FrontendFlat;
  setFlatPayment: Dispatch<SetStateAction<Flat | null>>;
  setPaymentRemoval: Dispatch<SetStateAction<LandlordPayment | null>>;
}) {
  return (
    <div
      key={flat.id}
      className={
        "border px-4 py-2 border-stone-500 flex justify-between shadow-md " +
        getBGColor(flat)
      }
    >
      <div>
        <p>{flat.title}</p>
        {flat.isPaid ? (
          <div>
            <p className={getTextColor(flat)}>
              Оплачено <PaymentAmount amount={flat.lastPayment?.amount!} />
            </p>
            <p className="text-base">
              Платеж:{" "}
              {moment(flat.lastPayment?.paidAt)
                .add(1, "month")
                .date(flat.paymentDay!)
                .format("D MMMM")}
            </p>
          </div>
        ) : (
          <div className={getTextColor(flat)}>
            <p>Платеж {moment().date(flat.paymentDay!).format("D MMM")}</p>
            <p>
              <PaymentAmount amount={flat.paymentAmount || 0} />
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {flat.isPaid ? (
          <Button onClick={() => setPaymentRemoval(flat.lastPayment!)}>
            <FaTrash className="text-red-700" />
          </Button>
        ) : (
          <Button onClick={() => setFlatPayment(flat)}>Оплатить</Button>
        )}
      </div>
    </div>
  );
}
