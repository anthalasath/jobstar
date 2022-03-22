import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Achievement, AchievementView, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";
import { Box, List } from "@mui/material";
import { JobStarHeader } from "./Header/header";
import { mockProfiles } from "./Profile/mockProfiles";
import { Profile, ProfilePage } from "./Profile/profile";
import { AddAchievementPage } from "./Achievements/addAchievement";

interface AppState {
  achievements: Achievement[]
  displayedProfile: Profile | null,
  isAddAchievementPageOpen: boolean
}
class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      displayedProfile: null,
      isAddAchievementPageOpen: false
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll(null) });
  }

  handleWorkerProfileClick(profile: Profile): void {
    this.setState({
      displayedProfile: profile
    });
  }

  handleAddAchievementCancelClick(): void {
    console.log("handleAddAchievementCancelClick");
    this.setState({
      isAddAchievementPageOpen: false
    })
  }

  renderContentUnderHeader(): JSX.Element {
    if (this.state.isAddAchievementPageOpen) {
      return <AddAchievementPage handleCancelClick={() => this.handleAddAchievementCancelClick()}></AddAchievementPage>
    } else if (this.state.displayedProfile) {
      return <ProfilePage profile={this.state.displayedProfile}></ProfilePage>
    } else {
      return <Home
        skills={["Javascript", "Solidity", "Marketing", "C#"]}
        workerProfiles={mockProfiles}
        achievements={this.state.achievements}
        handleWorkerProfileClick={p => this.handleWorkerProfileClick(p)}
      ></Home>;
    }
  }

  handleJobStarClick(): void {
    this.setState({
      displayedProfile: null,
      isAddAchievementPageOpen: false
    });
  }

  handleAddAchievementClick(): void {
    this.setState({
      isAddAchievementPageOpen: true
    });
  }

  render() {
    return <Box>
      <JobStarHeader
        connectedProfiles={mockProfiles.filter(p => p.handle === "Anthalasath")}
        handleJobStarClick={() => this.handleJobStarClick()}
        handleAddAchievementClick={() => this.handleAddAchievementClick()}
      ></JobStarHeader>
      {this.renderContentUnderHeader()}
    </Box>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
