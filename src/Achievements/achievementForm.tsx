import { Button, Divider, Grid, Modal, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export interface AchievementFormProps {
    handleCancelClick: () => void
    issuerAddress: string
}

export interface AchievementFormState {
    title: string
    description: string
    skill: string
    tags: string[]
    worker: string
}

export class AchievementForm extends React.Component<AchievementFormProps, AchievementFormState> {

    constructor(props: AchievementFormProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
            skill: "",
            tags: [],
            worker: "",
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
    handleWorkerChange(worker: string): void {
        this.setState({
            worker
        });
    }

    render() {
        return <Grid container>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
                <Stack spacing={2}>
                    <Box><h3>Add an achievement</h3></Box>
                    <TextField label="Title" onChange={e => this.handleTitleChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Description" onChange={e => this.handleDescriptionChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Skill" onChange={e => this.handleSkillChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <TextField label="Worker" onChange={e => this.handleWorkerChange(e.target.value)}></TextField>
                    <Divider></Divider>
                    <p>Issuer</p>
                    <p>{this.props.issuerAddress}</p>
                    <Divider></Divider>
                    <Stack direction="row">
                        <Button variant="contained" onClick={() => this.props.handleCancelClick()}>Cancel</Button>
                        <Button variant="contained">Submit</Button>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={4}></Grid>
        </Grid>
    }
}