import { Avatar, Button, Chip, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material"
import { flatten } from "lodash"
import { Profile } from "../Profile/profile";
import { formatDate, ProfileWithRoleView } from "../utils";
import * as React from "react";
import { Circle } from '@mui/icons-material';
import { DataGrid } from "@mui/x-data-grid";
import { SkillList } from "../Skills/skills";
import * as ethers from "ethers";

const placeholderAvatar = ""; // TODO FIX using image


export interface AchievementContent {
    issuerProfileId: ethers.BigNumber
    workerProfileId: ethers.BigNumber
    title: string
    description: string
    dateOfDelivery: ethers.BigNumber
    imageUri: string | null
    skill: string
}

export interface Achievement {
    id: ethers.BigNumber
    content: AchievementContent
    isAccepted: boolean
}

export async function getLatestAchievementsAll(jobStar: ethers.Contract, skills: Set<string> | null): Promise<Achievement[]> {
    const filter = jobStar.filters.AchievementAccepted();
    const events = await jobStar.queryFilter(filter);
    const achievements: Achievement[] = await Promise.all(events.map(e => jobStar.getAchievementById(e.args!.achievementId)));
    return achievements.filter(a => skills === null || skills.has(a.content.skill));
}

export async function getLatestAchievements(jobStar: ethers.Contract, profileId: ethers.BigNumber, skills: Set<string> | null): Promise<Achievement[]> {
    const filter = jobStar.filters.AchievementAccepted(null, profileId);
    const events = await jobStar.queryFilter(filter);
    const achievements: Achievement[] = await Promise.all(events.map(e => jobStar.getAchievementById(e.args!.achievementId)));
    return achievements.filter(a => skills === null || skills.has(a.content.skill));
}

function getSummary(achievement: Achievement): string {
    return `${achievement.content.title} | ${formatDate(achievement.content.dateOfDelivery)} | ${achievement.content.skill}`;
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
            achievements: a.content.description,
            date: formatDate(a.content.dateOfDelivery)
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

interface AchievementInputViewProps {
    achievement: AchievementContent
}

interface AchievementInputViewState {
    workerHandle: string
    issuerHandle: string
}

export class AchievementInputView extends React.Component<AchievementInputViewProps, AchievementInputViewState> {
    constructor(props: AchievementInputViewProps) {
        super(props);
        this.state = {
            workerHandle: "Unknown",
            issuerHandle: "Unknown"
        };
    }

    async componentDidMount(): Promise<void> {
        const getHandle = async (profileId: ethers.BigNumber) => {
            return "Unknown";
        };
        const workerHandle = await getHandle(this.props.achievement.workerProfileId);
        const issuerHandle = await getHandle(this.props.achievement.issuerProfileId);
        this.setState({ workerHandle, issuerHandle });
    }

    render() {
        return <Stack>
            <p>{this.props.achievement.title}</p>
            <SkillList skills={[this.props.achievement.skill]} selectedSkills={new Set<string>()} handleClick={() => { }}></SkillList>
            {this.props.achievement.imageUri ? <Avatar variant="square" src={this.props.achievement.imageUri} /> : null}
            <p>{this.props.achievement.description}</p>
            <ProfileWithRoleView role="Worker" name={this.state.workerHandle} profileId={this.props.achievement.workerProfileId}></ProfileWithRoleView>
            <ProfileWithRoleView role="Issuer" name={this.state.issuerHandle} profileId={this.props.achievement.issuerProfileId}></ProfileWithRoleView>
        </Stack>
    }
}

function AchievementSummaryView(props: { achievement: Achievement }): JSX.Element {
    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="avatar" src={props.achievement.content.imageUri ? props.achievement.content.imageUri : placeholderAvatar} sx={{ height: 50, width: 50 }}></Avatar>
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
                .sort(achievement => achievement.content.dateOfDelivery.toNumber())
                .map(achievement => <>
                    <AchievementSummaryView key={achievement.id.toString()} achievement={achievement}></AchievementSummaryView>
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