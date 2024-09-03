export interface Flat {
    id: number;
    title: string;
}

export interface Booking {
    id?: number;
    flatId: number;
    date: Date;
    duration: number;
    company: string;
}
