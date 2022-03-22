import { Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button } from "@mui/material"
import { Achievement } from "../Achievements/achievements"
import * as React from "react";
import { mockProfiles } from "../Profile/mockProfiles";
import { Profile } from "../Profile/profile";


export interface Project {
    name: string,
    teamDisplayName: string,
    imageUri: string
}

export interface Job {
    title: string,
    description: string
}


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
        <Grid xs={12}><h3>Skills</h3></Grid>
        {props.skills.map(skill => {
            return <Grid xs={4}>
                <Button variant={props.selectedSkills.has(skill) ? "contained" : "outlined"} color="info" onClick={() => props.handleClick(skill)}>{skill}</Button>
            </Grid>
        })}

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
