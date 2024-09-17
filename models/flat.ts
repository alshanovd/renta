import { Booking, Flat, LandlordPayments } from "@prisma/client";

export interface FrontendFlat extends Flat {
  currentBooking?: FrontendBooking;
  nextBooking?: FrontendBooking;
  prevBooking?: FrontendBooking;
  bookings: FrontendBooking[];
  llPayments: LandlordPayments[];
}

export interface FrontendBooking extends Booking {
    moveOutAt?: Date;
}
