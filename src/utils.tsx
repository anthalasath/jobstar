import { Chip, Grid } from "@mui/material";
import { BigNumberish } from "ethers";
import * as React from "react";

export function formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric', year: "numeric" }).format(date);
}

export function firstCharToUpper(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ProfileIdWithRoleViewProps {
    role: string
    profileId: BigNumberish
}

export function ProfileIdWithRoleView(props: ProfileIdWithRoleViewProps) {
    return  <p><b>{props.role}: {props.profileId}</b></p>
}

export interface ProfileWithRoleViewProps extends ProfileIdWithRoleViewProps {
    name: string
}

export function ProfileWithRoleView(props: ProfileWithRoleViewProps) {
    return <div>
        <ProfileIdWithRoleView role={props.role} profileId={props.profileId}></ProfileIdWithRoleView>
        <Chip label={props.name} color="info"></Chip>
    </div>
}
