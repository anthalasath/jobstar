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
import { Profile, ProfilePageView } from "./Profile/profile";
import { AchievementForm } from "./Achievements/achievementForm";
import * as ethers from "ethers";

interface AppState {
  achievements: Achievement[]
  currentPage: Page
  prevPage: Page
}

enum PageType {
  Profile,
  AchievementForm,
  Home
}

type ProfilePage = {
  type: PageType.Profile,
  profile: Profile
}

type AchievementFormPage = {
  type: PageType.AchievementForm
}

type HomePage = {
  type: PageType.Home
}

type Page = HomePage | ProfilePage | AchievementFormPage
class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      prevPage: { type: PageType.Home },
      currentPage: { type: PageType.Home }
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll(null) });
  }

  handleProfileClick(profile: Profile): void {
    this.changePage({ type: PageType.Profile, profile: profile });
  }

  handleAddAchievementCancelClick(): void {
    this.goToPrevPage();
  }

  handleJobStarClick(): void {
    this.changePage({ type: PageType.Home });
  }

  handleAddAchievementClick(): void {
    this.changePage({ type: PageType.AchievementForm });
  }

  goToPrevPage(): void {
    this.setState({
      prevPage: { type: PageType.Home },
      currentPage: this.state.prevPage
    })
  }

  changePage(page: Page): void {
    this.setState({
      prevPage: this.state.currentPage,
      currentPage: page
    })
  }

  renderContentUnderHeader(): JSX.Element {
    switch (this.state.currentPage.type) {
      case PageType.Home:
        return <Home
          skills={["Javascript", "Solidity", "Marketing", "C#"]}
          workerProfiles={mockProfiles}
          achievements={this.state.achievements}
        ></Home>;
      case PageType.AchievementForm:
        return <AchievementForm issuerAddress={ethers.constants.AddressZero} handleCancelClick={() => this.handleAddAchievementCancelClick()}></AchievementForm>
      case PageType.Profile:
        return <ProfilePageView profile={this.state.currentPage.profile}></ProfilePageView>

    }
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
