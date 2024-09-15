import { FrontendFlat } from "@/models/flat";
import { until } from "@/tools/until";
import moment from "moment";
import "moment/locale/ru";

export default function FlatTextStatus({
  currentBooking,
  nextBooking,
  prevBooking,
}: Readonly<FrontendFlat>) {
  return (
    <div className="text-base font-normal">
      {currentBooking ? (
        <>
          <p>Занята: {currentBooking.company}</p>
          <p>До {until(currentBooking)}</p>
        </>
      ) : (
        <>
          {nextBooking && (
            <p>Заезд с {moment(nextBooking.movedInAt).format("D MMM")}</p>
          )}
          {prevBooking && <p>Выехали {until(prevBooking)}</p>}
          {!nextBooking && !prevBooking && <p>Нет бронирований</p>}
        </>
      )}
      {/* <pre className="text-black">
        currentBooking - {JSON.stringify(currentBooking, null, 2)}
      </pre>
      nextBooking -{" "}
      <pre className="text-black">{JSON.stringify(nextBooking, null, 2)}</pre>
      prevBooking -{" "}
      <pre className="text-black">{JSON.stringify(prevBooking, null, 2)}</pre> */}
    </div>
  );
}
