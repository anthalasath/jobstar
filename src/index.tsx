import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Grid, TextField } from "@mui/material";
import { getProfile, Profile, ProfileView } from "./Profile/profile";
import { AchievementList, getLatestAchievements } from "./Achievements/achievements";

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
  profile: Profile,
  searchQuery: string,
  selectedSkills: Set<string>
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      searchQuery: null,
      selectedSkills: new Set<string>()
    };
  }

  async handleChange(searchQuery: string) {
    const profile = await getProfile(searchQuery);
    this.setState({ profile: profile, searchQuery });
  }

  handleSkillClick(skill: string) {
    const selectedSkills = this.state.selectedSkills;
    let newSelectedSkills: Set<string>;
    if (selectedSkills.has(skill)) {
      selectedSkills.delete(skill);
      newSelectedSkills = selectedSkills;
    } else {
      newSelectedSkills = selectedSkills.add(skill);
    }
    this.setState({ selectedSkills: newSelectedSkills });
  }

  render() {
    const searchField = (
      <>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <ProfileSearchField
            handleChange={(e) => this.handleChange(e.target.value)}
          ></ProfileSearchField>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </>
    );

    if (this.state.profile) {
      return <Grid container spacing={0}>
        {searchField}
        <Grid item xs={6}>
          <ProfileView
            profile={this.state.profile}
            selectedSkills={this.state.selectedSkills}
            handleSkillClick={skill => this.handleSkillClick(skill)}
          ></ProfileView>
        </Grid>
        <Grid item xs={6}>
          <h2>Latest achievements</h2>
          <AchievementList
            achievements={getLatestAchievements(
              this.state.profile,
              this.state.selectedSkills.size > 0 ? this.state.selectedSkills : null
            )}>
          </AchievementList>
        </Grid>
      </Grid>
    } else {
      return <Grid container spacing={2}>
        {searchField}
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <p>Profile "{this.state.searchQuery}" not found</p>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
