import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Avatar, Checkbox, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, TextField } from "@mui/material";
import { flatten } from "lodash"

const cosCsharpDeveloperJob: Job = {
  title: "C# Programmer",
  description: "Develop UI and tools for the game Clash Of Streamers"
}

const cosProject: Project = {
  name: "Clash Of Streamers",
  teamDisplayName: "The Singularity Group"
}

interface MockAchievementInput {
  skill: string,
  job: Job,
  project: Project,
  description: string,
  dateOfDelivery: Date,
}

class MockAchievementFactory {
  static lastId = 0;

  static createCoS(description: string): Achievement {
    return this.create({
      description,
      skill: "C#",
      job: cosCsharpDeveloperJob,
      project: cosProject,
      dateOfDelivery: new Date(Date.parse("31 May 2022"))
    });
  }

  static createAutomation(description: string, project: Project, dateOfDelivery: Date): Achievement {
    return this.create({
      description,
      skill: "NodeJS",
      job: {
        title: "Automation developer",
        description: "Develop automated internal tools"
      },
      project: {
        name: "DUBIex bot",
        teamDisplayName: "The Singularity Group"
      },
      dateOfDelivery: new Date(Date.parse("31 June 2018"))
    });
  }

  static create(input: MockAchievementInput): Achievement {
    const id = (++this.lastId).toString();
    return {
      id,
      skill: input.skill,
      project: input.project,
      description: input.description,
      dateOfDelivery: input.dateOfDelivery,
      job: input.job
    }
  }
}

const profiles: Profile[] = [
  {
    id: "1",
    handle: "Anthalasath",
    imageUri:
      "https://pbs.twimg.com/profile_images/1297158984730902528/5cGwqw-I_400x400.png",
    skills: [
      {
        name: "C#",
        achievements: [
          MockAchievementFactory.createCoS("Developed the HotStories feature"),
          MockAchievementFactory.createCoS("Developed the Hyperlinks feature and API"),
          MockAchievementFactory.createCoS("Developed the support ticket feature and API"),
          MockAchievementFactory.createCoS("Developed the HotStories posts API"),
          MockAchievementFactory.createCoS("Optimized code across the HotStories feature"),
          MockAchievementFactory.createCoS("Optimized code across the Hyperlinks feature")
        ]
      },
      {
        name: "NodeJS", achievements: [
          MockAchievementFactory.createAutomation("Developed the DUBIex trading bot",
            {
              name: "DUBIex bot",
              teamDisplayName: "The Singularity Group"
            },
            new Date(Date.parse("31 June 2018"))
          ),
          MockAchievementFactory.createAutomation("Developed a fraudulent transaction detection system",
            {
              name: "Gaming For Good",
              teamDisplayName: "The Singularity Group"
            },
            new Date(Date.parse("31 June 2018"))
          )
        ]
      },
      {
        name: "Solidity", achievements: [
          MockAchievementFactory.create({
            skill: "Solidity",
            project: {
              name: "DUBIex",
              teamDisplayName: "The Singularity Group"
            },
            description: "Audited smart contracts",
            dateOfDelivery: new Date(Date.parse("31 May 2018")),
            job: {
              title: "Generalist Programmer",
              description: "Help out across a variety of projects and technologies"
            }
          })
        ]
      },
      { name: "Git", achievements: [] },
    ]
  },
];
interface Project {
  name: string,
  teamDisplayName: string
}

interface Job {
  title: string,
  description: string
}

interface Achievement {
  skill: string,
  job: Job,
  project: Project,
  description: string,
  dateOfDelivery: Date,
  id: string
}

interface Skill {
  name: string,
  achievements: Achievement[]
}

interface Profile {
  id: string,
  handle: string,
  imageUri: string,
  skills: Skill[]
}

function getLatestAchievements(profile: Profile, skills: Set<string> | null): Achievement[] {
  const achievements: Achievement[] = flatten(
    profile.skills
      .filter(skill => skills === null || skills.has(skill.name))
      .map(skill => skill.achievements));
  console.log(JSON.stringify(achievements, null, 1));
  return achievements.sort(a => a.dateOfDelivery.getTime());
}

async function getProfile(handle: string): Promise<Profile> {
  return profiles.find((p) => p.handle === handle);
}

function SkillList(props: { skills: Skill[], selectedSkills: Set<string>, handleClick: (skill: string) => void }) {
  return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}><List>
    {props.skills
      .sort(skill => 0 - skill.achievements.length)
      .map(skill => <SkillListItemView
        key={skill.name}
        isChecked={props.selectedSkills.has(skill.name)}
        skill={skill}
        handleClick={props.handleClick}></SkillListItemView>)
    }
  </List>
  </Paper>
}

function SkillListItemView(props: { skill: Skill, isChecked: boolean, handleClick: (skill: string) => void }) {
  return <ListItem>
    <ListItemButton onClick={() => props.handleClick(props.skill.name)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={props.isChecked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': props.skill.name }}
        />
      </ListItemIcon>
      <ListItemText primary={`${props.skill.name} (${props.skill.achievements.length})`}></ListItemText>
    </ListItemButton>
  </ListItem>
}

function ProfileView(props: { profile: Profile, selectedSkills: Set<string>, handleSkillClick: (skill: string) => void }) {
  return (
    <Stack spacing={2} alignItems="center">
      <h1>{props.profile.handle}</h1>
      <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 150, width: 150 }}></Avatar>
      <SkillList skills={props.profile.skills} selectedSkills={props.selectedSkills} handleClick={props.handleSkillClick}></SkillList>
    </Stack>
  );
}

function ProfileSearchField(props: { handleChange: (value: any) => void }) {
  return (
    <TextField
      id="outlined-basic"
      label="Search by handle"
      variant="outlined"
      onChange={(value) => props.handleChange(value)}
    />
  );
}


function formatDate(date: Date): string {
  return Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric' }).format(date);
}

function formatAchievement(achievement: Achievement): string {
  return `${achievement.description}. Project: ${achievement.project.name}. Team: ${achievement.project.teamDisplayName}. Delievered: ${formatDate(achievement.dateOfDelivery)}`;
}

function AchievementView(props: { achievement: Achievement }): JSX.Element {
  return <ListItem>
    <ListItemText primary={formatAchievement(props.achievement)}></ListItemText>
  </ListItem>
}

function AchievementList(props: { achievements: Achievement[] }): JSX.Element {
  return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}><List>
    {props.achievements
      .sort(achievement => 0 - achievement.dateOfDelivery.getTime())
      .map(achievement => <AchievementView key={achievement.id} achievement={achievement}></AchievementView>)
    }
  </List>
  </Paper>
}

interface AppState {
  profile: Profile,
  searchQuery: string,
  selectedSkills: Set<string>
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      searchQuery: null,
      selectedSkills: new Set<string>()
    };
  }

  async handleChange(searchQuery: string) {
    const profile = await getProfile(searchQuery);
    this.setState({ profile: profile, searchQuery });
  }

  handleSkillClick(skill: string) {
    const selectedSkills = this.state.selectedSkills;
    let newSelectedSkills: Set<string>;
    if (selectedSkills.has(skill)) {
      selectedSkills.delete(skill);
      newSelectedSkills = selectedSkills;
    } else {
      newSelectedSkills = selectedSkills.add(skill);
    }
    this.setState({ selectedSkills: newSelectedSkills });
  }

  render() {
    const searchField = (
      <>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <ProfileSearchField
            handleChange={(e) => this.handleChange(e.target.value)}
          ></ProfileSearchField>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </>
    );

    if (this.state.profile) {
      return <Grid container spacing={2}>
        {searchField}
        <Grid item xs={6}>
          <ProfileView
            profile={this.state.profile}
            selectedSkills={this.state.selectedSkills}
            handleSkillClick={skill => this.handleSkillClick(skill)}
          ></ProfileView>
        </Grid>
        <Grid item xs={6}>
          <AchievementList
            achievements={getLatestAchievements(
              this.state.profile,
              this.state.selectedSkills.size > 0 ? this.state.selectedSkills : null
            )}>
          </AchievementList>
        </Grid>
      </Grid>
    } else {
      return <Grid container spacing={2}>
        {searchField}
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <p>Profile "{this.state.searchQuery}" not found</p>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
