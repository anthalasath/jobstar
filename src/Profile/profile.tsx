import { Avatar, Stack } from "@mui/material";
import { Skill, SkillList, toggleSkill } from "../Skills/skills";
import { mockProfiles } from "./mockProfiles";
import * as React from "react";

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
      <Stack spacing={2} alignItems="center" >
        <h2>{this.props.profile.handle}</h2>
        <Avatar alt="avatar" src={this.props.profile.imageUri} sx={{ height: 150, width: 150 }}></Avatar>
        <SkillList
          skills={this.props.profile.skills}
          selectedSkills={this.state.selectedSkills}
          handleClick={skill => this.handleSkillClick(skill)}>  </SkillList>
      </Stack>
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