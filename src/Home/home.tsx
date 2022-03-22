import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Checkbox, Button } from "@mui/material";
import { Box } from "@mui/system";
import { ProfileSearchField } from "../ProfileSearchField/profileSearchField";
import { Achievement, LatestAchievementsView } from "../Achievements/achievements";
import { JobStarHeader } from "../Header/header";
import { SkillList, toggleSkill } from "../Skills/skills";
import { Profile } from "../Profile/profile";
import { mockProfiles } from "../Profile/mockProfiles";
import * as React from "react";

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
                <Grid item xs={6}>
                    <Welcome></Welcome>
                </Grid>
                <Grid item xs={6}>
                    <LatestAchievementsView achievements={this.props.achievements}></LatestAchievementsView>
                </Grid>
                <Grid item xs={6}>
                    <WorkerProfiles profiles={this.props.workerProfiles
                        .filter(p => this.state.selectedSkills.size === 0 || p.skills.some(s => this.state.selectedSkills.has(s.name)))}
                        handleClick={(p) => this.props.handleWorkerProfileClick(p)}></WorkerProfiles>
                </Grid>
                <Grid item xs={6}>
                    <HomeSkillList
                        skills={this.props.skills}
                        selectedSkills={this.state.selectedSkills}
                        handleClick={skill => this.handleSkillClick(skill)}></HomeSkillList>
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
    return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}><List>
        {props.skills
            .map(skill => <HomeSkillListItemView
                key={skill}
                isChecked={props.selectedSkills.has(skill)}
                skill={skill}
                handleClick={props.handleClick}></HomeSkillListItemView>)
        }
    </List>
    </Paper>
}

interface HomeSkillListItemViewProps {
    skill: string,
    isChecked: boolean,
    handleClick: (skill: string) => void
}

function HomeSkillListItemView(props: HomeSkillListItemViewProps) {
    return <ListItem>
        <ListItemButton onClick={() => props.handleClick(props.skill)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={props.isChecked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': props.skill }}
                />
            </ListItemIcon>
            <ListItemText primary={props.skill}></ListItemText>
        </ListItemButton>
    </ListItem>
}

interface WorkerProfilesProps {
    profiles: Profile[]
    handleClick: (profile: Profile) => void
}

function WorkerProfiles(props: WorkerProfilesProps) {
    return <Grid container spacing={1}>
        <Grid item xs={12}>
            <h3>Worker profile</h3>
        </Grid>
        {props.profiles.map(p => {
            return <Grid item xs={6}>
                <ProfileHandle profile={p} handleClick={() => props.handleClick(p)}></ProfileHandle>
            </Grid>
        })}
    </Grid>
}

interface ProfileHandleViewProps {
    profile: Profile
    handleClick: () => void
}


function ProfileHandle(props: ProfileHandleViewProps) {
    return <Button variant="outlined" onClick={() => props.handleClick()}>{props.profile.handle}</Button>
}