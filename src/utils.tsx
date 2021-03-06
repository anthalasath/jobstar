import { Chip, Grid } from "@mui/material";
import { BigNumber } from "ethers";
import * as React from "react";

export function formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language, { month: 'short', day: 'numeric', year: "numeric" }).format(date);
}

export function firstCharToUpper(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ProfileIdWithRoleViewProps {
    role: string
    profileId: BigNumber
}

export function ProfileIdWithRoleView(props: ProfileIdWithRoleViewProps) {
    return  <p><b>{props.role}: {props.profileId.toString()}</b></p>
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
