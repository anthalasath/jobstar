import * as React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Achievement, getLatestAchievementsAll } from "./Achievements/achievements";
import { Home } from "./Home/home";

interface AppState {
  achievements: Achievement[]
  profileSearchQuery: string
  selectedSkills: Set<string>
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      profileSearchQuery: "",
      selectedSkills: new Set<string>()
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll(null) });
  }

  handleProfileSearchFieldChange(value: any): void {
    this.setState({ profileSearchQuery: value });
  }

  async handleSkillClick(skill: string): Promise<void> {
    const selectedSkills = this.state.selectedSkills;
    let newSelectedSkills: Set<string>;
    if (selectedSkills.has(skill)) {
      selectedSkills.delete(skill);
      newSelectedSkills = selectedSkills;
    } else {
      newSelectedSkills = selectedSkills.add(skill);
    }
    const achievements = await getLatestAchievementsAll(this.state.selectedSkills.size > 0 ? this.state.selectedSkills : null);
    this.setState({
      selectedSkills: newSelectedSkills,
      achievements
    });
  }

  render() {
    return <Home
      skills={["Javascript", "Solidity", "Marketing", "C#"]}
      selectedSkills={this.state.selectedSkills}
      handleSkillClick={skill => this.handleSkillClick(skill)}
      achievements={this.state.achievements}
      handleProfileSearchFieldChange={value => this.handleProfileSearchFieldChange(value)}></Home>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
