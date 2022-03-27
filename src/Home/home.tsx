import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Achievement, getLatestAchievementsAll, LatestAchievementsView } from "../Achievements/achievements";
import { toggleSkill, SkillList } from "../Skills/skills";
import { Profile } from "../Profile/profile";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { BigNumber, Contract } from "ethers";
import { uniq } from "lodash";
import { LensProfile, LensProtocol } from "../Lens/lens";

export interface HomeProps {
    skills: string[]
    jobStar: Contract
    lens: LensProtocol
}

interface HomeState {
    selectedSkills: Set<string>
    achievements: Achievement[]
    workerProfiles: Profile[]
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            achievements: [],
            selectedSkills: new Set<string>(),
            workerProfiles: []
        };
    }

    async componentDidMount(): Promise<void> {
        const achievements = await getLatestAchievementsAll(this.props.jobStar, null);
        const workerIds = uniq(await Promise.all(achievements.map(a => a.content.workerProfileId)));
        const workerLensProfiles = await this.props.lens.getProfilesByIds(workerIds);
        const workerProfiles: Profile[] = await Promise.all(workerLensProfiles.map(async p => {
            const skills = await this.props.jobStar.getSkills(p.id);
            return { id: p.id, handle: p.handle, imageURI: p.imageURI, skills: skills, socialMediaHandles: null };
        }));

        this.setState({
            achievements,
            workerProfiles
        });
    }

    handleSkillClick(skill: string): void {
        this.setState({
            selectedSkills: toggleSkill(skill, this.state.selectedSkills),
        });
    }


    render() {
        return <Box>
            <Grid container spacing={2}>
                {/*
                 */}
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <LatestAchievementsView achievements={this.state.achievements}></LatestAchievementsView>
                </Grid>
                <Grid item xs={4}>
                </Grid>

                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <SkillList
                        skills={this.props.skills}
                        selectedSkills={this.state.selectedSkills}
                        handleClick={skill => this.handleSkillClick(skill)}></SkillList>
                    <WorkerProfiles profiles={this.state.workerProfiles
                        .filter(p => this.state.selectedSkills.size === 0 || p.skills.some(s => this.state.selectedSkills.has(s)))}></WorkerProfiles>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </Box>
    }
}

interface WorkerProfilesProps {
    profiles: Profile[]
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
            achievements: 0 // TODO
        }
    });
    return <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
    </div>
}
