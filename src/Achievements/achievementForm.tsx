import { Button, Divider, Grid, Modal, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { BigNumber } from "ethers";
import * as React from "react";
import { ProfileIdWithRoleView } from "../utils";
import { AchievementInput } from "./achievements";
import { AddAchievementHeader } from "./addAchievementHeader";

export interface AchievementFormProps {
    handleSubmitClick: (input: AchievementInput) => void
    handleCancelClick: () => void
    issuerProfileId: BigNumber
}

export interface AchievementFormState {
    title: string
    description: string
    skill: string
    tags: string[]
    workerProfileId: BigNumber
}

export class AchievementForm extends React.Component<AchievementFormProps, AchievementFormState> {

    constructor(props: AchievementFormProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
            skill: "",
            tags: [],
            workerProfileId: BigNumber.from(0),
        };
    }

    handleTitleChange(title: string): void {
        this.setState({
            title
        });
    }
    handleDescriptionChange(description: string): void {
        this.setState({
            description
        });
    }
    handleSkillChange(skill: string): void {
        this.setState({
            skill
        });
    }
    handleWorkerChange(worker: BigNumber): void {
        this.setState({
            workerProfileId: BigNumber.from(0)
        });
    }

    render() {
        return <Grid container>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
                <Stack spacing={2}>
                    <AddAchievementHeader></AddAchievementHeader>
                    <TextField label="Title" onChange={e => this.handleTitleChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Description" onChange={e => this.handleDescriptionChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Skill" onChange={e => this.handleSkillChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Worker" onChange={e => this.handleWorkerChange(BigNumber.from(e.target.value))}></TextField>
                    <Divider></Divider>
                    <ProfileIdWithRoleView role="Issuer" profileId={this.props.issuerProfileId}></ProfileIdWithRoleView>
                    <Divider></Divider>
                    <Grid container>
                        <Grid xs={4}>
                        </Grid>
                        <Grid xs={4}>
                            <Stack spacing={2}>
                                <Button variant="contained" color="info" onClick={() => this.props.handleSubmitClick({
                                    issuerProfileId: this.props.issuerProfileId,
                                    workerProfileId: this.state.workerProfileId,
                                    description: this.state.description,
                                    skill: this.state.skill,
                                    title: this.state.title,
                                    dateOfDelivery: new Date(),
                                    imageUri: null
                                })}>Submit</Button>
                                <Button variant="contained" color="inherit" onClick={() => this.props.handleCancelClick()}>Cancel</Button>
                            </Stack>
                        </Grid>
                        <Grid xs={4}>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
            <Grid xs={4}></Grid>
            <hr />
        </Grid>

    }
}

