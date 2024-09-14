export interface Flat {
  id: number;
  title: string;
  bookings: Booking[];
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
