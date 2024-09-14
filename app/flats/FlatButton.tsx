import { days } from "@/tools/days";
import { daysUntilCheckOut } from "@/tools/until";
import { Flat } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import { Bookings } from "./FlatItem";

export default function FlatButton({
  currentBooking,
  nextBooking,
  flat,
}: Readonly<Bookings & { flat: Flat }>) {
  const color = currentBooking ? "text-green-700" : "text-red-700";
  const daysLeft = currentBooking
    ? daysUntilCheckOut(currentBooking)
    : moment(nextBooking?.movedInAt).diff(moment().startOf("day"), "days");
  return (
    <>
      <div className={color + " text-nowrap"}>
        {daysLeft > 0 ? daysLeft + " " + days(daysLeft) : "Свободна"}
      </div>
      <Link
        className="border py-2 px-4 w-16 rounded-md bg-gradient-to-b text-center from-slate-100 to-slate-300 shadow-md active:shadow-inner"
        href={`/${flat.id}`}
      >
        🏠
      </Link>
    </>
  );
}
