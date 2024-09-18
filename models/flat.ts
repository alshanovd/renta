import { Booking, Flat, LandlordPayment } from "@prisma/client";

export interface FrontendFlat extends Flat {
  currentBooking?: FrontendBooking;
  nextBooking?: FrontendBooking;
  prevBooking?: FrontendBooking;
  bookings: FrontendBooking[];
  llPayments: LandlordPayment[];
  isPaid?: boolean;
  lastPayment?: LandlordPayment;
}

export interface FrontendBooking extends Booking {
    moveOutAt?: Date;
}
