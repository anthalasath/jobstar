import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material"
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
    skills: Skill[],
    selectedSkills: Set<string>,
    handleClick: (skill: string) => void
}

export function SkillList(props: SkillListProps) {
    return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}><List>
        {props.skills
            .sort(skill => 0 - skill.achievements.length)
            .map(skill => <SkillListItemView
                key={skill.name}
                isChecked={props.selectedSkills.has(skill.name)}
                skill={skill}
                handleClick={props.handleClick}></SkillListItemView>)
        }
    </List>
    </Paper>
}

function SkillListItemView(props: { skill: Skill, isChecked: boolean, handleClick: (skill: string) => void }) {
    return <ListItem>
        <ListItemButton onClick={() => props.handleClick(props.skill.name)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={props.isChecked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': props.skill.name }}
                />
            </ListItemIcon>
            <ListItemText primary={`${props.skill.name} (${props.skill.achievements.length})`}></ListItemText>
        </ListItemButton>
    </ListItem>
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