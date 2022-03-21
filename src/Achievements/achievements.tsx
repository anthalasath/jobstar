import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material"
import { flatten } from "lodash"
import { Profile } from "../Profile/profile";
import { formatDate } from "../utils";
import { Job, Project } from "../Skills/skills";
import * as React from "react";

const placeholderAvatar = ""; // TODO FIX using image

export interface Achievement {
    skill: string,
    job: Job,
    project: Project,
    description: string,
    dateOfDelivery: Date,
    id: string
}

export function getLatestAchievements(profile: Profile, skills: Set<string> | null): Achievement[] {
    const achievements: Achievement[] = flatten(
        profile.skills
            .filter(skill => skills === null || skills.has(skill.name))
            .map(skill => skill.achievements));
    return achievements.sort(a => a.dateOfDelivery.getTime());
}


function formatAchievement(achievement: Achievement): string {
    return `${achievement.description}. Project: ${achievement.project.name}. Team: ${achievement.project.teamDisplayName}. Delivered: ${formatDate(achievement.dateOfDelivery)}`;
}


function AchievementView(props: { achievement: Achievement }): JSX.Element {
    return <ListItem>
        <ListItemAvatar>
            <Avatar alt="avatar" src={props.achievement.project.imageUri ? props.achievement.project.imageUri : placeholderAvatar} sx={{ height: 50, width: 50 }}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={formatAchievement(props.achievement)}></ListItemText>
    </ListItem>
}

export function AchievementList(props: { achievements: Achievement[] }): JSX.Element {
    return <Paper style={{ maxHeight: 600, maxWidth: 400, overflow: "auto" }}>
        <List>
            {props.achievements
                .sort(achievement => achievement.dateOfDelivery.getTime())
                .map(achievement => <>
                    <AchievementView key={achievement.id} achievement={achievement}></AchievementView>
                    <Divider />
                </>)
            }
        </List>
    </Paper>
}

