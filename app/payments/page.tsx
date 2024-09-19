"use client";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { FrontendFlat } from "@/models/flat";
import { Flat } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

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
  const unpaidFlats = flats
    .filter((flat) => !flat.isPaid)
    .sort((a, b) => {
      return a.paymentDay! - b.paymentDay!;
    });
  const paidFlats = flats
    .filter((flat) => flat.isPaid)
    .sort((a, b) => {
      return a.paymentDay! - b.paymentDay!;
    });
  const sortedFlats = [...unpaidFlats, ...paidFlats];
  const filtering = (a: Flat) => {
    return a.paymentDay !== 0;
  };
  const getColor = (flat: FrontendFlat, type: "bg" | "text") => {
    const strength = type === "bg" ? 200 : 800;
    const today = moment().date();
    let color = "";
    if (flat.isPaid) {
      color = "-green-";
    } else {
      if (today === flat.paymentDay! || today === flat.paymentDay! - 1) {
        color = "-yellow-";
      } else if (today < flat.paymentDay!) {
        color = "-blue-";
      } else if (today > flat.paymentDay!) {
        color = "-red-";
      }
    }
    return type + color + strength;
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
        {sortedFlats.filter(filtering).map((flat) => (
          <div
            key={flat.id}
            className={
              "border px-4 py-2 border-stone-500 flex justify-between " +
              getColor(flat, "bg")
            }
          >
            <div>
              <p>{flat.title}</p>
              {flat.isPaid ? (
                <div>
                  <p className={getColor(flat, "text")}>
                    Оплачено{" "}
                    <PaymentAmount amount={flat.lastPayment?.amount!} /> -{" "}
                    <span>
                      {moment(flat.lastPayment!.paidAt).format("D MMM")}
                    </span>
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
                <div className={getColor(flat, "text")}>
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
