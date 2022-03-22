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
import { AchievementForm } from "./Achievements/achievementForm";
import * as ethers from "ethers";

interface AppState {
  achievements: Achievement[]
  displayedProfile: Profile | null,
  isAchievementFormOpen: boolean
}
class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      displayedProfile: null,
      isAchievementFormOpen: false
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll(null) });
  }

  handleProfileClick(profile: Profile): void {
    this.setState({
      displayedProfile: profile
    });
  }

  handleAddAchievementCancelClick(): void {
    console.log("handleAddAchievementCancelClick");
    this.setState({
      isAchievementFormOpen: false
    })
  }

  renderContentUnderHeader(): JSX.Element {
    if (this.state.isAchievementFormOpen) {
      return <AchievementForm issuerAddress={ethers.constants.AddressZero} handleCancelClick={() => this.handleAddAchievementCancelClick()}></AchievementForm>
    } else if (this.state.displayedProfile) {
      return <ProfilePage profile={this.state.displayedProfile}></ProfilePage>
    } else {
      return <Home
        skills={["Javascript", "Solidity", "Marketing", "C#"]}
        workerProfiles={mockProfiles}
        achievements={this.state.achievements}
      ></Home>;
    }
  }

  handleJobStarClick(): void {
    this.setState({
      displayedProfile: null,
      isAchievementFormOpen: false
    });
  }

  handleAddAchievementClick(): void {
    this.setState({
      isAchievementFormOpen: true
    });
  }

  render() {
    return <Box>
      <JobStarHeader
        connectedProfiles={mockProfiles.filter(p => p.handle === "Anthalasath")}
        handleJobStarClick={() => this.handleJobStarClick()}
        handleAddAchievementClick={() => this.handleAddAchievementClick()}
        handleProfileClick={profile => this.handleProfileClick(profile)}
      ></JobStarHeader>
      {this.renderContentUnderHeader()}
    </Box>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
