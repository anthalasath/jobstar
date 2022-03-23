import { Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button } from "@mui/material"
import { Achievement } from "../Achievements/achievements"
import * as React from "react";
import { mockProfiles } from "../Profile/mockProfiles";
import { Profile } from "../Profile/profile";

export interface Skill {
    name: string,
    achievements: Achievement[] // TODO: make it so that skills dont know about achievements, only achievmeents about skill architecture-wise
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
    return mockProfiles.filter(p => p.skills.some(s => s.name === skill));
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
