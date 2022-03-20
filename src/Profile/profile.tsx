import { Avatar, Stack } from "@mui/material";
import { Skill, SkillList } from "../Skills/skills";
import { mockProfiles } from "./mockProfiles";
import * as React from "react";

export function ProfileView(props: { profile: Profile, selectedSkills: Set<string>, handleSkillClick: (skill: string) => void }) {
    return (
      <Stack spacing={2} alignItems="center">
        <h2>{props.profile.handle}</h2>
        <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 150, width: 150 }}></Avatar>
        <SkillList skills={props.profile.skills} selectedSkills={props.selectedSkills} handleClick={props.handleSkillClick}></SkillList>
      </Stack>
    );
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