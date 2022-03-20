import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Avatar, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const profiles: Profile[] = [
  {
    handle: "Anthalasath",
    imageUri:
      "https://pbs.twimg.com/profile_images/1297158984730902528/5cGwqw-I_400x400.png",
    skills: [
      { name: "C#", achievementsCount: 34 },
      { name: "Javascript", achievementsCount: 12 },
      { name: "Solidity", achievementsCount: 10 }
    ]
  },
];

interface Skill {
  name: string,
  achievementsCount: number
}

interface Profile {
  handle: string,
  imageUri: string,
  skills: Skill[]
}

async function getProfile(handle): Promise<Profile> {
  return profiles.find((p) => p.handle === handle);
}

function Skills(props: { skills: Skill[] }) {
  const columns = [
    { field: "skill", headerName: "Skill", width: 150 },
    { field: "achievements", headerName: "Achievements", width: 150 }
  ];
  const rows = props.skills.map((skill) => {
    return { id: skill.name, skill: skill.name, achievements: skill.achievementsCount };
  });
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}



function ProfileView(props) {
  return (
    <Stack spacing={2} alignItems="center">
      <h1>{props.profile.handle}</h1>
      <Avatar alt="avatar" src={props.profile.imageUri} sx={{ height: 150, width: 150 }}></Avatar>
      <Skills skills={props.profile.skills}></Skills>
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

class App extends React.Component<{}, { profile: Profile, searchQuery: string }> {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      searchQuery: null,
    };
  }

  async handleChange(searchQuery: string) {
    const profile = await getProfile(searchQuery);
    this.setState({ profile: profile, searchQuery });
  }

  render() {
    const searchField = (
      <ProfileSearchField
        handleChange={(e) => this.handleChange(e.target.value)}
      ></ProfileSearchField>
    );
    if (this.state.profile) {
      return (
        <Stack spacing={2} alignItems="center">
          {searchField}
          <ProfileView profile={this.state.profile}></ProfileView>
        </Stack>
      );
    } else {
      return (
        <Stack spacing={2} alignItems="center">
          {searchField}
          <p>Profile "{this.state.searchQuery}" not found</p>
        </Stack>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
