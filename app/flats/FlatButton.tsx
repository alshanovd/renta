import { days } from "@/tools/days";
import { Booking, Flat } from "@prisma/client";
import moment from "moment";
import Link from "next/link";

export default function FlatButton({
  flat,
  lastBooking,
  busy,
}: Readonly<{ flat: Flat; lastBooking: Booking; busy: boolean }>) {
  const color = busy ? "text-green-700" : "text-red-700";
  const daysLeft = moment(lastBooking.movedInAt)
    .add(lastBooking.duration + 1, "days")
    .diff(moment(), "days");
  return (
    <>
      {busy ? (
        <div className={color}>
          {daysLeft} {days(daysLeft)}
        </div>
      ) : (
        <div className={color}> Свободна </div>
      )}
      <Link
        className="border py-2 px-4 w-16 rounded-md bg-gradient-to-b text-center from-slate-100 to-slate-300 shadow-md active:shadow-inner"
        href={`/${flat.id}`}
      >
        🏠
      </Link>
    </>
  );
}
