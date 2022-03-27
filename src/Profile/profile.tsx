import { Avatar, Box, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { SkillList, toggleSkill } from "../Skills/skills";
import * as React from "react";
import { Achievement, AchievementList, getLatestAchievements } from "../Achievements/achievements";
import { khKH } from "@mui/material/locale";
import { firstCharToUpper } from "../utils";
import { BigNumber, BigNumberish, Contract } from "ethers";
import { LensProfile } from "../Lens/lens";

export interface ProfileSummaryProps {
  profile: Profile
}


export function ProfileSummary(props: ProfileSummaryProps) {
  return <Stack>
    <Stack spacing={2} alignItems="center" direction="row">
      <Avatar alt="avatar" src={props.profile.imageURI} sx={{ height: 75, width: 75 }}></Avatar>
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
  jobStar: Contract
}

interface ProfilePageState {
  selectedSkills: Set<string>
  achievements: Achievement[]
}


export class ProfilePageView extends React.Component<ProfilePageProps, ProfilePageState> {

  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {
      selectedSkills: new Set<string>(),
      achievements: []
    };
  }

  async componentDidMount(): Promise<void> {
    const achievements = await getLatestAchievements(this.props.jobStar, this.props.profile.id, this.state.selectedSkills.size > 0 ? this.state.selectedSkills : null);
    this.setState({ achievements });
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
              <h3>{this.state.achievements.length} achievements</h3>
            </Button>
            <SkillList
              skills={this.props.profile.skills}
              selectedSkills={this.state.selectedSkills}
              handleClick={skill => this.handleSkillClick(skill)}></SkillList>
            <AchievementList achievements={this.state.achievements}></AchievementList>
          </Stack>
        </Grid>
        <Grid xs={4}>
        </Grid>
      </Grid>
    );
  }
}

export interface Profile extends LensProfile {
  skills: string[],
  socialMediaHandles: SocialMediaHandles | null
}

export interface SocialMediaHandles {
  [key: string]: string | null,
  discord: string | null,
  telegram: string | null
  twitter: string | null
}

