export type AppointmentRequest = {
    name: string;
    phone: string;
    email: string;
    age: number;

    date: string;
    dayPreference:
    | "Any"
    | "Mon"
    | "Tue"
    | "Wed"
    | "Thu"
    | "Fri"
    | "Sat"
    | "Sun";

    slot: "morning" | "evening";

    reason: string;
};
