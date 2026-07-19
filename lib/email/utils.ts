export function formatEmailDate(date: string): string {
    if (!date) return "";

    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function formatSlot(slot: string): string {
    return slot.charAt(0).toUpperCase() + slot.slice(1);
}