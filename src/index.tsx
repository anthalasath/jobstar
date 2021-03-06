import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Achievement, AchievementInput, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";
import { Box, CssBaseline, List, ThemeProvider } from "@mui/material";
import { JobStarHeader } from "./Header/header";
import { mockProfiles } from "./Profile/mockProfiles";
import { Profile, ProfilePageView } from "./Profile/profile";
import { AchievementForm } from "./Achievements/achievementForm";
import * as ethers from "ethers";
import { AchievementConfirmationForm } from "./Achievements/achievementConfirmationForm";

/*styling*/
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { createTheme } from "@mui/material/styles";
import { LoginPage } from "./LoginPage/loginPage";

interface AppState {
  achievements: Achievement[]
  currentPage: Page
  prevPage: Page
}

enum PageType {
  Profile,
  AchievementForm,
  AchievementConfirmationForm,
  Home
}

type ProfilePage = {
  type: PageType.Profile,
  profile: Profile
}

type AchievementFormPage = {
  type: PageType.AchievementForm
}

type AchievementConfirmationFormPage = {
  type: PageType.AchievementConfirmationForm,
  input: AchievementInput
}

type HomePage = {
  type: PageType.Home
}

type Page = HomePage | ProfilePage | AchievementFormPage | AchievementConfirmationFormPage

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

  handleAchievementFormSubmitClick(input: AchievementInput): void {
    this.changePage({ type: PageType.AchievementConfirmationForm, input });
  }

  handleAchievementFormCancelClick(): void {
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
        return <AchievementForm 
        issuerProfileId={ethers.BigNumber.from(1)} 
        handleSubmitClick={input => this.handleAchievementFormSubmitClick(input)}
        handleCancelClick={() => this.handleAchievementFormCancelClick()}
      ></AchievementForm>
      case PageType.AchievementConfirmationForm:
        return <AchievementConfirmationForm 
        handleBackButtonClick={() => this.goToPrevPage()}
        input={this.state.currentPage.input}></AchievementConfirmationForm>
      case PageType.Profile:
        return <ProfilePageView profile={this.state.currentPage.profile}></ProfilePageView>
    }
  }

  render() {
    const theme = createTheme({
      palette: {
          primary: {
              light: '#63b8ff',
              main: '#0989e3',
              dark: '#005db0',
              contrastText: '#000',
          },
          secondary: {
              main: '#4db6ac',
              light: '#82e9de',
              dark: '#00867d',
              contrastText: '#000',
          },
        },
        typography: {
          fontSize: 12,
          },
    });
    return ( <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box>
          <Navbar />
            <JobStarHeader
              connectedProfiles={mockProfiles.filter(p => p.handle === "Anthalasath")}
              handleJobStarClick={() => this.handleJobStarClick()}
              handleAddAchievementClick={() => this.handleAddAchievementClick()}
              handleProfileClick={profile => this.handleProfileClick(profile)}
            ></JobStarHeader>
            {this.renderContentUnderHeader()}
          <Footer />
      </Box>
    </ThemeProvider>)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
