import { Avatar, Button, Chip, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material"
import { flatten } from "lodash"
import { Profile } from "../Profile/profile";
import { formatDate, ProfileWithRoleView } from "../utils";
import * as React from "react";
import { mockProfiles } from "../Profile/mockProfiles";
import { Circle } from '@mui/icons-material';
import { DataGrid } from "@mui/x-data-grid";
import { SkillList } from "../Skills/skills";
import { BigNumberish } from "ethers";

const placeholderAvatar = ""; // TODO FIX using image


export interface AchievementInput {
    skill: string,
    title: string
    description: string,
    issuerProfileId: BigNumberish
    workerProfileId: BigNumberish
    dateOfDelivery: Date,
    imageUri: string | null
}

export interface Achievement extends AchievementInput {
    id: string,
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
    return `${achievement.title} | ${formatDate(achievement.dateOfDelivery)} | ${achievement.skill}`;
}

export interface AchievementListProps {
    achievements: Achievement[]
}

export function AchievementList(props: AchievementListProps): JSX.Element {
    const columns = [
        { field: "achievements", headerName: "Achievements", width: 200 },
        { field: "date", headerName: "Date", width: 200 }
    ];
    const rows = props.achievements.map(a => {
        return {
            id: a.id,
            achievements: a.description,
            date: formatDate(a.dateOfDelivery)            
        }
    });
    // TODO: https://github.com/mui/mui-x/issues/1040#issuecomment-780484281 for seeing full cell content
    return <Stack>
        <h3>Browse achievements</h3>
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    </Stack>
}

// TODO: Profile handles
export function AchievementInputView(props: { achievement: AchievementInput }): JSX.Element {
    console.log(JSON.stringify(mockProfiles, null, 1))
    return <Stack>
        <p>{props.achievement.title}</p>
        <SkillList skills={[props.achievement.skill]} selectedSkills={new Set<string>()} handleClick={() => { }}></SkillList>
        {props.achievement.imageUri ? <Avatar variant="square" src={props.achievement.imageUri} /> : null}
        <p>{props.achievement.description}</p>
        <ProfileWithRoleView role="Worker" name={"Worker profile handle"} profileId={props.achievement.workerProfileId}></ProfileWithRoleView>
        <ProfileWithRoleView role="Issuer" name={"Issuer profile handle"} profileId={props.achievement.issuerProfileId}></ProfileWithRoleView>
    </Stack>
}

function AchievementSummaryView(props: { achievement: Achievement }): JSX.Element {
    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="avatar" src={props.achievement.imageUri ? props.achievement.imageUri : placeholderAvatar} sx={{ height: 50, width: 50 }}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={getSummary(props.achievement)}></ListItemText>
    </ListItem>
}

export interface AchievementSummaryListProps {
    achievements: Achievement[]
}

export function AchievementSummaryList(props: AchievementSummaryListProps): JSX.Element {
    return <Paper style={{ maxHeight: 250, maxWidth: 600, overflow: "auto" }}>
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
        <Grid container spacing={2}>
            <Grid xs={12}><h2>Latest achievements</h2></Grid>
            <AchievementSummaryList achievements={props.achievements}></AchievementSummaryList>
        </Grid>
    </Stack>
}