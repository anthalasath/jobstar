import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid, TextField } from "@mui/material";
import { getProfile, Profile, ProfileView } from "./Profile/profile";
import { Achievement, AchievementList, getLatestAchievements, getLatestAchievementsAll } from "./Achievements/achievements";
import { JobStarHeader } from "./Header/header";
import { Box } from "@mui/system";

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

interface AppState {
  achievements: Achievement[]
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: []
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll() });
  }

  render() {
    return <Box>
      <JobStarHeader></JobStarHeader>
      <AchievementList achievements={this.state.achievements}></AchievementList>
    </Box>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
