import { Avatar, Button, Chip, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material"
import { flatten } from "lodash"
import { Profile } from "../Profile/profile";
import { formatDate } from "../utils";
import { Job, Project } from "../Skills/skills";
import * as React from "react";
import { mockProfiles } from "../Profile/mockProfiles";

const placeholderAvatar = ""; // TODO FIX using image

export interface Achievement {
    skill: string,
    job: Job,
    project: Project,
    description: string,
    dateOfDelivery: Date,
    id: string,
    issuer: string
}

export async function getLatestAchievementsAll(skills: Set<string> | null): Promise<Achievement[]> {
    return flatten(mockProfiles
        .map(p => getLatestAchievements(p, skills)))
        ;
}

export function getAchievementsCount(profile: Profile): number {
    const achievements: Achievement[] = flatten(
        profile.skills
            .map(skill => skill.achievements));
    return achievements.length;
}

export function getLatestAchievements(profile: Profile, skills: Set<string> | null): Achievement[] {
    const achievements: Achievement[] = flatten(
        profile.skills
            .filter(skill => skills === null || skills.has(skill.name))
            .map(skill => skill.achievements));
    return achievements.sort(a => a.dateOfDelivery.getTime());
}


function getSummary(achievement: Achievement): string {
    return `${achievement.job.title} | ${formatDate(achievement.dateOfDelivery)} | ${achievement.skill}`;
}


export function AchievementView(props: { achievement: Achievement }): JSX.Element {
    return <ListItem alignItems="flex-start">
        <Grid container>
            <Grid xs={12}>
                <h3>{props.achievement.project.name}</h3>
            </Grid>
            <Grid xs={6}>
                <Chip label={props.achievement.skill} color="success"/>
            </Grid>
            <Grid xs={6} sx={{ fontSize: "70%" }}>
                <p>{formatDate(props.achievement.dateOfDelivery)}</p>
            </Grid>
            <Grid xs={12}>
                <ListItemText primary={props.achievement.description}></ListItemText>
            </Grid>
            <Grid xs={6} sx={{ fontSize: "70%" }}>
                <p>Job: {props.achievement.job.title}</p>
            </Grid>
            <Grid xs={6} sx={{ fontSize: "70%" }}>
                <p>Issuer: {props.achievement.issuer}</p>
            </Grid>
            <Grid xs={6}>
                <Button variant="outlined">Job ???</Button>
            </Grid>
            <Grid xs={6}>
                <Button variant="outlined">{props.achievement.project.teamDisplayName}</Button>
            </Grid>
        </Grid>
    </ListItem>
}

export interface AchievementListProps {
    achievements: Achievement[]
}

export function AchievementList(props: AchievementListProps): JSX.Element {
    return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}>
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

function AchievementSummaryView(props: { achievement: Achievement }): JSX.Element {
    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="avatar" src={props.achievement.project.imageUri ? props.achievement.project.imageUri : placeholderAvatar} sx={{ height: 50, width: 50 }}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={getSummary(props.achievement)}></ListItemText>
    </ListItem>
}

export interface AchievementSummaryListProps {
    achievements: Achievement[]
}

export function AchievementSummaryList(props: AchievementSummaryListProps): JSX.Element {
    return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}>
        <List>
            {props.achievements
                .sort(achievement => achievement.dateOfDelivery.getTime())
                .map(achievement => <>
                    <AchievementSummaryView key={achievement.id} achievement={achievement}></AchievementSummaryView>
                    <Divider />
                </>)
            }
        </List>
    </Paper>
}

export function LatestAchievementsView(props: { achievements: Achievement[] }): JSX.Element {
    return <Stack>
        <h2>Latest achievements</h2>
        <AchievementSummaryList achievements={props.achievements}></AchievementSummaryList>
    </Stack>
}