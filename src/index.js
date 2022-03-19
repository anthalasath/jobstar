import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Avatar, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const profiles = [
  {
    handle: "Anthalasath",
    imageUri:
      "https://pbs.twimg.com/profile_images/1297158984730902528/5cGwqw-I_400x400.png",
    skills: ["C#", "Javascript", "Solidity"],
  },
];

async function getProfile(handle) {
  return profiles.find((p) => p.handle === handle);
}

function Skills(props) {
  const columns = [{ field: "skill", headerName: "Skill", width: 150 }];
  const rows = props.skills.map((skill) => {
    return { id: skill, skill };
  });
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

function Profile(props) {
  return (
    <Stack spacing={2} alignItems="center">
      <h1>{props.profile.handle}</h1>
      <Avatar alt="avatar" src={props.profile.imageUri} sx={{height: 150, width: 150}}></Avatar>
      <Skills skills={props.profile.skills}></Skills>
    </Stack>
  );
}

function ProfileSearchField(props) {
  return (
    <TextField
      id="outlined-basic"
      label="Search by handle"
      variant="outlined"
      onChange={(value) => props.handleChange(value)}
      onSubmit={props.handleSubmit}
    />
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      searchQuery: null,
    };
  }

  async handleChange(searchQuery) {
    const profile = await getProfile(searchQuery);
    this.setState({ profile: profile, searchQuery });
  }

  render() {
    const searchField = (
      <ProfileSearchField
        handleChange={(e) => this.handleChange(e.target.value)}
        handleSubmit={this.handleSubmit}
      ></ProfileSearchField>
    );
    if (this.state.profile) {
      return (
        <Stack spacing={2} alignItems="center">
          {searchField}
          <Profile profile={this.state.profile}></Profile>
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
