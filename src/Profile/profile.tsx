import { Avatar, Box, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Skill, SkillList, toggleSkill } from "../Skills/skills";
import { mockProfiles } from "./mockProfiles";
import * as React from "react";
import { AchievementList, getAchievementsCount, getLatestAchievements } from "../Achievements/achievements";

export interface ProfileSummaryProps {
  profile: Profile
}

export function ProfileSummary(props: ProfileSummaryProps) {
  return <Stack spacing={2} alignItems="center" >
    <h2>{props.profile.handle}</h2>
    <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 150, width: 150 }}></Avatar>
  </Stack>
}

export interface ProfilePageProps {
  profile: Profile
}

interface ProfilePageState {
  selectedSkills: Set<string>
}


export class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {

  constructor(props: ProfilePageProps) {
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

  renderAchievements(): JSX.Element | null {
    if (this.state.selectedSkills.size > 0) {
      return <AchievementList achievements={getLatestAchievements(this.props.profile, this.state.selectedSkills)}></AchievementList>
    }
    return <Button variant="outlined">
      <h3>{getAchievementsCount(this.props.profile)} achievements</h3>
    </Button>;
  }

  render() {
    return (
      <Grid container>
        <Grid xs={12}>
          <ProfileSummary profile={this.props.profile}></ProfileSummary>
        </Grid>
        <Grid xs={4}>
        </Grid>
        <Grid xs={4}>
          <h3>Skills and Achievements</h3>
        </Grid>
        <Grid xs={4}>
        </Grid>
        <Grid xs={3}>
        </Grid>
        <Grid xs={3}>
          <SkillList skills={this.props.profile.skills} selectedSkills={this.state.selectedSkills} handleClick={skill => this.handleSkillClick(skill)}></SkillList>
        </Grid>
        <Grid xs={1}>
        </Grid>
        <Grid xs={3}>
          {this.renderAchievements()}
        </Grid>
        <Grid xs={2}>
        </Grid>
      </Grid>
    );
  }
}

export interface Profile {
  id: string,
  handle: string,
  imageUri: string,
  skills: Skill[]
}

export async function getProfile(handle: string): Promise<Profile | undefined> {
  return mockProfiles.find((p) => p.handle === handle);
}