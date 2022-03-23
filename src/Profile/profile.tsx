import { Avatar, Box, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Skill, SkillList, toggleSkill } from "../Skills/skills";
import { mockProfiles } from "./mockProfiles";
import * as React from "react";
import { AchievementList, getAchievementsCount, getLatestAchievements } from "../Achievements/achievements";
import { khKH } from "@mui/material/locale";
import { firstCharToUpper } from "../utils";
import { BigNumberish } from "ethers";

export interface ProfileSummaryProps {
  profile: Profile
}


export function ProfileSummary(props: ProfileSummaryProps) {
  return <Stack>
    <Stack spacing={2} alignItems="center" direction="row">
      <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 75, width: 75 }}></Avatar>
      <h2>{props.profile.handle}</h2>
    </Stack>
    {props.profile.socialMediaHandles ? <SocialMediaHandlesView handles={props.profile.socialMediaHandles}></SocialMediaHandlesView> : null}
  </Stack>
}

export interface SocialMediaHandlesViewProps {
  handles: SocialMediaHandles
}

export function SocialMediaHandlesView(props: SocialMediaHandlesViewProps) {
  return <Stack>
    {Object.keys(props.handles).map(k => props.handles[k] ? <span>{firstCharToUpper(k)}: {props.handles[k]}</span> : null)}
  </Stack>
}

export interface ProfilePageProps {
  profile: Profile
}

interface ProfilePageState {
  selectedSkills: Set<string>
}


export class ProfilePageView extends React.Component<ProfilePageProps, ProfilePageState> {

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
  id: BigNumberish,
  handle: string,
  imageUri: string,
  skills: Skill[],
  socialMediaHandles: SocialMediaHandles | null
}

export interface SocialMediaHandles {
  [key: string]: string | null,
  discord: string | null,
  telegram: string | null
  twitter: string | null
}

export async function getProfile(handle: string): Promise<Profile | undefined> {
  return mockProfiles.find((p) => p.handle === handle);
}