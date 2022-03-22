import { Stack } from "@mui/material";
import { NamedAddressView } from "../utils";
import { AchievementInput } from "./achievements";
import { AddAchievementHeader } from "./addAchievementHeader";

interface AchievementConfirmationFormProps {
    input: AchievementInput
}

export function AchievementConfirmationForm(props: AchievementConfirmationFormProps) {
    return <Stack>
        <AddAchievementHeader></AddAchievementHeader>
        <SendAchievementConfirmation
            workerAddress={props.input.workerAddress}
            issuerAddress={props.input.issuerAddress}
        ></SendAchievementConfirmation>
    </Stack>
}

interface SendAchievementConfirmationProps {
    workerAddress: string
    issuerAddress: string
}

function SendAchievementConfirmation(props: SendAchievementConfirmationProps) {
    return <div>
        <p>The achievement will be sent for signature</p>
        <NamedAddressView name="Issuer" address={props.issuerAddress}></NamedAddressView>
        <NamedAddressView name="Worker" address={props.workerAddress}></NamedAddressView>
    </div>
}