import { Avatar, Box, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Skill, SkillList, toggleSkill } from "../Skills/skills";
import { mockProfiles } from "./mockProfiles";
import * as React from "react";
import { AchievementList, getAchievementsCount, getLatestAchievements } from "../Achievements/achievements";

export interface ProfileSummaryProps {
  profile: Profile
}

export function ProfileSummary(props: ProfileSummaryProps) {
  return <Stack>
    <Stack spacing={2} alignItems="center" direction="row">
      <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 75, width: 75 }}></Avatar>
      <h2>{props.profile.handle}</h2>
    </Stack>
    {props.profile.discordHandle ? <p>Discord: {props.profile.discordHandle}</p> : null}
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

  render() {
    return (
      <Grid container>
        <Grid xs={4}>
        </Grid>
        <Grid xs={4}>
          <Stack spacing={5}>
            <ProfileSummary profile={this.props.profile}></ProfileSummary>
            <Button variant="outlined" sx={{ height: 50 }}>
              <h3>{getAchievementsCount(this.props.profile)} achievements</h3>
            </Button>
            <SkillList
              skills={this.props.profile.skills.map(s => s.name)}
              selectedSkills={this.state.selectedSkills}
              handleClick={skill => this.handleSkillClick(skill)}></SkillList>
            <AchievementList achievements={getLatestAchievements(this.props.profile, this.state.selectedSkills.size > 0 ? this.state.selectedSkills : null)}></AchievementList>
          </Stack>
        </Grid>
        <Grid xs={4}>
        </Grid>
      </Grid>
    );
  }
}

export interface Profile {
  id: string,
  handle: string,
  imageUri: string,
  skills: Skill[],
  discordHandle: string | null
}

export async function getProfile(handle: string): Promise<Profile | undefined> {
  return mockProfiles.find((p) => p.handle === handle);
}