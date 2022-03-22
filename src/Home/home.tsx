import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Achievement, LatestAchievementsView, getAchievementsCount } from "../Achievements/achievements";
import { toggleSkill, SkillList } from "../Skills/skills";
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
        return <Box
            sx={{
                m:"10%",
                mt:"-50px"
         }}>
  
                    <SkillList
                        skills={this.props.skills}
                        selectedSkills={this.state.selectedSkills}
                        handleClick={skill => this.handleSkillClick(skill)}></SkillList>
             
                    <WorkerProfiles profiles={this.props.workerProfiles
                        .filter(p => this.state.selectedSkills.size === 0 || p.skills.some(s => this.state.selectedSkills.has(s.name)))}></WorkerProfiles>
                    <LatestAchievementsView achievements={this.props.achievements}></LatestAchievementsView>
         
        </Box>
    }
}


interface WorkerProfilesProps {
    profiles: Profile[]
}

function WorkerProfiles(props: WorkerProfilesProps) {
    const columns = [
        { field: "workers", headerName: "Workers", width: 200 },
        { field: "achievements", headerName: "Achievements", width: 150 },
    ];
    const rows = props.profiles.map(p => {
        return {
            id: p.id,
            workers: p.handle,
            achievements: getAchievementsCount(p)
        }
    });
    return <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
    </div>
}
