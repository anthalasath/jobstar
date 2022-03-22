import * as React from "react";

export function formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric', year: "numeric" }).format(date);
}

export function firstCharToUpper(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface NamedAddressViewProps {
    name: string
    address: string
}

export function NamedAddressView(props: NamedAddressViewProps) {
    return <div>
        <p>{props.name}</p>
        <p>{props.address}</p>
    </div>
}