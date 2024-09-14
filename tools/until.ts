import { Booking } from "@prisma/client";
import moment from "moment";

export const until = ({ movedInAt, duration }: Partial<Booking>): string =>
  moment(movedInAt).add(duration, "days").format("D MMM");

export const daysUntilCheckOut = ({
  movedInAt,
  duration,
}: Partial<Booking>): number =>
  moment(movedInAt).add(duration, "days").diff(moment().startOf("day"), "days");
