"use client";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { Flat, LandlordPayment } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "moment/locale/ru";

const PaymentAmount = ({ amount }: { amount: number }) => (
  <span className="font-semibold">
    {String(amount).replace(/(\d{3})$/, ".$1")} ₽
  </span>
);

export default function PaymentsPage() {
  const flats = useContext(FlatsContext);
  const router = useRouter();
  const [flatPayment, setFlatPayment] = useState<Partial<Flat> | null>(null);
  const [loading, setLoading] = useState(false);
  const sorting = (a: Flat, b: Flat) => {
    return b.paymentDay! - a?.paymentDay!;
  };
  const filtering = (a: Flat) => {
    return a.paymentDay !== 0;
  };
  const makePayment = async () => {
    setLoading(true);
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        flatId: flatPayment?.id,
        amount: flatPayment?.paymentAmount,
      }),
    });
    if (response.ok) {
      router.refresh();
    } else {
      console.error("Payment failed");
    }
    setLoading(false);
    setFlatPayment(null);
  };
  return (
    <div className="text-stone-900 text-xl">
      <div className="space-y-2 mx-2">
        {flats
          .sort(sorting)
          .filter(filtering)
          .map((flat) => (
            <div
              key={flat.id}
              className={
                "border px-4 py-2 border-stone-500 flex justify-between " +
                (flat.isPaid ? "bg-green-200" : "bg-red-200")
              }
            >
              <div>
                <p>{flat.title} </p>
                {flat.isPaid ? (
                  <div>
                    <p className="text-green-800">
                      Оплачено{" "}
                      {flat.llPayments.map((payment) => (
                        <span key={payment.id}>
                          <PaymentAmount
                            key={payment.id}
                            amount={payment.amount}
                          />{" "}
                          -{" "}
                          <span>{moment(payment.paidAt).format("D MMM")}</span>
                        </span>
                      ))}
                    </p>
                    <p className="text-base">
                      Следующий платеж:{" "}
                      {moment(flat.lastPayment?.paidAt)
                        .add(1, "month")
                        .date(flat.paymentDay!)
                        .format("D MMMM")}
                    </p>
                  </div>
                ) : (
                  <div className="text-red-800">
                    Платеж {moment().date(flat.paymentDay!).format("D MMM")} -{" "}
                    <PaymentAmount amount={flat.paymentAmount || 0} />
                  </div>
                )}
              </div>
              {flat.isPaid ? (
                <button>Удалить платеж</button>
              ) : (
                <button
                  onClick={() => {
                    const { id, title, paymentAmount } = flat;
                    setFlatPayment({ id, title, paymentAmount });
                  }}
                >
                  Оплатить
                </button>
              )}
            </div>
          ))}
      </div>
      {flatPayment && (
        <Confirm
          confirm="Оплатить"
          onCancel={() => setFlatPayment(null)}
          onConfirm={() => makePayment()}
          loading={loading}
        >
          <p>
            Оплатить{" "}
            <span className="font-semibold">{flatPayment.paymentAmount}</span>{" "}
            за <span className="font-semibold">{flatPayment.title}</span> ?
          </p>
        </Confirm>
      )}
    </div>
  );
}
