import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Achievement, LatestAchievementsView, getAchievementsCount } from "../Achievements/achievements";
import { toggleSkill } from "../Skills/skills";
import { Profile } from "../Profile/profile";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';

function Welcome() {
    return <Box>
        <h2>Welcome</h2>
    </Box>
}

export interface HomeProps {
    workerProfiles: Profile[]
    skills: string[]
    achievements: Achievement[],
    handleWorkerProfileClick: (profile: Profile) => void
}

interface HomeState {
    selectedSkills: Set<string>
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            selectedSkills: new Set<string>()
        };
    }

    handleSkillClick(skill: string): void {
        this.setState({
            selectedSkills: toggleSkill(skill, this.state.selectedSkills),
        });
    }


    render() {
        return <Box>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <LatestAchievementsView achievements={this.props.achievements}></LatestAchievementsView>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <HomeSkillList
                        skills={this.props.skills}
                        selectedSkills={this.state.selectedSkills}
                        handleClick={skill => this.handleSkillClick(skill)}></HomeSkillList>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <WorkerProfiles profiles={this.props.workerProfiles
                        .filter(p => this.state.selectedSkills.size === 0 || p.skills.some(s => this.state.selectedSkills.has(s.name)))}
                        handleClick={(p) => this.props.handleWorkerProfileClick(p)}></WorkerProfiles>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </Box>
    }
}

interface HomeSkillListProps {
    skills: string[],
    selectedSkills: Set<string>,
    handleClick: (skill: string) => void
}

function HomeSkillList(props: HomeSkillListProps) {
    return <Grid container spacing={2}>
        <Grid xs={12}><h3>Skills</h3></Grid>
        {props.skills.map(skill => {
            return <Grid xs={4}>
                <Button variant={props.selectedSkills.has(skill) ? "contained" : "outlined"} color="info" onClick={() => props.handleClick(skill)}>{skill}</Button>
            </Grid>
        })}

    </Grid>
}

interface WorkerProfilesProps {
    profiles: Profile[]
    handleClick: (profile: Profile) => void
}

function WorkerProfiles(props: WorkerProfilesProps) {
    const columns = [
        { field: "workers", headerName: "Workers", width: 150 },
        { field: "achievements", headerName: "Achievements", width: 150 },
    ];
    const rows = props.profiles.map(p => {
        return {
            id: p.id,
            workers: p.handle,
            achievements: getAchievementsCount(p)
        }
    });
    return <div style={{ height: 300, width: '75%' }}>
        <DataGrid rows={rows} columns={columns} />
    </div>
}
