import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Achievement, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";
import { Box } from "@mui/material";
import { JobStarHeader } from "./Header/header";
import { mockProfiles } from "./Profile/mockProfiles";
import { ProfilePage } from "./Profile/profile";

interface AppState {
  achievements: Achievement[]
  profileSearchQuery: string
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      profileSearchQuery: "",
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll(null) });
  }

  handleProfileSearchFieldChange(value: any): void {
    this.setState({ profileSearchQuery: value });
  }

  render() {
    return <Box>
      <JobStarHeader></JobStarHeader>
      <ProfilePage profile={mockProfiles[0]}></ProfilePage>
      {/* <Home
        skills={["Javascript", "Solidity", "Marketing", "C#"]}
        workerProfiles={mockProfiles}
        achievements={this.state.achievements}
        handleProfileSearchFieldChange={value => this.handleProfileSearchFieldChange(value)}></Home> */}
    </Box>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
