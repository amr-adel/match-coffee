import { h, Component } from "../../index.js";
import { getLeaderboard } from "../firebase.js";

class Leaderboard extends Component {
  componentDidMount() {
    getLeaderboard().then((data) => this.setState({ leaderboard: data }));
  }

  render({}, { leaderboard }) {
    const leaderboardList = h(
      "ol",
      { class: "leaderboard-list" },
      leaderboard &&
        (leaderboard.length > 0
          ? leaderboard.map((user) =>
              h(
                "li",
                null,
                h(
                  "span",
                  { class: "user-name" },
                  user.name,
                  user.isCurrUser && h("span", { class: "curr-user" }, "[you]")
                ),
                h("span", { class: "user-beans" }, user.beans)
              )
            )
          : h("p", null, "No players yet!")),
      !leaderboard && h("p", null, "Loading...")
    );

    return h(
      "div",
      { class: "leaderboard" },
      h("h2", { class: "title" }, "Leaderboard"),
      leaderboardList
    );
  }
}

export { Leaderboard };
