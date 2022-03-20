export function formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric', year: "numeric" }).format(date);
}