import { FrontendFlat } from "@/models/flat";
import FlatButton from "./FlatButton";
import FlatTextStatus from "./FlatTextStatus";

export default function FlatItem({ flat }: { flat: FrontendFlat }) {
  const color = flat.currentBooking
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
        <FlatTextStatus {...flat} />
      </div>
      <div className="flex flex-col items-end ml-2 justify-between">
        <FlatButton {...flat} />
      </div>
    </div>
  );
}
