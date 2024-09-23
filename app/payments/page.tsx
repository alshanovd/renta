"use client";
import Confirm from "@/components/confim";
import { FlatsContext } from "@/components/flats-context";
import { Flat, LandlordPayment } from "@prisma/client";
import moment from "moment";
import "moment/locale/ru";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import PaymentItem, { PaymentAmount } from "./PaymentItem";

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
  const [flatPayment, setFlatPayment] = useState<Flat | null>(null);
  const [paymentRemoval, setPaymentRemoval] = useState<LandlordPayment | null>(
    null
  );
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
    const allPaid = unpaidFlats.length === 0;
    const paymentDay = sortedFlats[0].paymentDay!;
    if (!allPaid && moment().date() > paymentDay) {
      return <TopNotification text="Есть платежи" type="alert" />;
    }
    const isSoon = today === paymentDay || today === paymentDay - 1;
    const paymentTextFn = (): string => {
      if (allPaid) {
        return moment()
          .date(paymentDay)
          .add(1, "month")
          .calendar()
          .replace(/\,.+/, "");
      }

      return moment().date(paymentDay).calendar().replace(/\,.+/, "");
    };
    const paymentText = paymentTextFn();
    if (isSoon) {
      return <TopNotification text={"Платеж " + paymentText} type="warn" />;
    }

    return <TopNotification text={"Платеж " + paymentText} type="good" />;
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
          <PaymentItem
            flat={flat}
            setFlatPayment={setFlatPayment}
            setPaymentRemoval={setPaymentRemoval}
            key={flat.id}
          />
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
