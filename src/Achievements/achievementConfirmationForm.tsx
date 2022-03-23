import { Button, Grid, Paper, Stack } from "@mui/material";
import { BigNumberish } from "ethers";
import { ProfileIdWithRoleView } from "../utils";
import { AchievementInput, AchievementInputView } from "./achievements";
import { AddAchievementHeader } from "./addAchievementHeader";

interface AchievementConfirmationFormProps {
    input: AchievementInput
    handleBackButtonClick: () => void
}

export function AchievementConfirmationForm(props: AchievementConfirmationFormProps) {
    return <Grid container>
        <Grid xs={4}></Grid>
        <Grid xs={4}>
            <Stack>
                <AddAchievementHeader></AddAchievementHeader>
                <SendAchievementConfirmation
                    handleBackButtonClick={props.handleBackButtonClick}
                    workerProfileId={props.input.workerProfileId}
                    issuerProfileId={props.input.issuerProfileId}
                ></SendAchievementConfirmation>
                <AchievementInputView achievement={props.input}></AchievementInputView>
            </Stack>
        </Grid>
        <Grid xs={4}></Grid>
    </Grid>
}

interface SendAchievementConfirmationProps {
    workerProfileId: BigNumberish
    issuerProfileId: BigNumberish
    handleBackButtonClick: () => void
}

function SendAchievementConfirmation(props: SendAchievementConfirmationProps) {
    return <Paper>
        <p>The achievement will be sent for signature</p>
        <ProfileIdWithRoleView role="Issuer" profileId={props.issuerProfileId}></ProfileIdWithRoleView>
        <ProfileIdWithRoleView role="Worker" profileId={props.workerProfileId}></ProfileIdWithRoleView>
        <Stack direction="row" spacing={4}>
            <Button variant="contained" color="inherit" onClick={props.handleBackButtonClick}>Back</Button>
            <Button variant="contained" color="info">Submit</Button>
        </Stack>
    </Paper>
}