import { Component, h } from "../../index.js";
import { getLeaderboard } from "../../firebase.js";
import { Leaderboard } from "../layout/Leaderboard/Leaderboard.js";

class LeaderboardContainer extends Component {
  componentDidMount() {
    getLeaderboard().then((data) => this.setState({ list: data }));
  }

  render({}, { list }) {
    return h(Leaderboard, { list });
  }
}

export { LeaderboardContainer };
