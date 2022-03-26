import { Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button } from "@mui/material"
import { Achievement } from "../Achievements/achievements"
import * as React from "react";
import { Profile } from "../Profile/profile";

export interface Skill {
    name: string,
}

export interface SkillListProps {
    skills: string[],
    selectedSkills: Set<string>,
    handleClick: (skill: string) => void
}

export function SkillList(props: SkillListProps) {
    return <Grid container spacing={2}>
        <Grid xs={12}><h2>Skills</h2></Grid>
        <Grid xs={12}>
        {props.skills.map(skill => {
            return <Button  sx={{
                m:"5px"
             }} 
             variant={props.selectedSkills.has(skill) ? "contained" : "outlined"} color="info" onClick={() => props.handleClick(skill)}>{skill}</Button>
        })}
            </Grid>            

    </Grid>
}

export async function getProfilesWithSkill(skill: string): Promise<Profile[]> {
    return []
}

export function toggleSkill(skill: string, selectedSkills: Set<string>): Set<string> {
    let newSelectedSkills: Set<string>;
    if (selectedSkills.has(skill)) {
        selectedSkills.delete(skill);
        newSelectedSkills = selectedSkills;
    } else {
        newSelectedSkills = selectedSkills.add(skill);
    }
    return newSelectedSkills;
}
