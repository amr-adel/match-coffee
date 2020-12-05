import { Component, h } from "../../../index.js";
import { Icon } from "../../Icon.js";
import { Login } from "../../Login/Login.js";
import { currUser } from "../../firebase.js";
import { UserProfile } from "../../UserProfile/UserProfile.js";
import { Leaderboard } from "../../Leaderboard/Leaderboard.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  componentDidMount() {
    window.addEventListener("mousedown", (e) => this.hideMenu(e));
  }

  componentWillUnmout() {
    window.removeEventListener("mousedown", (e) => this.hideMenu(e));
  }

  toggleMenuVisibility() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  hideMenu(e) {
    // Hide menu on clicking anywhere outside '.nav' div
    if (this.state.showMenu && !e.target.closest(".nav"))
      this.toggleMenuVisibility();
  }

  render({ setModal }, { showMenu }) {
    return h(
      "div",
      { class: "nav" },
      h(
        "button",
        { class: "toggle", onClick: () => this.toggleMenuVisibility() },
        h(Icon, { name: showMenu ? "close" : "menu" })
      ),
      showMenu &&
        h(
          "ul",
          {
            onClick: (e) => {
              if (e.target.tagName === "LI") this.toggleMenuVisibility();
            },
          },
          !currUser &&
            h(
              "li",
              {
                onClick: () => {
                  setModal(h(Login, { setModal }));
                },
              },
              "Login / Sign up"
            ),
          currUser &&
            h(
              "li",
              {
                class: "user",
                onClick: () => {
                  setModal(h(UserProfile, { setModal }));
                },
              },
              currUser.displayName,
              h(Icon, { name: "user" })
            ),
          h(
            "li",
            {
              onClick: () => {
                setModal(h(Leaderboard));
              },
            },
            "Leaderboard"
          ),
          h(
            "li",
            {
              onClick: () => {
                setModal("About Match Coffee!");
              },
            },
            "About"
          )
        )
    );
  }
}

export { Menu };
