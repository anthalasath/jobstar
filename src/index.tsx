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
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      profileSearchQuery: ""
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ achievements: await getLatestAchievementsAll() });
  }

  handleProfileSearchFieldChange(value: any) {
    this.setState({ profileSearchQuery: value });
  }

  render() {
    return <Home
      achievements={this.state.achievements}
      handleProfileSearchFieldChange={value => this.handleProfileSearchFieldChange(value)}></Home>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
