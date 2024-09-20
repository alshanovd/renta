"use client";
import Button from "@/components/button";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { FrontendFlat } from "@/models/flat";
import { Flat, LandlordPayment } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa6";

const PaymentAmount = ({ amount }: { amount: number }) => (
  <span className="font-semibold">
    {String(amount).replace(/(\d{3})$/, ".$1")} ₽
  </span>
);

const TopNotification = ({
  text,
  type,
}: {
  text: string;
  type: "alert" | "warn" | "good";
}) => {
  let colorClasses = {
    alert: "text-red-800 bg-red-200",
    warn: "text-yellow-800 bg-yellow-200",
    good: "text-green-800 bg-green-200",
  };
  return (
    <div
      className={
        "px-4 text-center shadow-md flex basis-full justify-center uppercase mb-4 font-bold py-2 tracking-wider " +
        colorClasses[type]
      }
    >
      {text}
    </div>
  );
};

export default function PaymentsPage() {
  const flats = useContext(FlatsContext).filter((flat) => flat.paymentDay); // filter out flats without paymentDay
  const router = useRouter();
  const [flatPayment, setFlatPayment] = useState<Partial<Flat> | null>(null);
  const [paymentRemoval, setPaymentRemoval] =
    useState<Partial<LandlordPayment> | null>(null);
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
  const getTitle = () => {
    const today = moment().date();
    const { paymentDay } = sortedFlats[0];
    console.log(paymentDay, "paymentDay");
    if (moment().date() > paymentDay!) {
      return <TopNotification text="Есть платежи" type="alert" />;
    }
    const isSoon = today === paymentDay! || today === paymentDay! - 1;
    const paymentText = moment()
      .date(paymentDay!)
      .calendar()
      .replace(/\,.+/, "");
    if (isSoon) {
      return <TopNotification text={"Платеж " + paymentText} type="warn" />;
    }

    return <TopNotification text={"Платеж " + paymentText} type="good" />;
  };
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
  const deletePayment = async (id: number) => {
    setLoading(true);
    const response = await fetch("/api/payment", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      router.refresh();
    } else {
      console.error("Payment delete failed");
    }
    setLoading(false);
    setPaymentRemoval(null);
  };
  return (
    <div className="text-stone-900 text-xl">
      {getTitle()}
      <div className="space-y-2 mx-2">
        {sortedFlats.map((flat) => (
          <div
            key={flat.id}
            className={
              "border px-4 py-2 border-stone-500 flex justify-between " +
              getBGColor(flat)
            }
          >
            <div>
              <p>{flat.title}</p>
              {flat.isPaid ? (
                <div>
                  <div className={"" + getTextColor(flat)}>
                    Оплачено
                    <p>
                      <PaymentAmount amount={flat.lastPayment?.amount!} />
                    </p>
                  </div>
                  <p className="text-base">
                    Следующий платеж:{" "}
                    {moment(flat.lastPayment?.paidAt)
                      .add(1, "month")
                      .date(flat.paymentDay!)
                      .format("D MMMM")}
                  </p>
                </div>
              ) : (
                <div className={getTextColor(flat)}>
                  <p>
                    Платеж {moment().date(flat.paymentDay!).format("D MMM")}
                  </p>
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
                <Button
                  onClick={() => {
                    const { id, title, paymentAmount } = flat;
                    setFlatPayment({ id, title, paymentAmount });
                  }}
                >
                  Оплатить
                </Button>
              )}
            </div>
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
            <span className="font-semibold">
              {<PaymentAmount amount={flatPayment.paymentAmount!} />}
            </span>{" "}
            за <span className="font-semibold">{flatPayment.title}</span> ?
          </p>
        </Confirm>
      )}
      {paymentRemoval && (
        <Confirm
          confirm="Удалить"
          onCancel={() => setPaymentRemoval(null)}
          onConfirm={() => deletePayment(paymentRemoval.id!)}
          loading={loading}
        >
          <p>
            Удалить платеж {<PaymentAmount amount={paymentRemoval.amount!} />}?
          </p>
        </Confirm>
      )}
    </div>
  );
}
