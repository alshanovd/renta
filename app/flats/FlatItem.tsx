import { Flat } from "@/models/flat";
import { addDay } from "@formkit/tempo";
import FlatButton from "./FlatButton";
import FlatStatus from "./FlatStatus";

export default function FlatItem({ flat }: { flat: Flat }) {
  const lastBooking = flat.bookings[0];
  let busy = false;
  if (lastBooking) {
    busy = addDay(lastBooking.movedInAt, lastBooking.duration) > new Date();
  }
  const color = busy
    ? " from-green-300 to-green-200"
    : " from-red-300 to-red-200";
  return (
    <div
      className={
        "flex bg-gradient-to-b justify-between px-4 py-2 text-gray-900 items-stretch tracking-wide font-bold text-lg border-gray-900 mx-2 rounded-md" +
        color
      }
    >
      <div>
        <p>{flat.title}</p>
        <FlatStatus busy={busy} lastBooking={lastBooking} />
      </div>
      <div className="flex flex-col items-end ml-2 justify-between">
        <FlatButton flat={flat} lastBooking={lastBooking} busy={busy} />
      </div>
    </div>
  );
}
