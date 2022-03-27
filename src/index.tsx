import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Achievement, AchievementContent, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";
import { Box, CssBaseline, List, ThemeProvider } from "@mui/material";
import { JobStarHeader } from "./Header/header";
import { Profile, ProfilePageView } from "./Profile/profile";
import { AchievementForm } from "./Achievements/achievementForm";
import * as ethers from "ethers";
import { AchievementConfirmationForm } from "./Achievements/achievementConfirmationForm";

/*styling*/
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { createTheme } from "@mui/material/styles";
import { LoginPage } from "./LoginPage/loginPage";
import { getNetworkConfig } from "./constants";
import { LensProtocol } from "./Lens/lens";

interface AppState {
  currentPage: Page
  prevPage: Page
  signer?: ethers.ethers.providers.JsonRpcSigner,
  jobStar: ethers.Contract
  lens: LensProtocol
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
  input: AchievementContent
}

type HomePage = {
  type: PageType.Home
}

type Page = HomePage | ProfilePage | AchievementFormPage | AchievementConfirmationFormPage

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const config = getNetworkConfig("localhost");
    this.state = {
      prevPage: { type: PageType.Home },
      currentPage: { type: PageType.Home },
      jobStar: new ethers.Contract(config.jobStar.address, config.jobStar.abi, provider),
      lens: new LensProtocol(new ethers.Contract(config.lensHub.address, config.jobStar.abi))
    };
  }

  handleProfileClick(profile: Profile): void {
    this.changePage({ type: PageType.Profile, profile: profile });
  }

  handleAchievementFormSubmitClick(input: AchievementContent): void {
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

  handleProviderConnected(signer: ethers.ethers.providers.JsonRpcSigner) {
    this.setState({ signer: signer });
  }

  renderContentUnderHeader(): JSX.Element {
    switch (this.state.currentPage.type) {
      case PageType.Home:
        return <Home
          jobStar={this.state.jobStar}
          lens={this.state.lens}
          skills={["Javascript", "Solidity", "Marketing", "C#"]}
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
        return <ProfilePageView jobStar={this.state.jobStar} profile={this.state.currentPage.profile}></ProfilePageView>
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
    return (<ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar />
        <JobStarHeader
          signer={this.state.signer}
          handleProviderConnected={signer => this.handleProviderConnected(signer)}
          connectedProfiles={[]}
          handleJobStarClick={() => this.handleJobStarClick()}
          handleAddAchievementClick={() => this.handleAddAchievementClick()}
          handleProfileClick={profile => this.handleProfileClick(profile)}
        ></JobStarHeader>
        {this.renderContentUnderHeader()}
        <Footer />
      </Box>
    </ThemeProvider >)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
