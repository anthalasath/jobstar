import { Button, Grid, Modal, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export interface AddAchievementPageProps {
    handleCancelClick: () => void
}

export interface AddAchievementPageState {
    title: string
    description: string
    skill: string
    tags: string[]
    worker: string
}

interface TextFieldWithLabelProps {
    label: string,
    handleChange: (value: string) => void
}

function TextFieldWithLabel(props: TextFieldWithLabelProps) {
    return <Stack direction="row">
        <p>{props.label}</p>
        <TextField></TextField>
    </Stack>
}

export class AddAchievementPage extends React.Component<AddAchievementPageProps, AddAchievementPageState> {

    constructor(props: AddAchievementPageProps) {
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
        return <Stack>
            <Box><h3>Add an achievement</h3></Box>
            <TextFieldWithLabel label="Title" handleChange={this.handleTitleChange}></TextFieldWithLabel>
            <TextFieldWithLabel label="Description" handleChange={this.handleDescriptionChange}></TextFieldWithLabel>
            <TextFieldWithLabel label="Skill" handleChange={this.handleSkillChange}></TextFieldWithLabel>
            <TextFieldWithLabel label="Worker" handleChange={this.handleWorkerChange}></TextFieldWithLabel>
            <Stack direction="row">
                <Button variant="contained"onClick={() => this.props.handleCancelClick()}>Cancel</Button>
                <Button variant="contained">Submit</Button>
            </Stack>
        </Stack>
    }
}