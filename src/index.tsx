import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Achievement, AchievementView, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";
import { Box, CssBaseline, Paper, Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { JobStarHeader } from "./Header/header";
import { mockProfiles } from "./Profile/mockProfiles";
import { Profile, ProfilePage } from "./Profile/profile";
import { AddAchievementPage } from "./Achievements/addAchievement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./_components/Routes";

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

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

  handleProfileClick(profile: Profile): void {
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
    } 
    else if (this.state.displayedProfile) {
      return <ProfilePage profile={this.state.displayedProfile}></ProfilePage>
    } 
    else {
      return <Home
        skills={["Javascript", "Solidity", "Marketing", "C#"]}
        workerProfiles={mockProfiles}
        achievements={this.state.achievements}
      >        
      </Home>;
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
    });


    return ( <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box>
           
          <Router>
            <Navbar />
            <JobStarHeader
              connectedProfiles={mockProfiles.filter(p => p.handle === "Anthalasath")}
              handleJobStarClick={() => this.handleJobStarClick()}
              handleAddAchievementClick={() => this.handleAddAchievementClick()}
              handleProfileClick={profile => this.handleProfileClick(profile)}
            ></JobStarHeader>

            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
            
            {this.renderContentUnderHeader()}

        </Router>
          <Footer />
        </Box>
        </ThemeProvider>)
  }
}


/*
     <JobStarHeader
              connectedProfiles={mockProfiles.filter(p => p.handle === "Anthalasath")}
              handleJobStarClick={() => this.handleJobStarClick()}
              handleAddAchievementClick={() => this.handleAddAchievementClick()}
              handleProfileClick={profile => this.handleProfileClick(profile)}
        ></JobStarHeader>

        {this.renderContentUnderHeader()}

*/

ReactDOM.render(<App />, document.getElementById("root"));
