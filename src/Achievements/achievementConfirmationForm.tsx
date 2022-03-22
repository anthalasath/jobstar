import { Grid, Stack } from "@mui/material";
import { NamedAddressView } from "../utils";
import { AchievementInput } from "./achievements";
import { AddAchievementHeader } from "./addAchievementHeader";

interface AchievementConfirmationFormProps {
    input: AchievementInput
}

export function AchievementConfirmationForm(props: AchievementConfirmationFormProps) {
    return <Grid container>
        <Grid xs={4}></Grid>
        <Grid xs={4}>
            <Stack>
                <AddAchievementHeader></AddAchievementHeader>
                <SendAchievementConfirmation
                    workerAddress={props.input.workerAddress}
                    issuerAddress={props.input.issuerAddress}
                ></SendAchievementConfirmation>
            </Stack>
        </Grid>
        <Grid xs={4}></Grid>
    </Grid>
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