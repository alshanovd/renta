export interface Flat {
  id: number;
  title: string;
  bookings: Booking[];
}

export interface FrontendFlat extends Flat {
  currentBooking?: FrontendBooking;
  nextBooking?: FrontendBooking;
  prevBooking?: FrontendBooking;
  bookings: FrontendBooking[];
}

export interface Booking {
  id: number;
  flatId: number;
  movedInAt: Date;
  duration: number;
  company: string;
  createdAt: Date;
}

export interface FrontendBooking extends Booking {
    moveOutAt?: Date;
}
